import { ChevronRight, Play, Star, ChevronLeft } from 'lucide-react';
import { Game } from '../types';

interface HeroProps {
  game: Game;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
}

export default function Hero({ game }: HeroProps) {
  return (
    <div className="relative min-h-[640px] w-full flex items-center bg-[#06070a] overflow-hidden">
      
      {/* 1. Background Artwork Image (Right aligned with ambient vignettes) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#06070a] via-[#06070a]/85 to-[#06070a]/20 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06070a] via-transparent to-transparent z-10" />
        {game.heroImage && (
          <img
            src={game.heroImage}
            alt={game.title}
            className="absolute right-0 top-0 w-[55%] h-full object-cover object-center opacity-70"
            referrerPolicy="no-referrer"
          />
        )}
      </div>

      {/* 2. Hero Core Content Grid */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 lg:px-12 py-16 w-full grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left column info - 8 cols */}
        <div className="lg:col-span-8 flex flex-col justify-center space-y-6">
          
          {/* Genre / Tag Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {game.genres.map((genre) => (
              <span 
                key={genre} 
                className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#101b2a]/60 text-[#4fc3f7] border border-[#0d59a7]/30"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Large display titles */}
          <div className="space-y-1">
            <h1 className="font-display font-extrabold text-white text-4xl sm:text-5xl lg:text-[54px] tracking-tight leading-none">
              {game.title}
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              by <span className="text-slate-300">{game.developer}</span>
            </p>
          </div>

          {/* Short paragraph description */}
          <p className="text-slate-350 text-xs sm:text-sm max-w-2xl leading-relaxed">
            {game.shortDescription}
          </p>

          {/* Score grid row - 4 separate cards side by side */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
            
            {/* User score */}
            <div className="bg-[#141522]/80 border border-slate-800/60 p-3.5 rounded-xl">
              <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider flex items-center gap-1">
                <span className="text-[#e2a106]">★</span> User Score
              </span>
              <span className="block text-2xl font-black text-white mt-1">
                {game.rating}
              </span>
            </div>

            {/* Critic score */}
            <div className="bg-[#141522]/85 border border-slate-800/60 p-3.5 rounded-xl">
              <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                Critic Score
              </span>
              <span className="block text-2xl font-black text-[#5c6bc0] mt-1">
                {game.metacriticScore}
              </span>
            </div>

            {/* Gameplay Duration */}
            <div className="bg-[#141522]/85 border border-slate-800/60 p-3.5 rounded-xl">
              <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                Gameplay
              </span>
              <span className="block text-xl font-bold text-slate-200 mt-1">
                {game.gameplayDuration.replace(' hours', '').replace('h', '')}h
              </span>
            </div>

            {/* Performance */}
            <div className="bg-[#141522]/85 border border-slate-800/60 p-3.5 rounded-xl">
              <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                Performance
              </span>
              <span className="block text-2xl font-black text-[#00b0ff] mt-1">
                {game.optimizationScore}
              </span>
            </div>

          </div>

          {/* Pricing Box Panel */}
          <div className="max-w-md bg-[#111220]/90 border border-slate-850 p-5 rounded-2xl shadow-xl space-y-3">
            <div className="flex items-baseline gap-3">
              <span className="text-sm font-mono text-slate-500 line-through">
                ${game.originalPrice.toFixed(2)}
              </span>
              <span className="bg-[#ff1744] text-white font-mono font-black text-[10px] px-2 py-0.5 rounded-lg uppercase">
                -{game.discount}%
              </span>
            </div>

            <div className="text-3xl font-mono font-black text-[#26a69a]">
              ${game.lowestPrice.toFixed(2)}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-850/60 text-xs text-slate-400">
              <span className="text-[#00e676] font-medium flex items-center gap-1 font-sans">
                <span className="text-sm">📈</span> Lowest Price Ever!
              </span>
              {/* Platform indicators */}
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono text-slate-500">🎮 💻 Status</span>
              </div>
            </div>
          </div>

          {/* Left bottom Indicators carousel slider controls mock */}
          <div className="flex items-center gap-4 pt-4 text-xs font-mono text-slate-500">
            <div className="flex items-center gap-2">
              <button className="hover:text-white transition-all cursor-pointer">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
              </div>
            </div>
          </div>

        </div>

        {/* Right column indicator slider mock icon */}
        <div className="lg:col-span-4 hidden lg:flex items-center justify-end">
          <button className="w-12 h-12 rounded-full bg-[#11121d]/80 border border-slate-800 hover:border-slate-500 text-slate-400 hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-lg">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

      </div>

    </div>
  );
}
