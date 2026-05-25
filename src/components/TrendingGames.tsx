import { Heart, Star } from 'lucide-react';
import { Game } from '../types';

interface TrendingGamesProps {
  games: Game[];
  selectedId: string;
  onSelectGame: (id: string) => void;
}

export default function TrendingGames({ games, selectedId, onSelectGame }: TrendingGamesProps) {
  // Let's filter out the active selected expansion game from the trending games lists if needed
  // or show all. The photo literally displays these 6 trending games:
  // Baldur's Gate 3, Cyberpunk 2077, Red Dead Redemption 2, Starfield, Hogwarts Legacy, Resident Evil 4
  const trendingList = games.filter(g => g.id !== 'elden-ring-shadow');

  return (
    <div className="py-12 px-4 lg:px-12 max-w-7xl mx-auto w-full space-y-8 bg-[#06070a]" id="trending-section">
      
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-slate-900 pb-4">
        <span className="text-xl">📈</span>
        <h2 className="font-display font-extrabold text-2xl text-white animate-pulse">
          Trending Games
        </h2>
      </div>

      {/* Grid of 6 Games */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {trendingList.map((game) => {
          const isSelected = game.id === selectedId;

          return (
            <div
              key={game.id}
              onClick={() => {
                onSelectGame(game.id);
                // Scroll page smoothly up to main spotlight area
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-[#111221] border transition-all duration-300 transform hover:-translate-y-1 ${
                isSelected 
                  ? 'border-[#3b82f6] shadow-[0_0_20px_rgba(59,130,246,0.15)] bg-[#14162a]'
                  : 'border-slate-850 hover:border-slate-700'
              }`}
            >
              
              {/* Image Banner top half */}
              <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
                
                {/* 1. Left Heart Icon */}
                <button className="absolute top-3 left-3 z-20 p-1.5 bg-black/40 hover:bg-black/60 rounded-full text-white backdrop-blur-sm cursor-pointer transition-colors">
                  <Heart className="w-4 h-4 hover:fill-red-500 hover:text-red-500" />
                </button>

                {/* 2. Optional Right Discount Tag */}
                {game.discount > 0 && (
                  <span className="absolute top-3 right-3 z-20 bg-[#ff1744] text-white font-mono font-black text-[10px] px-2 py-0.5 rounded-md">
                    -{game.discount}%
                  </span>
                )}

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
                  
                  {/* Rating Rating badge */}
                  <div className="flex items-center gap-1 font-mono text-xs text-[#2196f3] bg-[#2196f3]/10 px-2 py-0.5 rounded border border-[#2196f3]/25">
                    <Star className="w-3.5 h-3.5 fill-[#2196f3]" />
                    <span>{game.rating}</span>
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
