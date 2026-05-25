import { useState } from 'react';
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
import { GAMES } from './data';
import { Radio, Flame, Sparkles } from 'lucide-react';

export default function App() {
  const [selectedGameId, setSelectedGameId] = useState<string>('elden-ring-shadow');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [wishlist, setWishlist] = useState<string[]>(['elden-ring-shadow']); 
  const [activeView, setActiveView] = useState<'home' | 'browse' | 'topRated' | 'deals' | 'news' | 'gameDetails'>('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Locate the currently spotlighted game based on active tab state
  const activeGame = GAMES.find((g) => g.id === selectedGameId) || GAMES[0];

  const handleToggleWishlist = (gameId: string) => {
    setWishlist((prev) =>
      prev.includes(gameId) ? prev.filter((id) => id !== gameId) : [...prev, gameId]
    );
  };

  const handleSelectGame = (id: string) => {
    setSelectedGameId(id);
    setActiveView('gameDetails');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#06070a] text-slate-100 font-sans antialiased overflow-x-hidden">
      
      {/* Decorative Neon ambient blur overlays in background for premium dark theme */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[800px] right-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[150px] pointer-events-none z-0" />

      {/* Top Navigation */}
      <Navbar
        games={GAMES}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedGameId={selectedGameId}
        onSelectGame={handleSelectGame}
        wishlistCount={wishlist.length}
        activeView={activeView}
        onViewChange={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onLoginClick={() => setIsAuthModalOpen(true)}
      />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />

      {/* Main Structural Grid Section Flow */}
      <main className="relative z-10 w-full">
        {activeView === 'browse' ? (
          <BrowseGames
            games={GAMES}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onViewChange={(view) => {
              setActiveView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectGame={handleSelectGame}
          />
        ) : activeView === 'topRated' ? (
          <TopRated 
            games={GAMES}
            onViewChange={(view) => {
              setActiveView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectGame={handleSelectGame}
          />
        ) : activeView === 'deals' ? (
          <Deals 
            onViewChange={(view) => {
              setActiveView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : activeView === 'news' ? (
          <News />
        ) : activeView === 'gameDetails' ? (
          <GameDetailsPage 
            game={activeGame}
            games={GAMES}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onSelectGame={handleSelectGame}
            onViewChange={(view) => {
              setActiveView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : (
          <>
            {/* Cinematic Hero Carousel */}
            <FeaturedHeroCarousel 
              games={GAMES}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onSelectGame={handleSelectGame}
            />

            {/* Dynamic Game Syndicate Information Bar */}
            <section className="bg-[#111221] border-y border-slate-900 py-3.5 px-4 lg:px-12">
              <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span>Syndicating pricing indices for: <span className="text-white font-bold">{GAMES.length} blockbuster releases</span></span>
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
            <GameDetailsPreview game={activeGame} />

            {/* Platform best deals catalog list */}
            <DealsComparison game={activeGame} />

            {/* Interactive Price Chronology events */}
            <PriceHistoryChart game={activeGame} />

            {/* Trending releases grid section */}
            <TrendingGames
              games={GAMES}
              selectedId={selectedGameId}
            onSelectGame={handleSelectGame}
            />

            {/* User reviews card grids */}
            <UserReviews game={activeGame} />
          </>
        )}
      </main>

      {/* Global Footer */}
      <Footer />

    </div>
  );
}
