import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || Deno.env.get('SERVICE_ROLE_KEY') || '';

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase URL or Service Role Key missing.');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: games, error } = await supabase
      .from('games')
      .select('id, steam_app_id')
      .not('steam_app_id', 'is', null)
      .neq('steam_app_id', '');

    if (error) throw error;
    
    if (!games || games.length === 0) {
       return new Response(JSON.stringify({ message: "No games found with steam_app_id." }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let updatedCount = 0;
    const errors = [];
    
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    for (const game of games) {
      if (!game.steam_app_id) continue;
      
      try {
        const steamUrl = `https://store.steampowered.com/api/appdetails?appids=${game.steam_app_id}&cc=US&l=english`;
        const res = await fetch(steamUrl);
        
        if (!res.ok) {
           errors.push({ id: game.id, error: `Failed to fetch from Steam: ${res.statusText}` });
           continue;
        }
        
        const data = await res.json();
        const appData = data[game.steam_app_id];
        
        if (appData && appData.success && appData.data) {
           const updateData: any = {};
           const details = appData.data;
           
           if (details.is_free) {
               updateData.price = 0;
               updateData.discount = 0;
           } else if (details.price_overview) {
               updateData.price = details.price_overview.final / 100; // Steam returns price in cents
               updateData.discount = details.price_overview.discount_percent;
           }
           
           if (details.pc_requirements) {
               updateData.system_requirements = details.pc_requirements; // saves as JSONB (minimum and recommended)
           }
           
           if (Object.keys(updateData).length > 0) {
               const { error: updateError } = await supabase
                  .from('games')
                  .update(updateData)
                  .eq('id', game.id);
                  
               if (updateError) {
                   errors.push({ id: game.id, error: updateError.message });
               } else {
                   updatedCount++;
                   
                   if (updateData.price !== undefined) {
                       const { error: historyError } = await supabase
                           .from('price_history')
                           .insert({
                               game_id: game.id,
                               price: updateData.price
                           });
                       
                       if (historyError) {
                           errors.push({ id: game.id, error: `History error: ${historyError.message}` });
                       }
                   }
               }
           }
        }
      } catch (e: any) {
         errors.push({ id: game.id, error: e.message });
      }
      
      await delay(500); // 500ms delay to avoid rate limiting
    }

    return new Response(JSON.stringify({ 
        message: `Successfully updated ${updatedCount} games from Steam API.`,
        updatedCount,
        errors: errors.length > 0 ? errors : undefined
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error in steam-api function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
})
