import { useState } from 'react';
import { ChevronDown, Search, ArrowLeft, Heart, Monitor, Gamepad2 } from 'lucide-react';
import { Game } from '../types';

interface BrowseGamesProps {
  games: Game[];
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  onViewChange: (view: 'home' | 'browse') => void;
  onSelectGame: (id: string) => void;
}

export default function BrowseGames({
  games,
  wishlist,
  onToggleWishlist,
  onViewChange,
  onSelectGame,
}: BrowseGamesProps) {
  const [internalSearch, setInternalSearch] = useState('');
  
  // Default values for filters
  const defaultGenres = ['Action', 'Adventure', 'RPG', 'Strategy', 'Horror', 'Sci-Fi'];
  const defaultPlatforms = ['PC', 'PS5', 'Xbox', 'Nintendo'];

  // Handle filtering logic placeholder (if fully implemented we would hook this to state)
  const filteredGames = games.filter(g => 
    g.title.toLowerCase().includes(internalSearch.toLowerCase()) || 
    g.genres.some(genre => genre.toLowerCase().includes(internalSearch.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#0d1017]">
      {/* Background radial gradient matches original feel */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8 w-full flex flex-col gap-6">
        
        {/* Back navigation & Page Header */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4 border-b border-transparent">
            {/* Top Back Button Row */}
            <button 
              onClick={() => onViewChange('home')}
              className="flex items-center gap-2 bg-[#1b1f2e] border border-slate-800 hover:border-slate-600 px-4 py-2 rounded-lg text-sm font-medium text-slate-200 transition-colors w-max"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          </div>

          <div className="space-y-2">
            <h1 className="font-display font-bold text-4xl text-white tracking-tight">Browse Games</h1>
            <p className="text-slate-400 font-sans">Discover your next favorite game from our collection</p>
          </div>

          {/* Search Bar Input */}
          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-slate-500" />
            </div>
            <input
              type="text"
              placeholder="Search games..."
              value={internalSearch}
              onChange={(e) => setInternalSearch(e.target.value)}
              className="w-full bg-[#1b1f2e] border border-slate-800 pl-12 pr-4 py-3 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-600 transition-colors"
            />
          </div>
        </div>

        {/* Main Interface Layout grid */}
        <div className="flex flex-col lg:flex-row gap-8 mt-6">
          
          {/* Left Sidebar Filters */}
          <div className="w-full lg:w-64 flex-shrink-0 flex flex-col gap-6 bg-[#0a0d14] rounded-2xl p-5 border border-slate-850 h-max sticky top-24">
            
            {/* Filters Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold text-white">
                <span className="text-[#3b82f6]">⏱️</span> Filters
              </div>
              <button className="text-xs font-semibold text-[#3b82f6] hover:text-[#60a5fa] cursor-pointer">
                Clear All
              </button>
            </div>

            {/* Sort Dropdown mock */}
            <div className="space-y-2">
              <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase font-bold">SORT BY</span>
              <div className="flex items-center justify-between bg-[#151924] border border-slate-800/80 px-3 py-2 rounded-md cursor-pointer hover:border-slate-700">
                <span className="text-xs text-slate-300">Default</span>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </div>
            </div>

            {/* Price section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between cursor-pointer">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">PRICE</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </div>
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>$0</span>
                <span>$100</span>
              </div>
            </div>

            {/* Genre section */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between cursor-pointer">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">GENRE</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </div>
              <div className="flex flex-col gap-2">
                {defaultGenres.map((genre) => (
                  <label key={genre} className="flex items-center gap-3 cursor-pointer group">
                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{genre}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Platform section */}
            <div className="space-y-3 pt-2 pl-1">
              <div className="flex items-center justify-between cursor-pointer">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">PLATFORM</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </div>
              <div className="flex flex-col gap-2">
                {defaultPlatforms.map((platform) => (
                  <label key={platform} className="flex items-center gap-3 cursor-pointer group">
                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{platform}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* Right Games Grid main view */}
          <div className="flex-1 space-y-4">
            <div className="text-sm text-slate-400 font-mono mb-2">
              Showing {filteredGames.length} of {games.length} games
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {filteredGames.map((game) => {
                const liked = wishlist.includes(game.id);
                
                return (
                  <div 
                    key={game.id}
                    className="group relative bg-[#131722] rounded-2xl overflow-hidden border border-slate-850 hover:border-slate-700 transition-all flex flex-col"
                  >
                    
                    {/* Top image wrapper */}
                    <div className="relative aspect-[16/10] bg-slate-900 cursor-pointer overflow-hidden" 
                         onClick={() => {
                           onSelectGame(game.id);
                           onViewChange('home');
                         }}>
                      
                      {/* Heart Wishlist button */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(game.id);
                        }}
                        className="absolute top-3 left-3 z-20 p-1.5 bg-black/40 hover:bg-black/60 rounded-full text-white backdrop-blur-sm cursor-pointer transition-colors"
                      >
                        <Heart className={`w-4 h-4 transition-colors ${liked ? 'fill-red-500 text-red-500' : 'hover:fill-red-500 hover:text-red-500'}`} />
                      </button>

                      {/* Discount Tag Top Right */}
                      {game.discount > 0 && (
                        <div className="absolute top-3 right-3 z-20 bg-[#ff1744] text-white font-mono font-black text-[11px] px-2 py-0.5 rounded-lg shadow-md">
                          -{game.discount}%
                        </div>
                      )}

                      {/* Content Image */}
                      {game.coverImage && (
                        <img
                          src={game.coverImage}
                          alt={game.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-[#131722] via-[#131722]/10 to-transparent opacity-80" />
                    </div>

                    {/* Bottom Details Row */}
                    <div className="p-4 flex flex-col gap-3 flex-1 justify-between">
                      
                      <div className="flex items-center justify-between">
                        <h3 
                          className="font-bold text-white text-base group-hover:text-[#3b82f6] transition-colors truncate cursor-pointer"
                          onClick={() => {
                            onSelectGame(game.id);
                            onViewChange('home');
                          }}
                        >
                          {game.title}
                        </h3>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Rating Badgy */}
                        <div className="flex items-center gap-1 font-mono text-xs text-[#2196f3] bg-[#2196f3]/10 px-2 py-0.5 rounded border border-[#2196f3]/25">
                          <span>★</span>
                          <span>{game.rating}</span>
                        </div>

                        {/* Platforms summary icons */}
                        <div className="flex items-center gap-2 text-slate-400">
                          {game.platforms.includes('PC') && <Monitor className="w-3.5 h-3.5" />}
                          <Gamepad2 className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      {/* Pricing Row -> Buy btn */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-800/60 mt-1">
                        <div className="flex items-baseline gap-2">
                           <span className="text-[11px] text-slate-500 line-through font-mono">
                            ${game.originalPrice.toFixed(2)}
                           </span>
                           <span className="text-lg font-mono font-black text-[#5ae2de]">
                            ${game.lowestPrice.toFixed(2)}
                           </span>
                        </div>
                        
                        <a 
                          href={game.deals[0]?.buyUrl || '#'}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-3.5 py-1.5 border border-[#1b6276] hover:border-[#2ebce6] text-[#2ebce6] text-xs font-semibold rounded-lg hover:bg-[#2ebce6]/10 transition-colors shadow-sm ml-2 shrink-0 text-center"
                        >
                          Buy Now
                        </a>
                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
