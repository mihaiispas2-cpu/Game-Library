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
    const clientID = Deno.env.get('IGDB_CLIENT_ID');
    const accessToken = Deno.env.get('IGDB_ACCESS_TOKEN');
    
    if (!clientID || !accessToken) {
        throw new Error('IGDB credentials are not set.');
    }

    const query = 'fields id, name, cover.url, total_rating, first_release_date, summary, genres.name, platforms.name, game_modes.name, involved_companies.company.name, involved_companies.developer, involved_companies.publisher, videos.video_id, screenshots.url, external_games.uid, external_games.category; sort aggregated_rating_count desc; where total_rating != null & cover != null & first_release_date >= 1262304000 & first_release_date <= 1767225600; limit 200;';

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
    
    const igdbData = await res.json();

    const gamesToUpsert = igdbData.map((d: any) => {
      let coverUrl = d.cover?.url || '';
      if (coverUrl.startsWith('//')) {
         coverUrl = 'https:' + coverUrl;
      }
      coverUrl = coverUrl.replace(/t_[a-z_]+/, 't_1080p');

      let developer = 'Unknown';
      let publisher = 'Unknown';
      
      if (d.involved_companies && Array.isArray(d.involved_companies)) {
        const dev = d.involved_companies.find((ic: any) => ic.developer);
        if (dev && dev.company && dev.company.name) developer = dev.company.name;
        
        const pub = d.involved_companies.find((ic: any) => ic.publisher);
        if (pub && pub.company && pub.company.name) publisher = pub.company.name;
      }

      let releaseDate = 'Unknown';
      if (d.first_release_date) {
        const date = new Date(d.first_release_date * 1000);
        releaseDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      }

      let trailer_url = null;
      if (d.videos && Array.isArray(d.videos) && d.videos.length > 0) {
        trailer_url = `https://www.youtube.com/watch?v=${d.videos[0].video_id}`;
      }

      let screenshots: string[] = [];
      if (d.screenshots && Array.isArray(d.screenshots)) {
        screenshots = d.screenshots.map((s: any) => {
          let url = s.url || '';
          if (url.startsWith('//')) {
            url = 'https:' + url;
          }
          return url.replace(/t_[a-z_]+/, 't_screenshot_big');
        });
      }

      return {
        id: d.id.toString(),
        title: d.name,
        cover_image: coverUrl,
        hero_image: coverUrl,
        rating: d.total_rating ? Math.round(d.total_rating) : (d.rating ? Math.round(d.rating) : 0),
        description: d.summary || '',
        genres: d.genres?.map((g: any) => g.name) || [],
        platforms: d.platforms?.map((p: any) => p.name) || [],
        features: d.game_modes?.map((gm: any) => gm.name) || [],
        developer: developer,
        publisher: publisher,
        release_date: releaseDate,
        trailer_url: trailer_url,
        screenshots: screenshots,
        steam_app_id: d.external_games?.find((eg: any) => eg.category === 1)?.uid?.toString() || null,
      };
    });

    const supabaseUrl = 'https://isreozzpnvboyifhwtmh.supabase.co';
    const supabaseServiceKey = Deno.env.get('SERVICE_ROLE_KEY') || '';
    
    if (!supabaseUrl || !supabaseServiceKey) {
        throw new Error('Supabase SUPABASE_URL or SERVICE_ROLE_KEY missing.');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: insertedData, error } = await supabase
      .from('games')
      .upsert(gamesToUpsert, { onConflict: 'id' })
      .select();

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify(insertedData), {
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
