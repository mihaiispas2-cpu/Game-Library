import { useState } from 'react';
import { ChevronDown, ArrowLeft, Trophy, Monitor, Gamepad2, Star, Heart, FileVideo, Music, BookOpen, Zap, Users, Flame, TrendingUp, Calendar, User } from 'lucide-react';

import { Game } from '../types';

interface TopRatedProps {
  games: Game[];
  onViewChange: (view: 'home' | 'browse' | 'topRated') => void;
  onSelectGame: (id: string) => void;
}
export default function TopRated({ games, onViewChange, onSelectGame }: TopRatedProps) {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Generate array from 2026 to 1960
  const allYears = Array.from({ length: 2026 - 1960 + 1 }, (_, i) => (2026 - i).toString());

  // Using the first game as the Game of the Year (Elden Ring)
  const goty = games[0];

  return (
    <div className="min-h-screen bg-[#0d1017]">
      
      {/* Hero Section with Game of the Year */}
      <div className="relative w-full pt-6">
        
        {/* Background Image Setup */}
        <div className="absolute top-0 left-0 right-0 h-[600px] z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d1017] via-[#0d1017]/90 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1017] via-transparent to-transparent z-10" />
          {goty.heroImage && (
            <img
              src={goty.heroImage}
              alt="Background"
              className="absolute top-0 right-0 w-[70%] h-full object-cover opacity-60"
              referrerPolicy="no-referrer"
            />
          )}
        </div>

        {/* Content Wrapper */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 lg:px-12 w-full flex flex-col gap-8">
          
          {/* Back Button */}
          <button 
            onClick={() => onViewChange('home')}
            className="flex items-center gap-2 bg-[#12141d]/80 border border-slate-800 hover:border-slate-600 px-4 py-2 rounded-lg text-sm font-medium text-slate-200 transition-colors w-max"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          {/* GOTY Info */}
          <div className="flex flex-col gap-5 max-w-2xl mt-4">
            
            {/* Golden Pill */}
            <div className="flex items-center gap-2 bg-[#eab308] text-[#422006] px-4 py-1.5 rounded-full w-max shadow-[0_0_15px_rgba(234,179,8,0.3)]">
              <Trophy className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">{selectedYear} Game of the Year</span>
            </div>

            {/* Tags */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider bg-[#0f766e]/40 text-[#5eead4] border border-[#0f766e]">
                Action RPG
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider bg-[#0369a1]/40 text-[#7dd3fc] border border-[#0369a1]">
                Open World
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display font-extrabold text-white text-5xl tracking-tight leading-tight">
              {goty.title}
            </h1>

            {/* Metadata */}
            <div className="flex items-center gap-6 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-500" />
                2024
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-slate-500" />
                {goty.developer}
              </span>
              <span className="flex items-center gap-2">
                <Monitor className="w-4 h-4 text-slate-500" />
                <Gamepad2 className="w-4 h-4 text-slate-500" />
              </span>
            </div>

            {/* Description */}
            <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
              Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring. A massive expansion that redefines what DLC can achieve.
            </p>

            {/* Scores */}
            <div className="flex items-center gap-4 mt-2">
              <div className="bg-[#12141c]/60 border border-slate-800 p-3 rounded-xl flex flex-col gap-1 w-28">
                <span className="text-[10px] font-mono text-slate-500">Critic Score</span>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-[#eab308] fill-[#eab308]" />
                  <span className="text-2xl font-bold text-white leading-none">94</span>
                </div>
              </div>
              <div className="bg-[#12141c]/60 border border-slate-800 p-3 rounded-xl flex flex-col gap-1 w-28">
                <span className="text-[10px] font-mono text-slate-500">User Score</span>
                <div className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-[#0ea5e9] fill-[#0ea5e9]" />
                  <span className="text-2xl font-bold text-white leading-none">96</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 mt-4">
              <button 
                onClick={() => {
                  onSelectGame(goty.id);
                  onViewChange('home');
                }}
                className="bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] hover:from-[#0369a1] hover:to-[#0284c7] text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all shadow-lg flex items-center gap-2 cursor-pointer"
              >
                View Details
                <ArrowLeft className="w-4 h-4 rotate-135" />
              </button>
              <button className="bg-[#1e293b]/60 border border-slate-700 hover:bg-[#334155]/60 text-slate-200 px-6 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer backdrop-blur-sm">
                <FileVideo className="w-4 h-4" />
                Watch Trailer
              </button>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-12 w-full flex flex-col gap-12 py-16">
        
        {/* Select Year */}
        <div className="space-y-4">
          <h2 className="text-2xl font-display font-extrabold text-white">Select Year</h2>
          <div className="flex flex-wrap items-center gap-3">
            {['2026', '2025', '2024', '2023', '2022'].map((year) => (
              <button
                key={`quick-${year}`}
                onClick={() => setSelectedYear(year)}
                className={`px-8 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  selectedYear === year
                    ? 'bg-[#38bdf8] text-[#082f49]'
                    : 'bg-[#151924] border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600'
                }`}
              >
                {year}
              </button>
            ))}
            
            <div className="relative inline-block w-full sm:w-auto z-40">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-6 py-3 min-w-[160px] bg-[#151924] border border-slate-800 hover:border-slate-600 rounded-xl text-sm font-bold text-slate-300 hover:text-white transition-all flex items-center justify-between cursor-pointer shadow-sm"
              >
                <span>More Years ({allYears.length})</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-30" 
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <div className="absolute top-full left-0 mt-2 w-full sm:w-48 bg-[#1a1f2e] border border-slate-700/80 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden z-50">
                    <div className="max-h-[300px] overflow-y-auto custom-scrollbar flex flex-col">
                      {allYears.map((year) => (
                        <button
                          key={year}
                          onClick={() => {
                            setSelectedYear(year);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors hover:bg-slate-800 cursor-pointer ${
                            selectedYear === year ? 'text-[#38bdf8] bg-slate-800/50' : 'text-slate-300'
                          }`}
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Top Rated Games of {selectedYear} List */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Trophy className="w-6 h-6 text-[#eab308]" />
            <h2 className="text-2xl font-display font-extrabold text-white">Top Rated Games of {selectedYear}</h2>
          </div>

          <div className="flex flex-col gap-3">
            {/* Rank 1 */}
            <div className="bg-[#12141c] border border-slate-800 rounded-xl p-4 flex items-center gap-4 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#fcd34d] to-[#d97706] flex items-center justify-center shadow-[0_0_10px_rgba(217,119,6,0.3)] shrink-0">
                <span className="text-[#422006] font-black text-sm">1</span>
              </div>
              <div className="w-24 h-14 bg-slate-800 rounded-md overflow-hidden shrink-0 hidden sm:block">
                <img src={games[0]?.coverImage || ''} alt="Game" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-slate-100 truncate">{games[0]?.title}</h3>
                <div className="flex items-center gap-3 text-[10px] text-slate-500 mt-1 font-mono">
                  <span>Action RPG</span>
                  <div className="flex gap-1.5"><Monitor className="w-3.5 h-3.5" /><Gamepad2 className="w-3.5 h-3.5" /></div>
                </div>
              </div>
              <div className="flex items-center gap-6 shrink-0 pr-2">
                 <div className="flex flex-col items-center gap-1">
                   <span className="text-[9px] uppercase tracking-wider text-slate-500 font-mono">Critic</span>
                   <div className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-[#eab308] fill-[#eab308]"/><span className="font-bold text-white text-sm">94</span></div>
                 </div>
                 <div className="flex flex-col items-center gap-1">
                   <span className="text-[9px] uppercase tracking-wider text-slate-500 font-mono">User</span>
                   <div className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-[#0ea5e9] fill-[#0ea5e9]"/><span className="font-bold text-white text-sm">96</span></div>
                 </div>
              </div>
            </div>

            {/* Rank 2 */}
            <div className="bg-[#12141c] border border-slate-800 rounded-xl p-4 flex items-center gap-4 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#e2e8f0] to-[#94a3b8] flex items-center justify-center shrink-0">
                <span className="text-[#1e293b] font-black text-sm">2</span>
              </div>
              <div className="w-24 h-14 bg-slate-800 rounded-md overflow-hidden shrink-0 hidden sm:block">
                <img src={games[1]?.coverImage || ''} alt="Game" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-slate-100 truncate">Metaphor: ReFantazio</h3>
                <div className="flex items-center gap-3 text-[10px] text-slate-500 mt-1 font-mono">
                  <span>JRPG</span>
                  <div className="flex gap-1.5"><Monitor className="w-3.5 h-3.5" /><Gamepad2 className="w-3.5 h-3.5" /></div>
                </div>
              </div>
              <div className="flex items-center gap-6 shrink-0 pr-2">
                 <div className="flex flex-col items-center gap-1">
                   <span className="text-[9px] uppercase tracking-wider text-slate-500 font-mono">Critic</span>
                   <div className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-[#eab308] fill-[#eab308]"/><span className="font-bold text-white text-sm">94</span></div>
                 </div>
                 <div className="flex flex-col items-center gap-1">
                   <span className="text-[9px] uppercase tracking-wider text-slate-500 font-mono">User</span>
                   <div className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-[#0ea5e9] fill-[#0ea5e9]"/><span className="font-bold text-white text-sm">92</span></div>
                 </div>
              </div>
            </div>

            {/* Rank 3 */}
            <div className="bg-[#12141c] border border-slate-800 rounded-xl p-4 flex items-center gap-4 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f97316] to-[#b45309] flex items-center justify-center shrink-0">
                <span className="text-[#431407] font-black text-sm">3</span>
              </div>
              <div className="w-24 h-14 bg-slate-800 rounded-md overflow-hidden shrink-0 hidden sm:block">
                <img src={games[2]?.coverImage || ''} alt="Game" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-slate-100 truncate">Helldivers 2</h3>
                <div className="flex items-center gap-3 text-[10px] text-slate-500 mt-1 font-mono">
                  <span>Action</span>
                  <div className="flex gap-1.5"><Monitor className="w-3.5 h-3.5" /><Gamepad2 className="w-3.5 h-3.5" /></div>
                </div>
              </div>
              <div className="flex items-center gap-6 shrink-0 pr-2">
                 <div className="flex flex-col items-center gap-1">
                   <span className="text-[9px] uppercase tracking-wider text-slate-500 font-mono">Critic</span>
                   <div className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-[#eab308] fill-[#eab308]"/><span className="font-bold text-white text-sm">82</span></div>
                 </div>
                 <div className="flex flex-col items-center gap-1">
                   <span className="text-[9px] uppercase tracking-wider text-slate-500 font-mono">User</span>
                   <div className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-[#0ea5e9] fill-[#0ea5e9]"/><span className="font-bold text-white text-sm">89</span></div>
                 </div>
              </div>
            </div>

          </div>
        </div>

        {/* Categories Grid */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Trophy className="w-6 h-6 text-[#c084fc]" />
            <h2 className="text-2xl font-display font-extrabold text-white">{selectedYear} Category Awards</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Award Card 1 */}
            <div className="bg-[#12141c] border border-slate-800 rounded-xl p-5 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-white font-bold">
                <Gamepad2 className="w-5 h-5 text-[#a855f7]" />
                Best RPG
              </div>
              <div className="bg-[#1a1d29] px-4 py-3 rounded-lg text-sm text-slate-200 border border-slate-800 font-medium">
                Elden Ring: Shadow of the Erdtree
              </div>
            </div>

            {/* Award Card 2 */}
            <div className="bg-[#12141c] border border-slate-800 rounded-xl p-5 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-white font-bold">
                <Music className="w-5 h-5 text-[#ec4899]" />
                Best Soundtrack
              </div>
              <div className="bg-[#1a1d29] px-4 py-3 rounded-lg text-sm text-slate-200 border border-slate-800 font-medium">
                Metaphor: ReFantazio
              </div>
            </div>

            {/* Award Card 3 */}
            <div className="bg-[#12141c] border border-slate-800 rounded-xl p-5 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-white font-bold">
                <BookOpen className="w-5 h-5 text-[#0ea5e9]" />
                Best Story
              </div>
              <div className="bg-[#1a1d29] px-4 py-3 rounded-lg text-sm text-slate-200 border border-slate-800 font-medium">
                Elden Ring: Shadow of the Erdtree
              </div>
            </div>

            {/* Award Card 4 */}
            <div className="bg-[#12141c] border border-slate-800 rounded-xl p-5 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-white font-bold">
                <Zap className="w-5 h-5 text-[#eab308]" />
                Most Innovative
              </div>
              <div className="bg-[#1a1d29] px-4 py-3 rounded-lg text-sm text-slate-200 border border-slate-800 font-medium">
                Helldivers 2
              </div>
            </div>

            {/* Award Card 5 */}
            <div className="bg-[#12141c] border border-slate-800 rounded-xl p-5 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-white font-bold">
                <Users className="w-5 h-5 text-[#10b981]" />
                Best Multiplayer
              </div>
              <div className="bg-[#1a1d29] px-4 py-3 rounded-lg text-sm text-slate-200 border border-slate-800 font-medium">
                Metaphor: ReFantazio
              </div>
            </div>

            {/* Award Card 6 */}
            <div className="bg-[#12141c] border border-slate-800 rounded-xl p-5 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-white font-bold">
                <Flame className="w-5 h-5 text-[#f97316]" />
                Best Indie
              </div>
              <div className="bg-[#1a1d29] px-4 py-3 rounded-lg text-sm text-slate-200 border border-slate-800 font-medium">
                Helldivers 2
              </div>
            </div>

          </div>
        </div>

        {/* Recap Paragraph Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <TrendingUp className="w-6 h-6 text-[#0ea5e9]" />
            <h2 className="text-2xl font-display font-extrabold text-white">{selectedYear} in Gaming</h2>
          </div>
          <div className="bg-[#12141c] border border-slate-800 p-6 rounded-xl">
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              {selectedYear} marked an incredible year for gaming with the release of highly anticipated expansions and new IPs that pushed the boundaries of interactive storytelling and gameplay innovation.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
