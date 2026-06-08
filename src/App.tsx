import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import FeaturedHeroCarousel from './components/FeaturedHeroCarousel';
import TrendingGames from './components/TrendingGames';
import DealsComparison from './components/DealsComparison';
import GameDetailsPreview from './components/GameDetailsPreview';
import PriceHistoryChart from './components/PriceHistoryChart';
import UserReviews from './components/UserReviews';
import Footer from './components/Footer';
import BrowseGames from './components/BrowseGames';
import TopRated from './components/TopRated';
import Deals from './components/Deals';
import News from './components/News';
import GameDetailsPage from './components/GameDetailsPage';
import AuthModal from './components/AuthModal';
import { GAMES as STATIC_GAMES } from './data';
import { Game } from './types';
import { Radio, Flame, Sparkles, Loader2, AlertCircle, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from './supabaseClient';
import type { User } from '@supabase/supabase-js';

type ViewType = 'home' | 'browse' | 'topRated' | 'deals' | 'news' | 'gameDetails';

type HistoryEntry = {
  id: string;
  view: ViewType;
  selectedGameId: string | null;
  scrollY: number;
};

export default function App() {
  const [history, setHistory] = useState<HistoryEntry[]>([{
    id: 'initial',
    view: 'home',
    selectedGameId: 'elden-ring-shadow',
    scrollY: 0
  }]);
  
  const [featuredGame, setFeaturedGame] = useState<Game | null>(null);
  
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [wishlist, setWishlist] = useState<string[]>(['elden-ring-shadow']); 
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);

  const [games, setGames] = useState<Game[]>([]);
  const [gamesLoading, setGamesLoading] = useState(true);
  const [gamesError, setGamesError] = useState<string | null>(null);

  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setGamesLoading(true);
        setGamesError(null);
        
        console.log('Fetching games from Supabase...');
        const { data: supabaseData, error } = await supabase.from('games').select('*').limit(20);
        
        let mappedGames: Game[] = [];

        if (error) {
          console.error('Supabase fetch error:', error);
        } else if (supabaseData) {
          console.log('Fetched raw games data from Supabase:', supabaseData);
          mappedGames = supabaseData.map((d: any) => ({
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
        }

        if (mappedGames.length > 0) {
          setGames(mappedGames);
        } else {
          setGames(STATIC_GAMES);
        }

      } catch (err: any) {
        console.error('Error fetching games:', err.message);
        setGamesError(err.message);
        setGames(STATIC_GAMES);
      } finally {
        setGamesLoading(false);
      }
    };

    fetchGames();
  }, []);

  useEffect(() => {
    const fetchProfile = async (userId: string) => {
      const { data, error } = await supabase
        .from('profiles')
        .select('nickname')
        .eq('id', userId)
        .single();
      
      if (!error && data) {
        setNickname(data.nickname);
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setNickname(null); // Clear nickname on logout
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Use the top of the stack
  const currentHistoryEntry = history[history.length - 1];
  const activeView = currentHistoryEntry.view;
  const selectedGameId = currentHistoryEntry.selectedGameId || 'elden-ring-shadow';

  // Locate the currently spotlighted game based on active tab state
  const activeGame = games.find((g) => g.id === selectedGameId) || games[0];

  const handleToggleWishlist = (gameId: string) => {
    setWishlist((prev) =>
      prev.includes(gameId) ? prev.filter((id) => id !== gameId) : [...prev, gameId]
    );
  };

  const handleViewChange = (view: ViewType) => {
    setHistory((prev) => {
      const current = prev[prev.length - 1];
      if (current.view === view) return prev; 
      
      const newPrev = [...prev];
      newPrev[newPrev.length - 1].scrollY = window.scrollY; // save current scroll
      return [...newPrev, { id: Math.random().toString(), view, selectedGameId: current.selectedGameId, scrollY: 0 }];
    });
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 0);
  };

  const handleSelectGame = (id: string) => {
    setHistory((prev) => {
      const current = prev[prev.length - 1];
      if (current.view === 'gameDetails' && current.selectedGameId === id) return prev;
      
      const newPrev = [...prev];
      newPrev[newPrev.length - 1].scrollY = window.scrollY;
      return [...newPrev, { id: Math.random().toString(), view: 'gameDetails', selectedGameId: id, scrollY: 0 }];
    });
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 0);
  };

  const handleGoBack = () => {
    setHistory((prev) => {
      if (prev.length <= 1) return prev;
      const newHistory = prev.slice(0, -1);
      const target = newHistory[newHistory.length - 1];
      setTimeout(() => window.scrollTo({ top: target.scrollY, behavior: 'instant' }), 0);
      return newHistory;
    });
  };

  if (gamesLoading) {
    return (
      <div className="min-h-screen bg-[#06070a] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-[#00b0ff]" />
          <p className="font-mono text-sm tracking-wider uppercase text-slate-400">Loading Game Database...</p>
        </div>
      </div>
    );
  }

  if (gamesError && games.length === 0) {
    return (
      <div className="min-h-screen bg-[#06070a] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4 text-center max-w-md p-6 bg-red-500/10 rounded-2xl border border-red-500/20">
          <AlertCircle className="w-12 h-12 text-red-500" />
          <h2 className="text-xl font-bold text-red-400">Connection Error</h2>
          <p className="text-sm text-slate-400">{gamesError}</p>
        </div>
      </div>
    );
  }

  // Fallback if games array is totally empty
  if (!games || games.length === 0) {
    return (
      <div className="min-h-screen bg-[#06070a] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4 text-center max-w-md p-6 bg-slate-900 rounded-2xl border border-slate-800">
          <AlertCircle className="w-12 h-12 text-slate-500" />
          <h2 className="text-xl font-bold text-slate-300">No games found</h2>
          <p className="text-sm text-slate-400">Could not retrieve game records from the database.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06070a] text-slate-100 font-sans antialiased overflow-x-hidden">
      
      {/* Decorative Neon ambient blur overlays in background for premium dark theme */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[800px] right-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[150px] pointer-events-none z-0" />

      {/* Top Navigation */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedGameId={selectedGameId}
        onSelectGame={handleSelectGame}
        wishlistCount={wishlist.length}
        activeView={activeView}
        onViewChange={handleViewChange}
        onLoginClick={() => setIsAuthModalOpen(true)}
        user={user}
        nickname={nickname}
        onLogoutClick={() => supabase.auth.signOut()}
      />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />

      {/* Main Structural Grid Section Flow */}
      <main className="relative z-10 w-full">
        {history.map((entry, index) => {
          const isVisible = index === history.length - 1;
          const style = { display: isVisible ? 'block' : 'none' };
          const entryGame = games.find(g => g.id === entry.selectedGameId) || games[0];

          return (
            <div key={entry.id} style={style}>
              {entry.view === 'browse' ? (
                <BrowseGames
                  games={games}
                  wishlist={wishlist}
                  onToggleWishlist={handleToggleWishlist}
                  onViewChange={handleViewChange}
                  onSelectGame={handleSelectGame}
                  onGoBack={handleGoBack}
                />
              ) : entry.view === 'topRated' ? (
                <TopRated 
                  games={games}
                  onViewChange={handleViewChange}
                  onSelectGame={handleSelectGame}
                  onGoBack={handleGoBack}
                />
              ) : entry.view === 'deals' ? (
                <Deals 
                  games={games}
                  onSelectGame={handleSelectGame}
                  onViewChange={handleViewChange}
                  onGoBack={handleGoBack}
                />
              ) : entry.view === 'news' ? (
                <News 
                  games={games}
                  onSelectGame={handleSelectGame}
                />
              ) : entry.view === 'gameDetails' ? (
                <GameDetailsPage 
                  gameId={entry.selectedGameId || ''}
                  initialGame={entryGame}
                  isVisible={isVisible}
                  games={games}
                  wishlist={wishlist}
                  onToggleWishlist={handleToggleWishlist}
                  onSelectGame={handleSelectGame}
                  onViewChange={handleViewChange}
                  onGoBack={handleGoBack}
                />
              ) : (
                <>
                  {/* Cinematic Hero Carousel */}
                  <FeaturedHeroCarousel 
                    games={games}
                    wishlist={wishlist}
                    onToggleWishlist={handleToggleWishlist}
                    onSelectGame={handleSelectGame}
                    onFeaturedChange={(game) => setFeaturedGame(game)}
                  />

                  {/* Dynamic Game Syndicate Information Bar */}
                  <section className="bg-[#111221] border-y border-slate-900 py-3.5 px-4 lg:px-12">
                    <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
                      <div className="flex items-center gap-2">
                        <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                        <span>Syndicating pricing indices for: <span className="text-white font-bold">{games.length} blockbuster releases</span></span>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 text-red-500 animate-pulse" /> Max discount: <span className="text-[#00e676] font-bold">33% OFF</span>
                        </span>
                        <span className="hidden sm:inline-block text-slate-500">|</span>
                        <span className="hidden sm:inline-block">Currency: USD ($)</span>
                        <span className="hidden sm:inline-block text-slate-500">|</span>
                        <span className="text-[#00b0ff] font-bold uppercase tracking-wider flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 fill-[#00b0ff]/10" /> Verified Syndicate Feed
                        </span>
                      </div>
                    </div>
                  </section>

                  {/* Detailed game specifications preview column cards */}
                  <GameDetailsPreview game={featuredGame || games[0]} />

                  {/* Platform best deals catalog list */}
                  <DealsComparison game={featuredGame || games[0]} />

                  {/* Interactive Price Chronology events */}
                  <PriceHistoryChart game={featuredGame || games[0]} />

                  {/* Trending releases grid section */}
                  <TrendingGames
                    games={games}
                    selectedId={featuredGame?.id || ''}
                    onSelectGame={handleSelectGame}
                  />

                  {/* User reviews card grids */}
                  <UserReviews game={featuredGame || games[0]} />
                </>
              )}
            </div>
          );
        })}
      </main>

      {/* Back to Top Button */}
      <AnimatePresence>
        {activeView === 'home' && showBackToTop && (
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

      {/* Global Footer */}
      <Footer />

    </div>
  );
}
