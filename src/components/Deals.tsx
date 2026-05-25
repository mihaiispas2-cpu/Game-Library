import { useState } from 'react';
import { ArrowLeft, Search, Clock, ChevronRight, ChevronLeft, Heart, Check, Flame, Gift, Calendar, Sparkles, TrendingUp, Tags } from 'lucide-react';

interface DealsProps {
  onViewChange: (view: 'home' | 'browse' | 'topRated' | 'deals') => void;
}

const mockHotDeals = [
  {
    title: 'Cyberpunk 2077: Phantom Liberty',
    tags: ['RPG', 'Open World'],
    platforms: ['Steam', 'Epic Games', 'GOG'],
    dev: 'CD Projekt Red',
    original: 79.99,
    current: 19.99,
    discount: 75,
    low: 19.99,
    rating: 92,
    critics: 89,
    deck: true,
    timeLeft: '2 days 14 hours',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
    isLow: true,
  },
  {
    title: 'Red Dead Redemption 2',
    tags: ['Action', 'Open World'],
    platforms: ['Steam', 'Epic Games'],
    dev: 'Rockstar Games',
    original: 59.99,
    current: 23.99,
    discount: 60,
    low: 19.99,
    rating: 95,
    critics: 97,
    deck: true,
    timeLeft: '5 days 3 hours',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=600&q=80',
    isLow: false,
  },
  {
    title: 'Hades',
    tags: ['Roguelike', 'Indie'],
    platforms: ['Steam', 'Epic Games', 'Nintendo Switch'],
    dev: 'Supergiant Games',
    original: 24.99,
    current: 0.00,
    discount: 100,
    low: 0.00,
    rating: 98,
    critics: 93,
    deck: true,
    timeLeft: '6 days 12 hours',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
    isLow: true,
  },
  {
    title: 'Baldur\'s Gate 3',
    tags: ['RPG', 'Strategy'],
    platforms: ['Steam', 'GOG', 'PlayStation'],
    dev: 'Larian Studios',
    original: 59.99,
    current: 44.99,
    discount: 25,
    low: 44.99,
    rating: 96,
    critics: 96,
    deck: true,
    timeLeft: '3 days 8 hours',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=600&q=80',
    isLow: true,
  },
  {
    title: 'Elden Ring',
    tags: ['RPG', 'Souls-like'],
    platforms: ['Steam', 'PlayStation', 'Xbox'],
    dev: 'FromSoftware',
    original: 59.99,
    current: 29.99,
    discount: 50,
    low: 29.99,
    rating: 91,
    critics: 96,
    deck: true,
    timeLeft: '1 day 6 hours',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
    isLow: true,
  },
  {
    title: 'Stardew Valley',
    tags: ['Simulation', 'Indie'],
    platforms: ['Steam', 'GOG', 'Nintendo Switch'],
    dev: 'ConcernedApe',
    original: 14.99,
    current: 7.49,
    discount: 50,
    low: 7.49,
    rating: 96,
    critics: 89,
    deck: true,
    timeLeft: '4 days 2 hours',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=600&q=80',
    isLow: true,
  }
];

