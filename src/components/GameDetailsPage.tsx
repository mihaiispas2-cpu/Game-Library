import { useState, useEffect, useRef } from 'react';
import { Game } from '../types';
import { 
  Heart, Play, DollarSign, Star, Crown, Calendar, Users, Building, 
  Settings2, Gamepad2, Globe2, Clock, MonitorPlay, FileBadge2,
  ChevronDown, ArrowLeft, Maximize2, X, ArrowUp, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import PriceHistoryChart from './PriceHistoryChart';
import DealsComparison from './DealsComparison';
import UserReviews from './UserReviews';
import BrowseGames from './BrowseGames';
import { supabase } from '../supabaseClient';

interface GameDetailsPageProps {
  gameId: string;
  initialGame?: Game; // Optional initial game if it's already loaded in App state
  isVisible?: boolean;
  games: Game[];
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  onSelectGame: (id: string) => void;
  onViewChange: (view: 'home' | 'browse' | 'topRated' | 'deals' | 'news') => void;
  onGoBack: () => void;
}

// Temporary default screenshots
const SCREENSHOTS = [
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1605901309584-818e25960b8f?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=1200"
];

// Placeholder Video Thumbnail
const VIDEO_THUMB = "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1600";

const cleanSystemReqs = (html: string) => {
  if (!html) return [];
  // Steam uses lots of <br> and <li> for new lines. Handle tags with attributes.
  let withNewlines = html.replace(/<br\s*[\/]?>/gi, '\n');
  withNewlines = withNewlines.replace(/<\/li>/gi, '\n');
  withNewlines = withNewlines.replace(/<li[^>]*>/gi, '\n');
  withNewlines = withNewlines.replace(/<\/(p|div)>/gi, '\n');
  
  // Use DOM parser to strip the rest of HTML
  const doc = new DOMParser().parseFromString(withNewlines, 'text/html');
  const text = doc.body.textContent || '';
  
  return text.split('\n')
    .map(l => l.replace(/^[•\-*]\s*/, '').trim())
    .filter(l => l && !l.toLowerCase().match(/^(minimum|recommended)( system requirements)?:?$/));
};

export default function GameDetailsPage({ 
  gameId,
  initialGame,
  isVisible = true,
  games,
  wishlist, 
  onToggleWishlist,
  onSelectGame,
  onViewChange,
  onGoBack
}: GameDetailsPageProps) {
  const [scrollY, setScrollY] = useState(0);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [game, setGame] = useState<Game | null>(initialGame && initialGame.id === gameId ? initialGame : null);
  const [isLoading, setIsLoading] = useState(!game);
  const trailerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    
    const fetchGame = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('games')
          .select('*')
          .eq('id', gameId)
          .single();
          
        if (error) throw error;
        
        if (isMounted && data) {
          const mappedGame: Game = {
            id: data.id,
            title: data.title || 'Unknown Title',
            coverImage: data.coverImage || data.cover_image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80',
            heroImage: data.heroImage || data.cover_image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80',
            shortDescription: data.description || data.shortDescription || '',
            longDescription: data.description || data.longDescription || '',
            genres: data.genres || ['Action'],
            platforms: data.platforms || ['PC'],
            features: data.features || [],
            rating: data.rating || data.score || 0,
            metacriticScore: data.rating || data.score || data.metacriticScore || 0,
            userScore: data.rating ? data.rating / 10 : (data.score ? data.score / 10 : 0),
            lowestPrice: data.price || 0,
            originalPrice: data.price || 0,
            discount: data.discount || 0,
            releaseDate: data.release_date || data.releaseDate || 'TBA',
            developer: data.developer || 'Unknown Developer',
            publisher: data.publisher || '',
            engine: data.engine || '',
            dev_time: data.dev_time || '',
            estimated_budget: data.estimated_budget || '',
            avg_playtime: data.avg_playtime || '',
            multiplayer: data.multiplayer || '',
            modSupport: data.modSupport || '',
            drmInfo: data.drmInfo || '',
            optimizationScore: data.optimizationScore || 0,
            performanceRating: data.performanceRating || '',
            deals: data.deals || [],
            priceHistory: data.priceHistory || [],
            reviews: data.reviews || [],
            screenshots: data.screenshots || [],
            trailer_url: data.trailer_url || data.trailerUrl || '',
            system_requirements: data.system_requirements || null
          };
          setGame(mappedGame);
        }
      } catch (err) {
        console.error('Error fetching game details:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    if (!initialGame || initialGame.id !== gameId) {
      setGame(null); // Clear previous game while loading a new one
      fetchGame();
    } else {
      setGame(initialGame);
      setIsLoading(false);
    }
    
    return () => {
      isMounted = false;
    };
  }, [gameId, initialGame]);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading || !game) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#00b0ff] mb-4" />
        <span className="text-slate-400 font-mono text-sm tracking-widest uppercase">Initializing Secure Link...</span>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(game.id);
  const isGoty = game.rating >= 95 || game.id === 'elden-ring-shadow';
  
  const backgroundOpacity = Math.max(0.3, 1 - scrollY / 700);

  // Similar games (just take 4 from same genre, excluding current)
  const similarGames = games
    .filter(g => g.id !== game.id && g.genres.some(genre => game.genres.includes(genre)))
    .slice(0, 4);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full pb-20"
    >
      
      {/* Dynamic Parallax Hero Background */}
      <div 
        className="absolute top-0 left-0 w-full h-[800px] overflow-hidden -z-10"
        style={{ opacity: backgroundOpacity }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-75"
          style={{ 
            backgroundImage: `url(${game.heroImage})`,
            transform: `translateY(${scrollY * 0.4}px) scale(1.05)`,
            filter: 'blur(2px)'
          }}
        />
        {/* Layered Gradients for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#06070a]/20 via-[#06070a]/60 to-[#06070a] z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06070a] via-transparent to-[#06070a] z-10" />
        <div className="absolute inset-0 bg-[#06070a]/40 backdrop-blur-[2px] z-10" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 lg:px-12 pt-8 sm:pt-16">
        
        {/* Back navigation */}
        <button 
          onClick={onGoBack}
          className="flex items-center gap-2 text-slate-300 hover:text-white mb-12 hover:bg-white/5 py-2 px-4 rounded-full transition-all border border-slate-800/0 hover:border-slate-700/50 w-max"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-semibold tracking-wide">Back</span>
        </button>

        {/* HERO SECTION */}
        <div className="flex flex-col lg:flex-row gap-12 lg:items-end">
          
          <div className="flex-1 space-y-6">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              {game.genres.map(g => (
                <span key={g} className="px-3 py-1 rounded-full border border-[#00b0ff]/30 text-[#00b0ff] text-[10px] font-bold uppercase tracking-wider bg-[#00b0ff]/5 backdrop-blur-sm shadow-[0_0_10px_rgba(0,176,255,0.1)]">
                  {g}
                </span>
              ))}
            </div>

            {isGoty && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-yellow-500/20 to-yellow-600/5 border border-yellow-500/30 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.15)]">
                <Crown className="w-4 h-4 fill-yellow-500" />
                <span className="text-xs font-bold tracking-wide uppercase">GOTY Winner {game.releaseDate.split(', ')[1] || '2022'}</span>
              </div>
            )}

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-black text-white tracking-tight leading-none drop-shadow-2xl">
              {game.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                {game.releaseDate}
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-400" />
                {game.developer}
              </div>
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-4 h-4 text-slate-400" />
                {game.platforms.join(', ')}
              </div>
            </div>

            {/* Score & Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-6">
              
              <div className="flex items-center gap-4 px-5 py-3 rounded-2xl bg-black/40 border border-slate-800/80 backdrop-blur-md">
                <Star className="w-8 h-8 text-yellow-500 fill-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-yellow-500 tracking-tighter">{game.userScore}</span>
                    <span className="text-slate-400 font-bold">/ 10</span>
                  </div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Outstanding Reviews</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button 
                  onClick={() => onToggleWishlist(game.id)}
                  className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold transition-all shadow-lg ${
                    isWishlisted 
                    ? 'bg-rose-500/10 text-rose-500 border border-rose-500/50 hover:bg-rose-500/20' 
                    : 'bg-[#1a1c29] text-white border border-slate-700 hover:border-slate-500 hover:bg-[#25283b]'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                  {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                </button>

                {game.trailer_url && (
                  <button 
                    onClick={() => {
                      trailerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold bg-[#1a1c29] text-white border border-slate-700 hover:border-slate-500 hover:bg-[#25283b] transition-all shadow-lg"
                  >
                    <Play className="w-5 h-5 text-[#00b0ff]" />
                    Watch Trailer
                  </button>
                )}

                <button 
                  onClick={() => {
                    document.getElementById('deals-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-black bg-gradient-to-r from-[#00b0ff] to-[#0081cb] text-white transition-all shadow-[0_0_20px_rgba(0,176,255,0.3)] hover:shadow-[0_0_30px_rgba(0,176,255,0.5)] hover:-translate-y-0.5"
                >
                  <DollarSign className="w-5 h-5" />
                  Compare Prices
                </button>
              </div>

            </div>
          </div>
          
        </div>

        {/* PAGE CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mt-20">
          
          <div className="col-span-1 lg:col-span-4 space-y-16">
            
            {/* GAME INFORMATION PANEL - Glassmorphism */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <FileBadge2 className="w-6 h-6 text-[#00b0ff]" />
                <h2 className="text-2xl font-display font-bold text-white">Game Information</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                
                {[
                  { icon: <Calendar/>, label: "Release Date", value: game.releaseDate },
                  { icon: <Users/>, label: "Developer", value: game.developer },
                  { icon: <Building/>, label: "Publisher", value: game.publisher },
                  { icon: <Settings2/>, label: "Engine", value: game.engine },
                  { icon: <Gamepad2/>, label: "Multiplayer", value: game.multiplayer },
                  { icon: <Clock/>, label: "Avg Playtime", value: game.avg_playtime },
                  { icon: <DollarSign/>, label: "Est. Budget", value: game.estimated_budget, highlight: true },
                  { icon: <Globe2/>, label: "Dev Time", value: game.dev_time },
                  { icon: <MonitorPlay/>, label: "Platforms", value: game.platforms.join(', ') },
                  { icon: <FileBadge2/>, label: "ESRB Rating", value: "M (Mature 17+)" },
                  { icon: <Gamepad2/>, label: "Genre", value: game.genres.join(', ') },
                  { icon: <Star/>, label: "Critic Score", value: game.rating > 0 ? `${(game.rating / 10).toFixed(1)} / 10` : 'N/A', highlight: true, color: 'text-[#00e676]' }
                ].map((item, i) => (
                  <div key={i} className="bg-[#11121d]/80 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700/80 transition-colors">
                    <div className="flex items-center gap-2 mb-2 text-slate-500">
                      <div className="w-4 h-4 [&>svg]:w-full [&>svg]:h-full">{item.icon}</div>
                      <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                    </div>
                    <div className={`text-sm font-medium ${item.highlight ? item.color || 'text-[#00e676]' : 'text-slate-200'}`}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* STEAM STYLE DESCRIPTION SECTION */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-[#00b0ff]" />
                <h2 className="text-2xl font-display font-bold text-white">About This Game</h2>
              </div>
              <div className="bg-[#11121d]/80 backdrop-blur-md border border-slate-800 rounded-2xl p-8 lg:p-10 relative overflow-hidden group">
                <div className={`space-y-6 text-slate-300 leading-relax font-sans ${isDescExpanded ? '' : 'line-clamp-4'}`}>
                  <p>{game.longDescription}</p>
                  <p>{game.shortDescription}</p>
                  <p>Experience breathtaking environments and intense combat. The developers have crafted a world full of rich storytelling, deep lore, and challenging mechanics that will test your skills. Whether you prefer stealth, magic, or brute force, you will find a playstyle that suits you.</p>
                </div>
                
                {!isDescExpanded && (
                  <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#11121d] via-[#11121d]/80 to-transparent flex items-end justify-start px-8 lg:px-10 pb-6 pointer-events-none">
                    <button 
                      onClick={() => setIsDescExpanded(true)}
                      className="text-[#00b0ff] font-bold text-sm tracking-wide flex items-center gap-1 hover:text-white transition-colors pointer-events-auto"
                    >
                      Read More <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* SCREENSHOT GALLERY */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <MonitorPlay className="w-6 h-6 text-[#00b0ff]" />
                <h2 className="text-2xl font-display font-bold text-white">Screenshots & Media</h2>
              </div>
              
              {/* TRAILER SECTION */}
              {game.trailer_url && isVisible !== false ? (
                <div ref={trailerRef} className="relative rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-slate-800/80 mb-6" id="trailer-section">
                  <div className="aspect-video w-full">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src={`https://www.youtube.com/embed/${game.trailer_url.split('v=')[1]}`} 
                      title="Game Trailer" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    />
                  </div>
                </div>
              ) : (
                <div ref={trailerRef} className="relative rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-slate-800/80 mb-6" id="trailer-section">
                  <div className="aspect-video w-full overflow-hidden relative">
                    <img src={VIDEO_THUMB} alt="Trailer Thumbnail placeholder" className="w-full h-full object-cover pointer-events-none" />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-slate-400 font-bold uppercase tracking-widest text-sm">No Trailer Available</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SCREENSHOT CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {(game.screenshots && game.screenshots.length > 0 ? game.screenshots : SCREENSHOTS).map((src, idx) => (
                  <div 
                    key={idx} 
                    className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group shadow-lg"
                    onClick={() => setLightboxImage(src)}
                  >
                    <img 
                      src={src} 
                      alt={`Screenshot ${idx + 1}`} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <Maximize2 className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity transform scale-50 group-hover:scale-100 duration-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PRICE HISTORY */}
            <div className="pt-8">
              <PriceHistoryChart game={game} />
            </div>

            {/* BEST DEALS */}
            <div className="pt-8">
              <DealsComparison game={game} />
            </div>

            {/* COMMUNITY REVIEWS */}
            <div className="pt-8">
              <UserReviews game={game} />
            </div>

            {/* SYSTEM REQUIREMENTS */}
            {(() => {
              if (!game.system_requirements) return null;
              const min = game.system_requirements.minimum;
              const rec = game.system_requirements.recommended;
              const hasMin = !!min;
              const hasRec = !!rec && cleanSystemReqs(rec).join('\n') !== cleanSystemReqs(min || '').join('\n');
              
              if (!hasMin && !hasRec) return null;
              
              return (
                <div className="pt-8 space-y-6">
                  <div className="flex items-center gap-3">
                    <Settings2 className="w-6 h-6 text-[#00b0ff]" />
                    <h2 className="text-2xl font-display font-bold text-white">System Requirements</h2>
                  </div>
                  <div className={`grid grid-cols-1 ${hasRec ? 'xl:grid-cols-2' : ''} gap-6 text-sm font-sans`}>
                    {hasMin && (
                      <div className="bg-[#11121d] border border-slate-800 p-6 rounded-2xl space-y-4">
                        <h3 className="font-bold text-white mb-4">Minimum</h3>
                        <div className="h-[256px] overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent" style={{ maxHeight: '256px' }}>
                           {cleanSystemReqs(min).map((line, i) => {
                               const colonIdx = line.indexOf(':');
                               if (colonIdx > -1 && colonIdx < 30) {
                                 const key = line.substring(0, colonIdx).trim();
                                 const val = line.substring(colonIdx + 1).trim();
                                 if (!key) return <div key={i} className="text-slate-300 font-medium">{val}</div>;
                                 return (
                                   <div key={i} className="flex flex-col sm:flex-row sm:justify-between border-b border-slate-800/50 pb-2 gap-1 sm:gap-4">
                                     <span className="text-slate-500 whitespace-nowrap shrink-0">{key}</span>
                                     <span className="text-slate-300 font-medium sm:text-right">{val}</span>
                                   </div>
                                 );
                               }
                               return <div key={i} className="text-slate-300 font-medium pb-2 border-b border-slate-800/50">• {line}</div>;
                           })}
                        </div>
                      </div>
                    )}
                    {hasRec && (
                      <div className="bg-[#11121d] border border-slate-800 p-6 rounded-2xl space-y-4">
                        <h3 className="font-bold text-[#00e676] mb-4 flex items-center gap-2">Recommended <span className="text-[10px] bg-[#00e676]/10 px-2 py-0.5 rounded text-[#00e676] uppercase">Recommended</span></h3>
                        <div className="h-[256px] overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent" style={{ maxHeight: '256px' }}>
                           {cleanSystemReqs(rec).map((line, i) => {
                               const colonIdx = line.indexOf(':');
                               if (colonIdx > -1 && colonIdx < 30) {
                                 const key = line.substring(0, colonIdx).trim();
                                 const val = line.substring(colonIdx + 1).trim();
                                 if (!key) return <div key={i} className="text-slate-300 font-medium">{val}</div>;
                                 return (
                                   <div key={i} className="flex flex-col sm:flex-row sm:justify-between border-b border-slate-800/50 pb-2 gap-1 sm:gap-4">
                                     <span className="text-slate-500 whitespace-nowrap shrink-0">{key}</span>
                                     <span className="text-slate-300 font-medium sm:text-right">{val}</span>
                                   </div>
                                 );
                               }
                               return <div key={i} className="text-slate-300 font-medium border-b border-slate-800/50 pb-2">• {line}</div>;
                           })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* SIMILAR GAMES */}
            <div className="pt-8 space-y-6">
              <div className="flex items-center gap-3">
                <Gamepad2 className="w-6 h-6 text-[#00b0ff]" />
                <h2 className="text-2xl font-display font-bold text-white">Similar Games You Might Like</h2>
              </div>
              
              <div className="flex overflow-x-auto gap-4 pb-8 custom-scrollbar snap-x">
                {similarGames.map(sg => {
                  const currentDiscount = sg.deals?.[0]?.discountPercentage || sg.discount || 0;
                  const currentPrice = sg.deals?.[0]?.discountedPrice || (sg.originalPrice * (1 - currentDiscount / 100));

                  return (
                    <div 
                      key={sg.id}
                      onClick={() => onSelectGame(sg.id)}
                      className="min-w-[280px] w-[280px] sm:min-w-[320px] sm:w-[320px] bg-[#11121d] border border-slate-800 rounded-xl overflow-hidden cursor-pointer hover:border-[#00b0ff]/50 hover:shadow-[0_0_20px_rgba(0,176,255,0.2)] hover:-translate-y-1 transition-all duration-300 group snap-start shrink-0"
                    >
                      <div className="relative aspect-[16/9] w-full overflow-hidden">
                        <img 
                          src={sg.heroImage} 
                          alt={sg.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {currentDiscount > 0 && (
                          <div className="absolute top-3 right-3 bg-[#00e676] text-[#003300] font-black text-xs px-2 py-1 rounded shadow-lg">
                            -{currentDiscount}%
                          </div>
                        )}
                      </div>
                      <div className="p-4 space-y-2">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#00b0ff]">
                          {sg.genres[0]}
                        </div>
                        <h4 className="font-bold text-white truncate text-base">{sg.title}</h4>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-1 text-sm font-bold text-yellow-500">
                            <Star className="w-3.5 h-3.5 fill-yellow-500" />
                            {sg.rating > 0 ? `${(sg.rating / 10).toFixed(1)} / 10` : 'N/A'}
                          </div>
                          <span className="font-mono font-bold text-[#00b0ff]">
                            ${currentPrice.toFixed(2)}
                          </span>
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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-12"
            onClick={() => setLightboxImage(null)}
          >
            <button 
              className="absolute top-6 right-6 p-3 text-white hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setLightboxImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={lightboxImage} 
              alt="Fullscreen screenshot"
              className="w-full max-w-7xl max-h-[85vh] object-contain rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Top Button */}
      <AnimatePresence>
        {scrollY > 400 && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 p-4 bg-[#0a0d14] border border-[#00b0ff]/30 text-[#00b0ff] rounded-full shadow-[0_0_20px_rgba(0,176,255,0.3)] hover:shadow-[0_0_30px_rgba(0,176,255,0.6)] hover:bg-[#00b0ff]/10 hover:-translate-y-1 transition-all group"
          >
            <ArrowUp className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

    </motion.div>
  );
}

function BookOpen(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}
