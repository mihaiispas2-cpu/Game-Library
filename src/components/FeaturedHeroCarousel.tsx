import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Play, Star, Plus, Check, Clock, TrendingUp, Monitor, Zap } from 'lucide-react';
import { Game } from '../types';
import { supabase } from '../supabaseClient';

interface FeaturedHeroCarouselProps {
  games: Game[];
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  onSelectGame: (id: string) => void;
  onFeaturedChange?: (game: Game) => void;
}

const getFeaturedData = (game: Game) => {
  if (game.discount >= 50) return { label: 'BEST DEAL', color: 'bg-red-600', icon: Zap };
  if (game.discount > 0 && game.lowestPrice <= 39.99) return { label: 'LOWEST PRICE EVER', color: 'bg-[#ff1744]', icon: TrendingUp };
  if (game.discount > 0) return { label: 'TRENDING SALE', color: 'bg-orange-500', icon: Star };
  if (game.metacriticScore >= 95) return { label: 'CRITIC CHOICE', color: 'bg-purple-600', icon: Star };
  return { label: 'FEATURED', color: 'bg-blue-600', icon: Zap };
};

export default function FeaturedHeroCarousel({ games, wishlist, onToggleWishlist, onSelectGame, onFeaturedChange }: FeaturedHeroCarouselProps) {
  const [featuredGames, setFeaturedGames] = useState<Game[]>([]);
  const [categoryLabel, setCategoryLabel] = useState<string>('FEATURED');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchDynamicGames = async () => {
      try {
        const { data: categories } = await supabase
          .from('hero_categories')
          .select('*')
          .eq('is_active', true);

        if (!categories || categories.length === 0) {
          setFeaturedGames([...games].sort((a, b) => b.discount - a.discount || b.metacriticScore - a.metacriticScore).slice(0, 5));
          return;
        }

        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        setCategoryLabel(randomCategory.label);

        let query = supabase.from('games').select('*').not('cover_image', 'is', null);

        if (randomCategory.query_type === 'top_rated') {
          query = query.order('rating', { ascending: false });
        } else if (randomCategory.query_type === 'by_year') {
          query = query.filter('release_date', 'ilike', `%${randomCategory.filter_value}%`).order('rating', { ascending: false });
        } else if (randomCategory.query_type === 'by_genre') {
          query = query.contains('genres', [randomCategory.filter_value]).order('rating', { ascending: false });
        } else if (randomCategory.query_type === 'best_deals') {
          query = query.gt('discount', 0).order('discount', { ascending: false });
        } else if (randomCategory.query_type === 'latest') {
          query = query.order('release_date', { ascending: false });
        } else if (randomCategory.query_type === 'featured') {
          query = query.eq('is_featured', true).order('rating', { ascending: false });
        }

        const { data, error } = await query.limit(randomCategory.limit_count || 5);

        if (!error && data && data.length > 0) {
          const mappedGames: Game[] = data.map((d: any) => ({
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
            system_requirements: d.system_requirements || null
          }));
          setFeaturedGames(mappedGames);
        } else {
          // fallback
          setFeaturedGames([...games].sort((a, b) => b.discount - a.discount || b.metacriticScore - a.metacriticScore).slice(0, 5));
        }
      } catch (e) {
        setFeaturedGames([...games].sort((a, b) => b.discount - a.discount || b.metacriticScore - a.metacriticScore).slice(0, 5));
      }
    };

    if (games.length > 0 && featuredGames.length === 0) {
      fetchDynamicGames();
    }
  }, [games, featuredGames.length]);

  // Auto-rotate every 60 seconds (60000ms)
  useEffect(() => {
    if (featuredGames.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % featuredGames.length);
    }, 60000);
    return () => clearInterval(timer);
  }, [featuredGames.length]);

  // Reset expansion state and invoke callback when game changes
  useEffect(() => {
    setIsExpanded(false);
    if (onFeaturedChange && featuredGames.length > 0) {
      onFeaturedChange(featuredGames[currentIndex]);
    }
  }, [currentIndex, featuredGames, onFeaturedChange]);

  const goToNext = () => {
    if (featuredGames.length === 0) return;
    setCurrentIndex((current) => (current + 1) % featuredGames.length);
  };

  const goToPrev = () => {
    if (featuredGames.length === 0) return;
    setCurrentIndex((current) => (current - 1 + featuredGames.length) % featuredGames.length);
  };

  if (featuredGames.length === 0) return null;

  const currentGame = featuredGames[currentIndex];
  const featureData = getFeaturedData(currentGame);
  const isWishlisted = wishlist.includes(currentGame.id);

  return (
    <div className="relative h-[650px] lg:h-[750px] w-full bg-[#06070a] overflow-hidden group">
      
      {/* Background artwork with crossfade and slow pan */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentGame.id}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.15 }}
          exit={{ opacity: 0 }}
          transition={{ 
            opacity: { duration: 1.2, ease: "easeInOut" },
            scale: { duration: 60, ease: "linear" }
          }}
          className="absolute inset-0 z-0 origin-center"
        >
          {currentGame.heroImage && (
            <img
              src={currentGame.heroImage}
              alt={currentGame.title}
              className="w-full h-full object-cover object-center opacity-70"
              referrerPolicy="no-referrer"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#06070a]/95 via-[#06070a]/80 to-[#06070a]/10 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#06070a] via-transparent to-transparent z-10 pointer-events-none" />

      {/* Up Next Game Preview Panel (Fixed Absolute Top Right) */}
      <div className="absolute top-6 right-6 lg:top-10 lg:right-12 z-30 hidden lg:block">
        <div 
          className="w-56 bg-[#0b0c15]/80 backdrop-blur-lg border border-slate-700 p-2.5 rounded-2xl flex items-center gap-3 cursor-pointer hover:bg-[#11121d]/90 hover:border-[#00b0ff]/50 hover:shadow-[0_0_20px_rgba(0,176,255,0.2)] hover:-translate-y-1 transition-all duration-300 group"
          onClick={() => onSelectGame(featuredGames[(currentIndex + 1) % featuredGames.length].id)}
        >
          <div className="w-12 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <img 
              src={featuredGames[(currentIndex + 1) % featuredGames.length].coverImage} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              alt="Next Game"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Up Next</p>
            <h4 className="text-white font-bold text-xs truncate group-hover:text-[#00b0ff] transition-colors">
              {featuredGames[(currentIndex + 1) % featuredGames.length].title}
            </h4>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[#00e676] font-mono text-[10px] font-bold">
                 ${featuredGames[(currentIndex + 1) % featuredGames.length].lowestPrice}
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 lg:px-12 py-16 md:py-24 w-full h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full">
          
          {/* Left Column - Content */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 min-h-[450px]">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentGame.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="space-y-6"
              >
                {/* Feature Category Label */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-bold tracking-widest text-[10px] uppercase text-white shadow-lg bg-blue-600/80 border border-blue-400/30 backdrop-blur-md">
                  {categoryLabel}
                </div>

                {/* Title and Developer */}
                <div className="space-y-2">
                  <h1 className="font-display font-black text-white text-5xl sm:text-6xl lg:text-[64px] tracking-tight leading-[1.05] drop-shadow-2xl">
                    {currentGame.title}
                  </h1>
                  <p className="text-sm text-slate-300 font-mono flex items-center gap-2">
                    <span>Developer: <span className="text-white">{currentGame.developer}</span></span>
                    <span className="text-slate-600">|</span>
                    <span className="flex items-center gap-1">
                      <Monitor className="w-3.5 h-3.5" />
                      {currentGame.platforms.join(' • ')}
                    </span>
                  </p>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap items-center gap-2">
                  {currentGame.genres.map((genre) => (
                    <span 
                      key={genre} 
                      className="px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider bg-slate-900/60 text-[#00b0ff] border border-[#00b0ff]/30 backdrop-blur-md"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <div>
                  <p className={`text-slate-300 text-sm md:text-base max-w-xl leading-relaxed drop-shadow-md brightness-110 ${!isExpanded ? 'line-clamp-3' : ''}`}>
                    {currentGame.shortDescription}
                  </p>
                  {currentGame.shortDescription && currentGame.shortDescription.length > 150 && (
                    <button 
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="text-[#00b0ff] text-sm mt-1 hover:text-white transition-colors"
                    >
                      {isExpanded ? 'View less' : 'View more'}
                    </button>
                  )}
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-xl pt-2">
                  <div className="bg-[#0b0c15]/80 backdrop-blur-md border border-slate-700/50 p-3 rounded-xl flex flex-col justify-center">
                    <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Star className="w-3 h-3 text-[#ffc107] fill-[#ffc107]" /> User
                    </span>
                    <span className="text-xl font-bold text-white leading-none">{currentGame.userScore}</span>
                  </div>
                  <div className="bg-[#0b0c15]/80 backdrop-blur-md border border-slate-700/50 p-3 rounded-xl flex flex-col justify-center">
                    <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider mb-1">
                      Critic
                    </span>
                    <span className="text-xl font-bold text-[#b388ff] leading-none">{currentGame.metacriticScore}</span>
                  </div>
                  <div className="bg-[#0b0c15]/80 backdrop-blur-md border border-slate-700/50 p-3 rounded-xl flex flex-col justify-center">
                    <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#00e676]" /> Hours
                    </span>
                    <span className="text-xl font-bold text-[#00e676] leading-none">{currentGame.avg_playtime.split('-')[0].replace(/h+\+?$/i, '').trim()}h+</span>
                  </div>
                  <div className="bg-[#0b0c15]/80 backdrop-blur-md border border-slate-700/50 p-3 rounded-xl flex flex-col justify-center">
                    <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider mb-1">
                      Optimiz.
                    </span>
                    <span className="text-xl font-bold text-[#00b0ff] leading-none">{currentGame.optimizationScore}</span>
                  </div>
                </div>

                {/* Action Buttons & Pricing */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
                  {/* Pricing Frame */}
                  <div className="flex items-center gap-4 bg-slate-900/50 backdrop-blur-md border border-slate-700/50 p-2 pr-5 rounded-2xl">
                    {currentGame.discount > 0 ? (
                      <>
                        <div className="bg-[#ff1744] text-white font-black text-sm px-3 py-2 rounded-xl">
                          -{currentGame.discount}%
                        </div>
                        <div className="flex flex-col justify-center">
                          <span className="text-xs font-mono text-slate-400 line-through leading-none mb-1">
                            ${currentGame.originalPrice.toFixed(2)}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-mono font-black text-[#00e676] leading-none">
                              ${currentGame.lowestPrice.toFixed(2)}
                            </span>
                            {currentGame.discount >= 25 && (
                              <span className="text-[9px] font-bold uppercase tracking-wider text-[#00e676] bg-[#00e676]/10 px-1.5 py-0.5 rounded border border-[#00e676]/20">
                                Lowest Ever
                              </span>
                            )}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="px-3 flex items-center h-full">
                        <span className="text-2xl font-mono font-black text-white leading-none">
                          ${currentGame.originalPrice.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 w-full sm:w-auto">
                    <div className="flex items-center gap-3 flex-wrap">
                      <button 
                        onClick={() => onSelectGame(currentGame.id)}
                        className="flex-1 sm:flex-none px-6 py-4 bg-[#00b0ff] hover:bg-[#0090ff] text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(0,176,255,0.3)] hover:shadow-[0_0_30px_rgba(0,176,255,0.5)] transform hover:-translate-y-0.5 whitespace-nowrap"
                      >
                        View Details
                      </button>
                      <button 
                        onClick={() => onSelectGame(currentGame.id)}
                        className="flex-1 sm:flex-none px-6 py-4 bg-slate-800/80 hover:bg-slate-700/80 text-white font-bold rounded-xl border border-slate-600 transition-all transform hover:-translate-y-0.5 whitespace-nowrap backdrop-blur-md"
                      >
                        Compare Prices
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => onToggleWishlist(currentGame.id)}
                        className="w-14 h-14 flex items-center justify-center bg-slate-800/80 hover:bg-slate-700/80 text-white border border-slate-600 rounded-xl transition-all hover:scale-105 active:scale-95 disabled:bg-[#00e676] disabled:border-[#00e676]"
                        aria-label="Wishlist"
                      >
                        <AnimatePresence mode="wait">
                          {isWishlisted ? (
                            <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                              <Check className="w-6 h-6 text-[#00e676]" />
                            </motion.div>
                          ) : (
                            <motion.div key="plus" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                              <Plus className="w-6 h-6" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </button>
                      
                      {/* Watch Trailer CTA */}
                      <button 
                        onClick={() => onSelectGame(currentGame.id)}
                        className="group flex-1 sm:flex-none flex items-center justify-center gap-3 px-6 h-14 rounded-xl bg-black/40 border border-white/20 hover:bg-white hover:text-black transition-all backdrop-blur-md"
                      >
                        <span className="w-6 h-6 rounded-full bg-white/20 group-hover:bg-black/10 flex items-center justify-center">
                          <Play className="w-3 h-3 text-white group-hover:text-black fill-current" />
                        </span>
                        <span className="font-bold tracking-wide">Watch Trailer</span>
                      </button>
                    </div>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Navigation controls (Mobile & Desktop) */}
        <div className="absolute bottom-8 left-4 lg:left-12 right-4 lg:right-12 z-20 flex items-center justify-between">
          
          {/* Previous Arrow */}
          <button 
            type="button"
            onClick={goToPrev}
            className="w-10 h-10 rounded-full bg-[#11121d]/80 border border-slate-700 hover:bg-[#00b0ff] hover:border-[#00b0ff] text-slate-300 hover:text-white transition-all flex items-center justify-center backdrop-blur-sm"
            aria-label="Previous Deal"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Carousel Dot Indicators */}
          <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
            {featuredGames.map((game, idx) => (
              <button
                key={game.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex 
                    ? 'w-8 h-2 bg-[#00b0ff] shadow-[0_0_10px_rgba(0,176,255,0.5)]' 
                    : 'w-2 h-2 bg-slate-600 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Next Arrow */}
          <button 
            type="button"
            onClick={goToNext}
            className="w-10 h-10 rounded-full bg-[#11121d]/80 border border-slate-700 hover:bg-[#00b0ff] hover:border-[#00b0ff] text-slate-300 hover:text-white transition-all flex items-center justify-center backdrop-blur-sm"
            aria-label="Next Deal"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>

    </div>
  );
}