const mockFreeGames = [
  { title: 'Hades', dev: 'Epic Games', time: '6 days 12 hours', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80' },
  { title: 'Dead Space (Remake)', dev: 'Steam', time: 'Free Weekend - 2 days', image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=400&q=80' },
  { title: 'Star Wars Jedi: Survivor', dev: 'Prime Gaming', time: '12 days 4 hours', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80' },
];

export default function Deals({ onViewChange }: DealsProps) {
  const [internalSearch, setInternalSearch] = useState('');

  return (
    <div className="min-h-screen bg-[#0d1017]">
      
      {/* Top Banner Hero Area */}
      <div className="relative w-full h-[540px]">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d1017] via-[#0d1017]/90 to-[#0d1017]/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1017] via-transparent to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80" 
            alt="Hero Background" 
            className="absolute top-0 right-0 w-[60%] h-full object-cover opacity-50"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 lg:px-8 pt-8 w-full">
          {/* Back Button */}
          <button 
            onClick={() => onViewChange('home')}
            className="flex items-center gap-2 bg-[#12141c]/60 border border-slate-800 hover:border-slate-600 px-4 py-2 rounded-lg text-sm font-medium text-slate-200 transition-colors w-max mb-6 backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
          
          <div className="bg-[#ff003c] text-white px-3 py-1 rounded-sm font-bold text-xs inline-block mb-4">
            Biggest Discount
          </div>

          <h1 className="font-display font-extrabold text-white text-5xl lg:text-6xl tracking-tight mb-4 drop-shadow-md">
            Phantom Liberty
          </h1>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-[#1a2133]/80 border border-[#2b3652] text-slate-300 rounded-full text-xs font-semibold backdrop-blur-sm">RPG</span>
            <span className="px-3 py-1 bg-[#1a2133]/80 border border-[#2b3652] text-slate-300 rounded-full text-xs font-semibold backdrop-blur-sm">Open World</span>
            <span className="px-3 py-1 bg-[#1a2133]/80 border border-[#2b3652] text-slate-300 rounded-full text-xs font-semibold backdrop-blur-sm">Sci-Fi</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-black/40 border border-slate-700 text-slate-400 rounded-full text-[11px] backdrop-blur-sm">Steam</span>
            <span className="px-3 py-1 bg-black/40 border border-slate-700 text-slate-400 rounded-full text-[11px] backdrop-blur-sm">Epic Games</span>
            <span className="px-3 py-1 bg-black/40 border border-slate-700 text-slate-400 rounded-full text-[11px] backdrop-blur-sm">GOG</span>
          </div>

          <div className="text-slate-400 text-sm mb-6 flex items-center gap-2">
            by CD Projekt Red
          </div>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-slate-500 font-mono text-xl line-through decoration-slate-600/50">$79.99</span>
            <span className="text-5xl font-black font-mono text-[#00e676]">$19.99</span>
            <span className="bg-[#ff1744] text-white px-2 py-1 rounded-md font-bold text-lg">-75%</span>
          </div>

          <div className="inline-flex items-center gap-2 bg-[#00e676]/10 border border-[#00e676]/30 text-[#00e676] px-3 py-1.5 rounded-lg text-xs font-bold mb-4 backdrop-blur-sm">
            <TrendingUp className="w-4 h-4" />
            Historical Lowest Price: $19.99
          </div>

          <div className="flex items-center gap-2 text-slate-400 text-xs font-mono mb-8">
            <Clock className="w-4 h-4" />
            Sale ends in: 2 days 14 hours
          </div>

          <div className="flex items-center gap-3">
            <button className="bg-[#00b0ff] hover:bg-[#0091ea] text-white px-6 py-3 rounded-xl text-sm font-bold transition-colors">
              Compare Prices
            </button>
            <button className="bg-[#1a2133]/80 border border-slate-700 hover:bg-[#2b3652]/80 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors backdrop-blur-sm">
              View Details
            </button>
            <button className="bg-[#1a2133]/80 border border-slate-700 hover:bg-[#2b3652]/80 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors backdrop-blur-sm">
              Add to Wishlist
            </button>
          </div>
          
          {/* Carousel indicators */}
          <div className="absolute bottom-8 right-1/2 translate-x-1/2 flex items-center gap-2">
            <div className="w-8 h-2 rounded-full bg-[#00b0ff]" />
            <div className="w-2 h-2 rounded-full bg-slate-600" />
            <div className="w-2 h-2 rounded-full bg-slate-600" />
          </div>
        </div>
        
        {/* Left/Right carousel controls */}
        <button className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 border border-slate-700 flex items-center justify-center text-slate-300 hover:bg-black/60 backdrop-blur-sm cursor-pointer">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 border border-slate-700 flex items-center justify-center text-slate-300 hover:bg-black/60 backdrop-blur-sm cursor-pointer">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8 flex flex-col xl:flex-row gap-8">
        
        {/* Left Sidebar Filters */}
        <div className="w-full xl:w-64 flex-shrink-0 flex flex-col gap-6 bg-[#0a0d14] rounded-2xl p-5 border border-slate-850 h-max sticky top-24">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2 font-semibold text-white">
              <span className="text-[#3b82f6]"><Search className="w-4 h-4" /></span> Filters
            </div>
            <button className="text-[11px] font-semibold text-[#00b0ff] hover:text-[#40c4ff] cursor-pointer">
              Clear All
            </button>
          </div>

          {/* Sort By */}
          <div className="space-y-2">
            <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase font-bold">Sort By</span>
            <div className="h-9 bg-[#131620] border border-slate-800 rounded-md" />
          </div>

          {/* Filter Categories */}
          {[
            { title: 'Price', items: ['Free', 'Under €5', 'Under €10', 'Under €20', 'Under €40'] },
            { title: 'Discount', items: ['25%+', '50%+', '75%+', '90%+'] },
            { title: 'Platforms', items: ['PC', 'Steam', 'Epic Games', 'GOG', 'PlayStation', 'Xbox', 'Nintendo Switch'] },
            { title: 'Genres', items: ['RPG', 'FPS', 'Horror', 'Open World', 'Survival', 'Indie', 'Racing', 'Strategy'] },
            { title: 'Special Tags', items: ['Historical Low', 'Steam Deck Verified', 'Bundle Included', 'Multiplayer', 'Co-op', 'Free Weekend', 'Flash Sale'] }
          ].map((section) => (
            <div key={section.title} className="space-y-2">
              <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase font-bold mb-2 block">{section.title}</span>
              <div className="flex flex-col gap-2">
                {section.items.map((item) => (
                  <label key={item} className="flex items-center gap-2 text-xs text-slate-300 font-sans cursor-pointer hover:text-white transition-colors">
                    <div className="w-3.5 h-3.5 rounded-sm border border-slate-700 bg-[#161a25]" />
                    {item}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right Main Area */}
        <div className="flex-1 flex flex-col gap-12">
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm mb-4">
            <button className="bg-[#1a2133] border border-slate-800 flex items-center gap-2 px-4 py-2 rounded-lg text-slate-300 hover:text-white transition-colors">
              <span className="w-4 h-4 text-slate-500">☰</span> Hide Filters
            </button>
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-slate-500" />
              </div>
              <input
                type="text"
                placeholder="Search deals..."
                className="w-full bg-[#131620] border border-slate-800 pl-10 pr-4 py-2.5 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-slate-600"
              />
            </div>
          </div>

          {/* Hot Deals Right Now */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-xl font-display font-extrabold text-white">
                <TrendingUp className="w-6 h-6 text-[#00e676]" />
                Hot Deals Right Now
              </div>
              <span className="text-xs text-slate-500 font-mono">Updated 10 minutes ago</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {mockHotDeals.map((deal) => (
                <div key={deal.title} className="bg-[#12141c] border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-colors flex flex-col">
                  
                  <div className="relative h-40 bg-slate-900 border-b border-slate-800">
                    <img src={deal.image} alt={deal.title} className="w-full h-full object-cover" />
                    
                    {deal.isLow && (
                      <div className="absolute top-2 left-2 bg-[#00e676] text-[#0a2918] px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 shadow-md">
                        <TrendingUp className="w-3 h-3" /> Historical Low
                      </div>
                    )}
                    
                    <button className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center text-white border border-slate-700/50 hover:bg-black/80 backdrop-blur-sm cursor-pointer">
                      <Heart className="w-3.5 h-3.5" />
                    </button>

                    <div className="absolute -bottom-3 right-3 bg-[#ff1744] text-white px-2.5 py-1 rounded-lg text-[11px] font-black shadow-lg">
                      -{deal.discount}%
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-slate-100 text-[15px] mb-2 leading-snug">{deal.title}</h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      {deal.tags.map(t => (
                        <span key={t} className="text-[9px] px-2 py-0.5 bg-[#1a2133] border border-slate-700 rounded text-slate-400">{t}</span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      {deal.platforms.map(p => (
                        <span key={p} className="text-[10px] text-slate-500 font-mono">{p}</span>
                      ))}
                    </div>
                    
                    <div className="text-[11px] text-slate-500 mb-4">{deal.dev}</div>

                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-sm text-slate-500 line-through font-mono">${deal.original.toFixed(2)}</span>
                      <span className="text-xl font-black text-[#00b0ff] font-mono">${deal.current.toFixed(2)}</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-4 border-t border-slate-800/60 pt-3">
                      <span>Historical Low:</span>
                      <span className="text-[#00e676] font-mono font-bold">${deal.low.toFixed(2)}</span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mb-4 bg-[#0d1017] p-2 rounded border border-slate-800">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-[#eab308]">★</span> {deal.rating}  <span className="hidden sm:inline">Critics: {deal.critics}</span>
                      </div>
                      {deal.deck && (
                         <div className="flex items-center gap-1 text-[#00e676] font-semibold flex-shrink-0">
                           <Check className="w-3 h-3" /> Deck
                         </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono mb-4">
                      <Clock className="w-3 h-3" /> {deal.timeLeft}
                    </div>

                    <div className="mt-auto flex items-center gap-2">
                      <button className="flex-1 bg-[#00b0ff] hover:bg-[#0091ea] text-white py-2 rounded-lg text-xs font-bold transition-colors">
                        Compare Deals
                      </button>
                      <button className="flex-1 bg-transparent border border-slate-700 hover:bg-[#1a2133] text-slate-300 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer">
                        View Details
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* Free Games & Giveaways */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3 text-xl font-display font-extrabold text-white">
              <Gift className="w-6 h-6 text-[#d946ef]" />
              Free Games & Giveaways
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {mockFreeGames.map(game => (
                <div key={game.title} className="bg-[#12141c] border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-colors">
                  <div className="relative h-32 bg-slate-900 border-b border-slate-800">
                    <img src={game.image} alt={game.title} className="w-full h-full object-cover opacity-80" />
                    <div className="absolute top-2 left-2 bg-[#d946ef] text-white px-2 py-0.5 rounded text-[10px] font-black shadow-lg uppercase">
                      FREE
                    </div>
                  </div>
                  <div className="p-4 flex flex-col gap-2">
                    <h3 className="font-bold text-slate-100 text-sm truncate">{game.title}</h3>
                    <span className="text-[11px] text-slate-400">{game.dev}</span>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono mb-2">
                      <Clock className="w-3 h-3" /> {game.time}
                    </div>
                    <button className="w-full bg-[#d946ef] hover:bg-[#c026d3] text-white py-2 rounded-lg text-xs font-bold shadow-md transition-colors cursor-pointer">
                      Claim Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Sales */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3 text-xl font-display font-extrabold text-white">
              <Calendar className="w-6 h-6 text-[#f59e0b]" />
              Upcoming Sales
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              <div className="bg-[#12141c] border border-slate-800 rounded-xl overflow-hidden shadow-sm">
                <div className="h-32 bg-gradient-to-r from-blue-900 to-purple-900 relative">
                  <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80" alt="Steam Summer Sale" className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
                </div>
                <div className="p-5">
                  <h3 className="font-extrabold text-white text-lg mb-1">Steam Summer Sale</h3>
                  <div className="text-sm text-slate-400 mb-4">Starts: June 25, 2026</div>
                  <div className="inline-flex items-center gap-1.5 text-[#00b0ff] bg-[#00b0ff]/10 px-3 py-1.5 rounded-lg text-xs font-bold">
                    <Clock className="w-3.5 h-3.5" /> Starts in 38 days
                  </div>
                </div>
              </div>

              <div className="bg-[#12141c] border border-slate-800 rounded-xl overflow-hidden shadow-sm">
                <div className="h-32 bg-gradient-to-r from-red-900 to-slate-900 relative">
                  <img src="https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=600&q=80" alt="Black Friday" className="w-full h-full object-cover opacity-30 mix-blend-overlay" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <span className="text-3xl font-black text-white/20 transform -rotate-12 italic tracking-tighter">SALE SALE SALE</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-extrabold text-white text-lg mb-1">Black Friday Sale</h3>
                  <div className="text-sm text-slate-400 mb-4">Starts: November 28, 2026</div>
                  <div className="inline-flex items-center gap-1.5 text-[#00b0ff] bg-[#00b0ff]/10 px-3 py-1.5 rounded-lg text-xs font-bold">
                    <Clock className="w-3.5 h-3.5" /> Starts in 195 days
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Bundle Deals */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3 text-xl font-display font-extrabold text-white">
              <Tags className="w-6 h-6 text-[#3b82f6]" />
              Bundle Deals
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-[#12141c] border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
                <div className="h-40 relative">
                  <img src="https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover opacity-70" alt="Bundle" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12141c] via-transparent to-transparent" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-bold text-white text-xl mb-2">Ultimate RPG Bundle</h3>
                  <p className="text-[11px] text-slate-400 mb-1">Includes 4 games:</p>
                  <p className="text-xs text-slate-300 font-serif leading-relaxed mb-4 line-clamp-2">Baldur's Gate 3, Divinity: Original Sin 2, Pillars of Eternity, Wasteland 3</p>
                  
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-3xl font-black font-mono text-[#ff1744]">$39.99</span>
                    <span className="text-xs text-slate-500 line-through">Save $89.99</span>
                  </div>

                  <div className="bg-[#0d1017] border border-slate-800 rounded-xl p-4 mb-4">
                    <div className="text-[10px] font-bold uppercase text-slate-500 mb-2 font-mono tracking-wider">Bundle Tiers:</div>
                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex justify-between text-slate-300"><span>Basic - 2 games</span><span className="font-bold text-white">$9.99</span></div>
                      <div className="flex justify-between text-slate-300"><span>Standard - 4 games</span><span className="font-bold text-white">$19.99</span></div>
                      <div className="flex justify-between text-slate-300"><span>Premium - 8 games</span><span className="font-bold text-white">$39.99</span></div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono mb-4 mt-auto">
                    <Clock className="w-3.5 h-3.5" /> Ends in 14 days
                  </div>

                  <button className="w-full bg-[#00b0ff] hover:bg-[#0091ea] text-white py-3 rounded-xl text-sm font-bold shadow-md transition-colors">
                    View Bundle
                  </button>
                </div>
              </div>

              <div className="bg-[#12141c] border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
                <div className="h-40 relative">
                  <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover opacity-70" alt="Bundle 2" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12141c] via-transparent to-transparent" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-bold text-white text-xl mb-2">Indie Gems Collection</h3>
                  <p className="text-[11px] text-slate-400 mb-1">Includes 4 games:</p>
                  <p className="text-xs text-slate-300 font-serif leading-relaxed mb-4 line-clamp-2">Hades, Hollow Knight, Celeste, Dead Cells</p>
                  
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-3xl font-black font-mono text-[#00b0ff]">$24.99</span>
                    <span className="text-xs text-slate-500 line-through">Save $59.99</span>
                  </div>

                  <div className="bg-[#0d1017] border border-slate-800 rounded-xl p-4 mb-4">
                    <div className="text-[10px] font-bold uppercase text-slate-500 mb-2 font-mono tracking-wider">Bundle Tiers:</div>
                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex justify-between text-slate-300"><span>Basic - 2 games</span><span className="font-bold text-white">$7.99</span></div>
                      <div className="flex justify-between text-slate-300"><span>Standard - 4 games</span><span className="font-bold text-white">$14.99</span></div>
                      <div className="flex justify-between text-slate-300"><span>Premium - 6 games</span><span className="font-bold text-white">$24.99</span></div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono mb-4 mt-auto">
                    <Clock className="w-3.5 h-3.5" /> Ends in 7 days
                  </div>

                  <button className="w-full bg-[#00b0ff] hover:bg-[#0091ea] text-white py-3 rounded-xl text-sm font-bold shadow-md transition-colors">
                    View Bundle
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Smart Buying Insights */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3 text-xl font-display font-extrabold text-white">
              <Sparkles className="w-5 h-5 text-amber-300" />
              Smart Buying Insights
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="bg-[#0a2918]/30 border border-[#00e676]/20 rounded-xl p-5 flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#00e676]/20 flex flex-shrink-0 items-center justify-center text-[#00e676]">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">Cyberpunk 2077: Phantom Liberty</h4>
                  <div className="text-[#00e676] text-xs font-semibold mb-2 flex items-center gap-1"><Check className="w-3 h-3" /> This is the lowest recorded price</div>
                  <p className="text-[11px] text-slate-400 font-sans leading-relaxed">Historical data shows this is an excellent time to buy. Previous low was $24.99.</p>
                </div>
              </div>

              <div className="bg-[#0a1a3a]/30 border border-[#00b0ff]/20 rounded-xl p-5 flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#00b0ff]/20 flex flex-shrink-0 items-center justify-center text-[#00b0ff]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">Baldur's Gate 3</h4>
                  <div className="text-[#00b0ff] text-xs font-semibold mb-2">Excellent value for current content</div>
                  <p className="text-[11px] text-slate-400 font-sans leading-relaxed">100+ hours of gameplay, active community, and regular updates make this a great investment.</p>
                </div>
              </div>

              <div className="bg-[#290a23]/30 border border-[#f43f5e]/20 rounded-xl p-5 flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#f43f5e]/20 flex flex-shrink-0 items-center justify-center text-[#f43f5e]">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">Red Dead Redemption 2</h4>
                  <div className="text-[#f43f5e] text-xs font-semibold mb-2">Price likely to drop during next major sale</div>
                  <p className="text-[11px] text-slate-400 font-sans leading-relaxed">Summer Sale in 38 days typically offers deeper discounts. Consider waiting if not urgent.</p>
                </div>
              </div>

              <div className="bg-[#3a1d0a]/30 border border-[#f97316]/20 rounded-xl p-5 flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#f97316]/20 flex flex-shrink-0 items-center justify-center text-[#f97316]">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">Elden Ring</h4>
                  <div className="text-[#f97316] text-xs font-semibold mb-2">Flash Sale - Historical low reached</div>
                  <p className="text-[11px] text-slate-400 font-sans leading-relaxed">Limited time offer. This price typically only appears during major sale events.</p>
                </div>
              </div>

            </div>
          </div>

          {/* Trending Deals row */}
          <div className="space-y-5">
             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-xl font-display font-extrabold text-white">
                <Flame className="w-6 h-6 text-[#f97316]" />
                Trending Deals
              </div>
              <span className="text-xs text-slate-500 font-mono">Most viewed in the last 24 hours</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {mockHotDeals.slice(0, 4).map(deal => (
                <div key={deal.title} className="bg-transparent group cursor-pointer">
                  <div className="relative h-24 bg-slate-900 rounded-lg overflow-hidden border border-slate-800 mb-2 group-hover:border-slate-600 transition-colors">
                    <img src={deal.image} className="w-full h-full object-cover" alt="Trending" />
                  </div>
                  <h4 className="text-xs font-bold text-white truncate mb-1 group-hover:text-[#00b0ff] transition-colors">{deal.title}</h4>
                  <div className="flex items-center gap-2 text-[11px] font-mono mb-1">
                    <span className="text-[#00b0ff] font-bold">${deal.current}</span>
                    <span className="text-slate-500 line-through">${deal.original}</span>
                  </div>
                  <span className="bg-[#ff1744] text-white px-1.5 py-0.5 rounded text-[9px] font-bold">-{deal.discount}%</span>
                </div>
              ))}
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
