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

    // 1. Fetch all games from our DB
    const { data: dbGames, error: dbError } = await supabase
      .from('games')
      .select('id, title, steam_app_id');

    if (dbError) throw dbError;
    if (!dbGames || dbGames.length === 0) {
      return new Response(JSON.stringify({ message: "No games found in the database." }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Process games that need to be updated (we'll try to find any game not having steam_app_id or refresh all? "For each game in our Supabase games table, searches for a matching Steam app by title")
    // We'll process all of them to be safe, or just the ones missing if that makes more sense. The prompt says "For each game in our Supabase games table".
    const gamesToProcess = dbGames;

    // 2. Fetch all Steam apps
    const steamRes = await fetch('https://api.steampowered.com/ISteamApps/GetAppList/v2/');
    if (!steamRes.ok) {
       throw new Error(`Failed to fetch Steam app list: ${steamRes.statusText}`);
    }
    const steamData = await steamRes.json();
    const steamApps = steamData?.applist?.apps;

    if (!steamApps || !Array.isArray(steamApps)) {
       throw new Error('Invalid format from Steam API');
    }

    // Create a map for faster lookup (case-insensitive)
    const steamAppsMap = new Map<string, number>();
    // Iterate from end to beginning because sometimes newer entries override older ones, or vice versa. We will just do a standard loop.
    for (const app of steamApps) {
        if (app.name) {
            // Keep the first one encountered or last? Keeping last is fine.
            steamAppsMap.set(app.name.toLowerCase().trim(), app.appid);
        }
    }

    let updatedCount = 0;
    const errors = [];
    const updates = [];

    // 3. Match and Update
    for (const game of gamesToProcess) {
        if (!game.title) continue;
        
        const titleLower = game.title.toLowerCase().trim();
        const matchedAppId = steamAppsMap.get(titleLower);

        if (matchedAppId && game.steam_app_id !== matchedAppId.toString()) {
            updates.push({
                id: game.id,
                title: game.title,
                steam_app_id: matchedAppId.toString()
            });
        }
    }

    if (updates.length > 0) {
        for (const update of updates) {
             const { error: updateError } = await supabase
                .from('games')
                .update({ steam_app_id: update.steam_app_id })
                .eq('id', update.id);
             
             if (updateError) {
                 console.error(`Failed to update game ${update.title}:`, updateError);
                 errors.push({ id: update.id, title: update.title, error: updateError.message });
             } else {
                 updatedCount++;
             }
        }
    }

    return new Response(JSON.stringify({ 
        message: `Successfully synchronized ${updatedCount} games.`,
        updatedCount,
        errors: errors.length > 0 ? errors : undefined
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error synchronizing steam apps:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
})
