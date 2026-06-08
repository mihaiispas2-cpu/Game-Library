import { useState, useEffect } from 'react';
import { ChevronDown, ArrowLeft, Trophy, Monitor, Gamepad2, Star, Heart, FileVideo, Music, BookOpen, Zap, Users, Flame, TrendingUp, Calendar, User, ArrowUp, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../supabaseClient';
import { Game } from '../types';

interface TopRatedProps {
  games: Game[];
  onViewChange: (view: 'home' | 'browse' | 'topRated') => void;
  onSelectGame: (id: string) => void;
  onGoBack: () => void;
}
export default function TopRated({ games, onViewChange, onSelectGame, onGoBack }: TopRatedProps) {
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [topGames, setTopGames] = useState<Game[]>([]);
  const [loadingTopGames, setLoadingTopGames] = useState(true);
  const [awards, setAwards] = useState<any[]>([]);
  const [loadingAwards, setLoadingAwards] = useState(true);
  const [yearSummary, setYearSummary] = useState<string | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(true);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const { data, error } = await supabase
          .from('games')
          .select('release_date')
          .not('release_date', 'is', null);
        if (error) throw error;
        const yearsSet = new Set<string>();
        data.forEach((row) => {
          if (!row.release_date) return;
          const match = row.release_date.match(/(?:19|20)\d{2}/);
          if (match) yearsSet.add(match[0]);
        });
        const yearsArray = Array.from(yearsSet).sort((a, b) => Number(b) - Number(a));
        setAvailableYears(yearsArray);
        if (yearsArray.length > 0) setSelectedYear(yearsArray[0]);
      } catch (err) {
        console.error('Failed to fetch years:', err);
      }
    };
    fetchYears();
  }, []);

  useEffect(() => {
    if (!selectedYear) return;
    const fetchTopGames = async () => {
      setLoadingTopGames(true);
      try {
        const { data: topGamesData, error: topError } = await supabase
          .from('top_rated_games')
          .select('*')
          .eq('year', selectedYear)
          .order('rank', { ascending: true });

        if (topError) throw topError;

        if (topGamesData) {
          const gameIds = topGamesData.map((t: any) => t.game_id).filter(Boolean);
          
          let gamesMap: Record<string, any> = {};
          if (gameIds.length > 0) {
            const { data: gamesData, error: gamesError } = await supabase
              .from('games')
              .select('*')
              .in('id', gameIds);
              
            if (gamesError) throw gamesError;
            if (gamesData) {
              gamesData.forEach((g: any) => {
                gamesMap[g.id] = g;
              });
            }
          }

          const mappedGames = topGamesData.map((t: any) => {
            const d = t.game_id ? gamesMap[t.game_id] : null;

            if (d) {
              return {
                id: d.id,
                title: d.title || t.game_title || 'Unknown Title',
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
              };
            }

            return {
              id: t.game_id || t.id || Math.random().toString(),
              title: t.game_title || 'Unknown Title',
              coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80',
              heroImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80',
              shortDescription: '',
              longDescription: '',
              genres: [],
              platforms: [],
              features: [],
              rating: 0,
              metacriticScore: 0,
              userScore: 0,
              lowestPrice: 0,
              originalPrice: 0,
              discount: 0,
              releaseDate: 'TBA',
              developer: '',
              publisher: '',
              engine: '',
              dev_time: '',
              estimated_budget: '',
              avg_playtime: '',
              multiplayer: '',
              modSupport: '',
              drmInfo: '',
              optimizationScore: 0,
              performanceRating: '',
              deals: [],
              priceHistory: [],
            };
          });

          setTopGames(mappedGames);
        }
      } catch (err) {
        console.error('Failed to fetch top games', err);
      } finally {
        setLoadingTopGames(false);
      }
    };

    const fetchAwards = async () => {
      setLoadingAwards(true);
      try {
        const { data: awardsData, error } = await supabase
          .from('category_awards')
          .select('*')
          .eq('year', selectedYear);
        if (error) throw error;
        if (awardsData) {
          setAwards(awardsData);
        }
      } catch (err) {
        console.error('Failed to fetch awards', err);
      } finally {
        setLoadingAwards(false);
      }
    };

    const fetchSummary = async () => {
      setLoadingSummary(true);
      try {
        const { data, error } = await supabase
          .from('year_in_gaming')
          .select('summary')
          .eq('year', selectedYear)
          .single();
        if (error) throw error;
        if (data) {
          setYearSummary(data.summary);
        }
      } catch (err: any) {
        if (err?.code !== 'PGRST116') {
          console.error('Failed to fetch summary', err);
        }
        setYearSummary(null);
      } finally {
        setLoadingSummary(false);
      }
    };

    fetchTopGames();
    fetchAwards();
    fetchSummary();
  }, [selectedYear]);

  const allYears = availableYears;
  const goty = topGames[0];

  return (
    <div className="min-h-screen bg-[#0d1017]">
      
      {loadingTopGames ? (
        <div className="pt-32 pb-32 flex justify-center">
          <Loader2 className="w-12 h-12 text-[#00b0ff] animate-spin" />
        </div>
      ) : topGames.length === 0 ? (
        <div className="pt-32 pb-32 flex justify-center flex-col items-center gap-4 text-slate-400">
          <Gamepad2 className="w-12 h-12 text-slate-600 mb-2" />
          <h2 className="text-xl font-bold text-white">No Top Games Found</h2>
          <p>We couldn't find any games for {selectedYear}.</p>
        </div>
      ) : (
        <>
        {/* Hero Section with Game of the Year */}
        <div className="relative w-full pt-6">
        
        {/* Background Image Setup */}
        <div className="absolute top-0 left-0 right-0 h-[600px] z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d1017] via-[#0d1017]/90 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1017] via-transparent to-transparent z-10" />
          {goty?.heroImage && (
            <img
              src={goty?.heroImage}
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
            onClick={onGoBack}
            className="flex items-center gap-2 bg-[#12141d]/80 border border-slate-800 hover:border-slate-600 px-4 py-2 rounded-lg text-sm font-medium text-slate-200 transition-colors w-max"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
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
              {goty?.genres?.[0] && (
                <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider bg-[#0f766e]/40 text-[#5eead4] border border-[#0f766e]">
                  {goty.genres[0]}
                </span>
              )}
              {goty?.genres?.[1] && (
                <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider bg-[#0369a1]/40 text-[#7dd3fc] border border-[#0369a1]">
                  {goty.genres[1]}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="font-display font-extrabold text-white text-5xl tracking-tight leading-tight">
              {goty?.title}
            </h1>

            {/* Metadata */}
            <div className="flex items-center gap-6 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-500" />
                {selectedYear}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-slate-500" />
                {goty?.developer}
              </span>
              <span className="flex items-center gap-2">
                <Monitor className="w-4 h-4 text-slate-500" />
                <Gamepad2 className="w-4 h-4 text-slate-500" />
              </span>
            </div>

            {/* Description */}
            <p className="text-slate-300 text-sm leading-relaxed max-w-xl line-clamp-3">
              {goty?.shortDescription}
            </p>

            {/* Scores */}
            <div className="flex items-center gap-4 mt-2">
              <div className="bg-[#12141c]/60 border border-slate-800 p-3 rounded-xl flex flex-col gap-1 w-28">
                <span className="text-[10px] font-mono text-slate-500">Critic Score</span>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-[#eab308] fill-[#eab308]" />
                  <span className="text-2xl font-bold text-white leading-none">
                    {Math.round(goty?.metacriticScore || goty?.rating || 0)}
                  </span>
                </div>
              </div>
              <div className="bg-[#12141c]/60 border border-slate-800 p-3 rounded-xl flex flex-col gap-1 w-28">
                <span className="text-[10px] font-mono text-slate-500">User Score</span>
                <div className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-[#0ea5e9] fill-[#0ea5e9]" />
                  <span className="text-2xl font-bold text-white leading-none">
                    {goty?.userScore ? goty.userScore.toFixed(1) : ((goty?.rating || 0) / 10).toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 mt-4">
              <button 
                onClick={() => {
                  if (goty?.id) onSelectGame(goty?.id);
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
      </>
      )}

      <div className="max-w-7xl mx-auto px-4 lg:px-12 w-full flex flex-col gap-12 py-16">
        
        {/* Select Year */}
        <div className="space-y-4">
          <h2 className="text-2xl font-display font-extrabold text-white">Select Year</h2>
          <div className="flex flex-wrap items-center gap-3">
            {availableYears.slice(0, 5).map((year) => (
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
            <div 
              onClick={() => onSelectGame(topGames[0]?.id)}
              className="bg-[#12141c] border border-slate-800 rounded-xl p-4 flex items-center gap-4 hover:border-[#00b0ff]/50 hover:shadow-[0_0_20px_rgba(0,176,255,0.2)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#fcd34d] to-[#d97706] flex items-center justify-center shadow-[0_0_10px_rgba(217,119,6,0.3)] shrink-0">
                <span className="text-[#422006] font-black text-sm">1</span>
              </div>
              <div className="w-24 h-14 bg-slate-800 rounded-md overflow-hidden shrink-0 hidden sm:block">
                <img src={topGames[0]?.coverImage || ''} alt="Game" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-slate-100 truncate">{topGames[0]?.title}</h3>
                <div className="flex items-center gap-3 text-[10px] text-slate-500 mt-1 font-mono shrink-0">
                  <span className="truncate max-w-[120px]">{topGames[0]?.genres?.[0] || 'Game'}</span>
                  <div className="flex gap-1.5"><Monitor className="w-3.5 h-3.5" /><Gamepad2 className="w-3.5 h-3.5" /></div>
                </div>
              </div>
              <div className="flex items-center gap-6 shrink-0 pr-2">
                 <div className="flex flex-col items-center gap-1 border-r border-slate-800 pr-4">
                   <span className="text-[9px] uppercase tracking-wider text-slate-500 font-mono">Critic</span>
                   <div className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-[#eab308] fill-[#eab308]"/><span className="font-bold text-white text-sm">{Math.round(topGames[0]?.metacriticScore || topGames[0]?.rating || 0)}</span></div>
                 </div>
                 <div className="flex flex-col items-center gap-1">
                   <span className="text-[9px] uppercase tracking-wider text-slate-500 font-mono">User</span>
                   <div className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-[#0ea5e9] fill-[#0ea5e9]"/><span className="font-bold text-white text-sm">{topGames[0]?.userScore ? topGames[0].userScore.toFixed(1) : ((topGames[0]?.rating || 0) / 10).toFixed(1)}</span></div>
                 </div>
              </div>
            </div>

            {/* Rank 2 */}
            {topGames[1] && (
            <div 
              onClick={() => onSelectGame(topGames[1]?.id)}
              className="bg-[#12141c] border border-slate-800 rounded-xl p-4 flex items-center gap-4 hover:border-[#00b0ff]/50 hover:shadow-[0_0_20px_rgba(0,176,255,0.2)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#e2e8f0] to-[#94a3b8] flex items-center justify-center shrink-0">
                <span className="text-[#1e293b] font-black text-sm">2</span>
              </div>
              <div className="w-24 h-14 bg-slate-800 rounded-md overflow-hidden shrink-0 hidden sm:block">
                <img src={topGames[1]?.coverImage || ''} alt="Game" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-slate-100 truncate">{topGames[1]?.title}</h3>
                <div className="flex items-center gap-3 text-[10px] text-slate-500 mt-1 font-mono shrink-0">
                  <span className="truncate max-w-[120px]">{topGames[1]?.genres?.[0] || 'Game'}</span>
                  <div className="flex gap-1.5"><Monitor className="w-3.5 h-3.5" /><Gamepad2 className="w-3.5 h-3.5" /></div>
                </div>
              </div>
              <div className="flex items-center gap-6 shrink-0 pr-2">
                 <div className="flex flex-col items-center gap-1 border-r border-slate-800 pr-4">
                   <span className="text-[9px] uppercase tracking-wider text-slate-500 font-mono">Critic</span>
                   <div className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-[#eab308] fill-[#eab308]"/><span className="font-bold text-white text-sm">{Math.round(topGames[1]?.metacriticScore || topGames[1]?.rating || 0)}</span></div>
                 </div>
                 <div className="flex flex-col items-center gap-1">
                   <span className="text-[9px] uppercase tracking-wider text-slate-500 font-mono">User</span>
                   <div className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-[#0ea5e9] fill-[#0ea5e9]"/><span className="font-bold text-white text-sm">{topGames[1]?.userScore ? topGames[1].userScore.toFixed(1) : ((topGames[1]?.rating || 0) / 10).toFixed(1)}</span></div>
                 </div>
              </div>
            </div>

            )}

            {/* Rank 3 */}
            {topGames[2] && (
            <div 
              onClick={() => onSelectGame(topGames[2]?.id)}
              className="bg-[#12141c] border border-slate-800 rounded-xl p-4 flex items-center gap-4 hover:border-[#00b0ff]/50 hover:shadow-[0_0_20px_rgba(0,176,255,0.2)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f97316] to-[#b45309] flex items-center justify-center shrink-0">
                <span className="text-[#431407] font-black text-sm">3</span>
              </div>
              <div className="w-24 h-14 bg-slate-800 rounded-md overflow-hidden shrink-0 hidden sm:block">
                <img src={topGames[2]?.coverImage || ''} alt="Game" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-slate-100 truncate">{topGames[2]?.title}</h3>
                <div className="flex items-center gap-3 text-[10px] text-slate-500 mt-1 font-mono shrink-0">
                  <span className="truncate max-w-[120px]">{topGames[2]?.genres?.[0] || 'Game'}</span>
                  <div className="flex gap-1.5"><Monitor className="w-3.5 h-3.5" /><Gamepad2 className="w-3.5 h-3.5" /></div>
                </div>
              </div>
              <div className="flex items-center gap-6 shrink-0 pr-2">
                 <div className="flex flex-col items-center gap-1 border-r border-slate-800 pr-4">
                   <span className="text-[9px] uppercase tracking-wider text-slate-500 font-mono">Critic</span>
                   <div className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-[#eab308] fill-[#eab308]"/><span className="font-bold text-white text-sm">{Math.round(topGames[2]?.metacriticScore || topGames[2]?.rating || 0)}</span></div>
                 </div>
                 <div className="flex flex-col items-center gap-1">
                   <span className="text-[9px] uppercase tracking-wider text-slate-500 font-mono">User</span>
                   <div className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-[#0ea5e9] fill-[#0ea5e9]"/><span className="font-bold text-white text-sm">{topGames[2]?.userScore ? topGames[2].userScore.toFixed(1) : ((topGames[2]?.rating || 0) / 10).toFixed(1)}</span></div>
                 </div>
              </div>
            </div>

            )}

          </div>
        </div>

        {/* Categories Grid */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Trophy className="w-6 h-6 text-[#c084fc]" />
            <h2 className="text-2xl font-display font-extrabold text-white">{selectedYear} Category Awards</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loadingAwards ? (
              <div className="col-span-full py-12 flex justify-center">
                <Loader2 className="w-8 h-8 text-[#00b0ff] animate-spin" />
              </div>
            ) : awards.length === 0 ? (
              <div className="col-span-full py-8 text-slate-400 text-center font-medium">
                No awards data for this year
              </div>
            ) : (
              awards.map((award) => {
                let Icon = Trophy;
                let iconColor = "text-[#00b0ff]";
                const catStr = (award.category || '').toLowerCase();
                if (catStr.includes('rpg') || catStr.includes('gameplay') || catStr.includes('action')) { Icon = Gamepad2; iconColor = "text-[#a855f7]"; }
                else if (catStr.includes('sound') || catStr.includes('music') || catStr.includes('audio')) { Icon = Music; iconColor = "text-[#ec4899]"; }
                else if (catStr.includes('story') || catStr.includes('narrative')) { Icon = BookOpen; iconColor = "text-[#0ea5e9]"; }
                else if (catStr.includes('innovat')) { Icon = Zap; iconColor = "text-[#eab308]"; }
                else if (catStr.includes('multiplayer') || catStr.includes('co-op') || catStr.includes('family')) { Icon = Users; iconColor = "text-[#10b981]"; }
                else if (catStr.includes('indie')) { Icon = Flame; iconColor = "text-[#f97316]"; }

                return (
                  <div key={award.id} className="bg-[#12141c] border border-slate-800 rounded-xl p-5 flex flex-col gap-4 group">
                    <div className="flex items-center gap-2 text-white font-bold">
                      <Icon className={`w-5 h-5 ${iconColor}`} />
                      {award.category}
                    </div>
                    <div 
                      onClick={() => award.game_id && onSelectGame(award.game_id)}
                      className={`bg-[#1a1d29] px-4 py-3 rounded-lg text-sm text-slate-200 border border-slate-800 font-medium ${award.game_id ? 'cursor-pointer hover:border-[#00b0ff]/50 hover:text-white transition-colors hover:shadow-[0_0_10px_rgba(0,176,255,0.1)]' : ''}`}
                    >
                      {award.game_title}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Recap Paragraph Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <TrendingUp className="w-6 h-6 text-[#0ea5e9]" />
            <h2 className="text-2xl font-display font-extrabold text-white">{selectedYear} in Gaming</h2>
          </div>
          <div className="bg-[#12141c] border border-slate-800 p-6 rounded-xl">
            {loadingSummary ? (
              <div className="flex justify-center py-4">
                <Loader2 className="w-6 h-6 text-[#00b0ff] animate-spin" />
              </div>
            ) : yearSummary ? (
              <p className="text-sm text-slate-300 leading-relaxed font-sans whitespace-pre-wrap">
                {yearSummary}
              </p>
            ) : (
              <p className="text-sm text-slate-400 leading-relaxed font-sans italic text-center py-4">
                No summary available for this year.
              </p>
            )}
          </div>
        </div>

      </div>
      
      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
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
    </div>
  );
}
