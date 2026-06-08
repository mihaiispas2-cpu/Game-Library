import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    let query = 'fields name, cover.url, total_rating, first_release_date, summary, genres.name, involved_companies.company.name; sort aggregated_rating_count desc; where total_rating != null & cover != null; limit 20;';
    
    // Attempt to parse body for a custom query
    try {
      const body = await req.json();
      if (body.query) {
        query = body.query;
      }
    } catch (e) {
      // Ignore JSON parse errors, just use default query
    }

    // Access secrets configured in the edge function environment
    const clientID = Deno.env.get('IGDB_CLIENT_ID');
    const accessToken = Deno.env.get('IGDB_ACCESS_TOKEN');

    if (!clientID || !accessToken) {
        throw new Error('IGDB credentials are not set in the Edge Function environment.');
    }

    const res = await fetch('https://api.igdb.com/v4/games', {
      method: 'POST',
      headers: {
        'Client-ID': clientID,
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
        'Content-Type': 'text/plain',
      },
      body: query
    });

    if (!res.ok) {
        throw new Error(`IGDB API Error: ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
    
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error: any) {
    console.error('Edge Function Error:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
