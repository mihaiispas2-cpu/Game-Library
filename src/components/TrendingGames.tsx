import { useState, useEffect } from 'react';
import { Heart, Star, Trophy } from 'lucide-react';
import { Game } from '../types';
import { supabase } from '../supabaseClient';

interface TrendingGamesProps {
  games: Game[]; // Original games, kept for fallback
  selectedId: string;
  onSelectGame: (id: string) => void;
}

export default function TrendingGames({ games, selectedId, onSelectGame }: TrendingGamesProps) {
  const [gotyGames, setGotyGames] = useState<(Game & { gotyYear?: string })[]>([]);

  useEffect(() => {
    const fetchGotyGames = async () => {
      try {
        const { data, error } = await supabase
          .from('games')
          .select('*')
          .order('rating', { ascending: false })
          .limit(100);

        if (!error && data && data.length > 0) {
          const yearsToFind = ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014'];
          const selectedGames: any[] = [];
          
          // 1. Pick the best score for each recent year
          for (const year of yearsToFind) {
            const bestOfYear = data.find((g: any) => 
              g.release_date?.includes(year) && !selectedGames.some(sg => sg.id === g.id)
            );
            if (bestOfYear) {
              selectedGames.push({ ...bestOfYear, gotyYear: year });
            }
          }

          // 2. If we have less than 12, fill with the highest rated remaining games
          for (const g of data) {
            if (selectedGames.length >= 12) break;
            if (!selectedGames.some(sg => sg.id === g.id)) {
              selectedGames.push(g);
            }
          }

          // Ensure exactly 12
          const finalSelection = selectedGames.slice(0, 12);

          const mappedGames = finalSelection.map((d: any) => ({
            id: d.id,
            title: d.title || 'Unknown Title',
            coverImage: d.coverImage || d.cover_image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80',
            heroImage: d.heroImage || d.cover_image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80',
            shortDescription: d.description || d.shortDescription || '',
            longDescription: d.description || d.longDescription || '',
            genres: d.genres || ['Action'],
            platforms: d.platforms || ['PC'],
            features: d.features || [],
            rating: d.rating || d.score || 0,
            metacriticScore: d.rating || d.score || d.metacriticScore || 0,
            userScore: d.rating ? d.rating / 10 : (d.score ? d.score / 10 : 0),
            lowestPrice: d.price || 0,
            originalPrice: d.price || 0,
            discount: d.discount || 0,
            releaseDate: d.release_date || d.releaseDate || 'TBA',
            developer: d.developer || 'Unknown Developer',
            publisher: d.publisher || '',
            engine: d.engine || '',
            dev_time: d.dev_time || '',
            estimated_budget: d.estimated_budget || '',
            avg_playtime: d.avg_playtime || '',
            multiplayer: d.multiplayer || '',
            modSupport: d.modSupport || '',
            drmInfo: d.drmInfo || '',
            optimizationScore: d.optimizationScore || 0,
            performanceRating: d.performanceRating || '',
            deals: d.deals || [],
            priceHistory: d.priceHistory || [],
            reviews: d.reviews || [],
            trailer_url: d.trailer_url || null,
            screenshots: d.screenshots || [],
            steam_app_id: d.steam_app_id || null,
            system_requirements: d.system_requirements || null,
            gotyYear: d.gotyYear
          }));
          
          setGotyGames(mappedGames);
        } else {
          setGotyGames(games.slice(0, 12));
        }
      } catch (e) {
        setGotyGames(games.slice(0, 12));
      }
    };

    fetchGotyGames();
  }, [games]);

  const displayList = gotyGames.length > 0 ? gotyGames : games.slice(0, 12);

  return (
    <div className="py-12 px-4 lg:px-12 max-w-7xl mx-auto w-full space-y-8 bg-[#06070a]" id="trending-section">
      
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-slate-900 pb-4">
        <span className="text-xl">🏆</span>
        <h2 className="font-display font-extrabold text-2xl text-white animate-pulse">
          Game of The Year
        </h2>
      </div>

      {/* Grid of 12 Games */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
        {displayList.map((game) => {
          const isSelected = game.id === selectedId;
          const isGoty = game.gotyYear !== undefined;

          return (
            <div
              key={game.id}
              onClick={() => {
                onSelectGame(game.id);
              }}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-[#111221] border transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,176,255,0.2)] ${
                isSelected 
                  ? 'border-[#00b0ff] bg-[#14162a]'
                  : 'border-slate-850 hover:border-[#00b0ff]/50'
              }`}
            >
              
              {/* Image Banner top half */}
              <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
                
                {/* 1. Left Heart Icon */}
                <button className="absolute top-3 left-3 z-20 p-1.5 bg-black/40 hover:bg-black/60 rounded-full text-white backdrop-blur-sm cursor-pointer transition-colors">
                  <Heart className="w-4 h-4 hover:fill-red-500 hover:text-red-500" />
                </button>

                {/* 2. GOTY Badge or Discount Tag */}
                {isGoty ? (
                  <span className="absolute top-3 right-3 z-20 bg-yellow-500 text-black font-bold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1 shadow-lg">
                    <Trophy className="w-3 h-3" /> GOTY {game.gotyYear}
                  </span>
                ) : game.discount > 0 ? (
                  <span className="absolute top-3 right-3 z-20 bg-[#ff1744] text-white font-mono font-black text-[10px] px-2 py-0.5 rounded-md">
                    -{game.discount}%
                  </span>
                ) : null}

                {/* Core Artwork cover */}
                {game.coverImage && (
                  <img
                    src={game.coverImage}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                )}

                {/* Dark Vignette shading lines on bottom of image */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111221] via-[#111221]/10 to-transparent opacity-85" />

              </div>

              {/* Informative description strip below artwork */}
              <div className="p-5 space-y-3">
                
                {/* Title */}
                <div>
                  <h3 className="font-display font-bold text-base text-slate-100 group-hover:text-[#3b82f6] transition-colors truncate">
                    {game.title}
                  </h3>
                </div>

                {/* Lower Row: Score and Price Details */}
                <div className="flex items-center justify-between border-t border-slate-850/60 pt-3">
                  
                  {/* Rating badge */}
                  <div className="flex items-center gap-1 font-mono text-xs text-[#2196f3] bg-[#2196f3]/10 px-2 py-0.5 rounded border border-[#2196f3]/25">
                    <Star className="w-3.5 h-3.5 fill-[#2196f3]" />
                    <span>{game.rating > 0 ? `${(game.rating / 10).toFixed(1)} / 10` : 'N/A'}</span>
                  </div>

                  {/* Pricing labels */}
                  <div className="flex items-baseline gap-2">
                    {game.discount > 0 && (
                      <span className="text-[10px] text-slate-500 line-through font-mono">
                        ${game.originalPrice.toFixed(2)}
                      </span>
                    )}
                    <span className={`text-base font-mono font-black ${game.discount > 0 ? 'text-[#2196f3]' : 'text-slate-200'}`}>
                      ${game.lowestPrice.toFixed(2)}
                    </span>
                  </div>

                </div>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}
