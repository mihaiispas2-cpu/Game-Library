import { useState } from 'react';
import { Gamepad2, Search, Heart, User, Sun } from 'lucide-react';
import { Game } from '../types';

interface NavbarProps {
  games: Game[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedGameId: string;
  onSelectGame: (id: string, browsePage?: boolean) => void;
  wishlistCount: number;
  activeView: 'home' | 'browse' | 'topRated' | 'deals' | 'news' | 'gameDetails';
  onViewChange: (view: 'home' | 'browse' | 'topRated' | 'deals' | 'news') => void;
  onLoginClick: () => void;
}

export default function Navbar({
  games,
  searchQuery,
  setSearchQuery,
  selectedGameId,
  onSelectGame,
  wishlistCount,
  activeView,
  onViewChange,
  onLoginClick,
}: NavbarProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredGames = games.filter((g) =>
    g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.genres.some((genre) => genre.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <nav className="bg-[#11121d] border-b border-slate-850 sticky top-0 z-50 px-4 py-3 lg:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Logo and Search bar group */}
        <div className="flex items-center gap-6 flex-1 max-w-xl">
          {/* Logo */}
          <div 
            onClick={() => {
              onSelectGame(games[0].id);
              onViewChange('home');
            }} 
            className="flex items-center gap-2 cursor-pointer group"
            id="nav-logo"
          >
            <div className="text-[#00d4ff]">
              <Gamepad2 className="w-8 h-8 md:w-9 md:h-9" />
            </div>
            <span className="font-display font-bold text-2xl md:text-3xl tracking-tight text-[#00d4ff]">
              Game<span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3b82f6] to-[#a855f7]">Library</span>
            </span>
          </div>

          {/* Search bar */}
          <div className="relative flex-1 hidden md:block">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search games, genres, publishers..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              className="w-full bg-[#1e2030] pl-10 pr-4 py-1.5 text-xs rounded-full text-slate-200 placeholder-slate-400 border border-transparent focus:outline-none focus:border-slate-700 focus:bg-[#23263a] transition-all"
            />
            
            {showDropdown && searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#11121d] border border-slate-800 rounded-xl shadow-2xl p-2 z-50 max-h-80 overflow-y-auto">
                <div className="flex justify-between items-center px-2 py-1 border-b border-slate-800 mb-1">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#3b82f6]">Search Results</span>
                  <button 
                    onClick={() => setShowDropdown(false)}
                    className="text-slate-400 hover:text-white text-[9px] bg-slate-800 px-1.5 py-0.5 rounded cursor-pointer"
                  >
                    Close
                  </button>
                </div>
                {filteredGames.length > 0 ? (
                  filteredGames.map((g) => (
                    <div
                      key={g.id}
                      onClick={() => {
                        onSelectGame(g.id);
                        onViewChange('home');
                        setSearchQuery('');
                        setShowDropdown(false);
                      }}
                      className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-slate-800/60 transition-colors"
                    >
                      <div className="w-8 h-8 rounded overflow-hidden flex-shrink-0 bg-slate-900">
                        <img src={g.coverImage} className="w-full h-full object-cover" alt={g.title} referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-slate-200 truncate">{g.title}</div>
                      </div>
                      <div className="text-[10px] font-mono font-bold text-slate-450">
                        {g.rating}%
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-xs text-slate-500">
                    No games found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Navigation Links and Utility Bar */}
        <div className="flex items-center gap-8">
          {/* Menu items */}
          <div className="hidden lg:flex items-center gap-6 text-xs text-slate-300 font-medium">
            <button 
              onClick={() => {
                onSelectGame(games[0].id);
                onViewChange('home');
              }}
              className={`hover:text-white transition-colors cursor-pointer ${activeView === 'home' ? 'text-white' : ''}`}
            >
              Home
            </button>
            <button 
              onClick={() => onViewChange('browse')}
              className={`hover:text-white transition-colors cursor-pointer ${activeView === 'browse' ? 'text-white' : ''}`}
            >
              Games
            </button>
            <button 
              onClick={() => onViewChange('topRated')}
              className={`hover:text-white transition-colors cursor-pointer ${activeView === 'topRated' ? 'text-white' : ''}`}
            >
              Top Rated
            </button>
            <button 
              onClick={() => onViewChange('deals')}
              className={`hover:text-white transition-colors cursor-pointer ${activeView === 'deals' ? 'text-white' : ''}`}
            >
              Deals
            </button>
            <button 
              onClick={() => onViewChange('news')}
              className={`hover:text-white transition-colors cursor-pointer ${activeView === 'news' ? 'text-white' : ''}`}
            >
              News
            </button>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-4">
            {/* Sunrise / Brightness Icon */}
            <button className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer">
              <Sun className="w-4 h-4" />
            </button>

            {/* Watchlist Heart Icon */}
            <div className="relative">
              <button className="p-1.5 text-slate-405 hover:text-red-400 transition-colors cursor-pointer">
                <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[8px] flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </button>
            </div>

            {/* User Log In Button */}
            <button 
              onClick={onLoginClick}
              className="ml-2 px-4 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-[#3b82f6] to-[#a855f7] hover:from-[#2563eb] hover:to-[#9333ea] rounded-full shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all transform hover:-translate-y-0.5"
            >
              Log In
            </button>
          </div>
        </div>

      </div>
    </nav>
  );
}
