import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import { ChevronDown, Search, ArrowLeft, ArrowUp, Heart, Monitor, Gamepad2, X, Star, SlidersHorizontal, Check, Apple, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Game } from '../types';
import { supabase } from '../supabaseClient';

interface BrowseGamesProps {
  games: Game[];
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  onViewChange: (view: 'home' | 'browse') => void;
  onSelectGame: (id: string) => void;
  onGoBack: () => void;
}

const sortOptions = ['Most Popular', 'Highest Rated', 'New Releases', 'Price: Low to High', 'Price: High to Low', 'Biggest Discount', 'Free Games', 'Most Wishlisted'];
const genreOptions = ['Action', 'Adventure', 'RPG', 'Open World', 'Strategy', 'Horror', 'Sci-Fi', 'Survival', 'Shooter', 'Racing', 'Simulation', 'MMORPG'];
const platformOptions = ['PC', 'PlayStation 5', 'Xbox Series X/S', 'Nintendo Switch', 'Mac', 'Linux', 'Steam Deck'];
const featureOptions = ['Singleplayer', 'Multiplayer', 'Co-op', 'Split Screen', 'MMO'];
const scoreOptions = ['90+', '80+', '70+', '60+'];

const PlatformIcons = ({ platforms, selectedPlatforms }: { platforms: string[], selectedPlatforms: string[] }) => {
  let hasPS = false;
  let hasXbox = false;
  let hasPC = false;
  let hasSwitch = false;
  let hasMac = false;
  let hasLinux = false;

  platforms.forEach(p => {
    const lower = p.toLowerCase();
    if (lower.includes('playstation') || lower.includes('ps4') || lower.includes('ps5')) hasPS = true;
    if (lower.includes('xbox')) hasXbox = true;
    if (lower.includes('pc') || lower.includes('windows')) hasPC = true;
    if (p === 'Nintendo Switch') hasSwitch = true;
    if (lower.includes('mac') || lower.includes('macos')) hasMac = true;
    if (lower.includes('linux')) hasLinux = true;
  });

  const psActive = selectedPlatforms.some(p => p.toLowerCase().includes('playstation'));
  const xboxActive = selectedPlatforms.some(p => p.toLowerCase().includes('xbox'));
  const pcActive = selectedPlatforms.some(p => p.toLowerCase().includes('pc'));
  const switchActive = selectedPlatforms.some(p => p === 'Nintendo Switch');
  const macActive = selectedPlatforms.some(p => p.toLowerCase().includes('mac'));
  const linuxActive = selectedPlatforms.some(p => p.toLowerCase().includes('linux'));

  const hasAnyFilter = selectedPlatforms.length > 0;

  const icons = [];

  if (hasPC) {
    const isGlow = hasAnyFilter ? pcActive : true;
    icons.push(
      <span key="pc" className={`flex items-center justify-center transition-all ${isGlow ? 'text-[#00d4ff] drop-shadow-[0_0_8px_rgba(0,212,255,0.8)] scale-110 opacity-100' : 'text-slate-500 opacity-50 drop-shadow-[0_0_2px_rgba(0,212,255,0.2)]'}`}>
        <Monitor className="w-5 h-5" />
      </span>
    );
  }
  if (hasPS) {
    const isGlow = hasAnyFilter ? psActive : true;
    icons.push(
      <span key="ps" className={`flex items-center justify-center font-bold text-[15px] leading-none transition-all tracking-tighter ${isGlow ? 'text-[#003087] drop-shadow-[0_0_8px_rgba(0,48,135,0.9)] scale-110 opacity-100' : 'text-slate-500 opacity-50 drop-shadow-[0_0_2px_rgba(0,48,135,0.2)]'}`}>
        PS
      </span>
    );
  }
  if (hasXbox) {
    const isGlow = hasAnyFilter ? xboxActive : true;
    icons.push(
      <span key="xbox" className={`flex items-center justify-center font-bold text-[16px] leading-none transition-all ${isGlow ? 'text-[#107C10] drop-shadow-[0_0_8px_rgba(16,124,16,0.9)] scale-110 opacity-100' : 'text-slate-500 opacity-50 drop-shadow-[0_0_2px_rgba(16,124,16,0.2)]'}`}>
        X
      </span>
    );
  }
  if (hasSwitch) {
    const isGlow = hasAnyFilter ? switchActive : true;
    icons.push(
      <svg key="switch" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 transition-all ${isGlow ? 'text-[#E4000F] drop-shadow-[0_0_8px_rgba(228,0,15,0.9)] scale-110 opacity-100' : 'text-slate-500 opacity-50 drop-shadow-[0_0_2px_rgba(228,0,15,0.2)]'}`}>
        <path d="M7 2c-2.76 0-5 2.24-5 5v10c0 2.76 2.24 5 5 5h2V2H7zm1.5 5.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm6.5-5.5v20h2c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5h-2zm1.5 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-1.5 8.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zm1.5 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-3-3a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0z" />
      </svg>
    );
  }
  if (hasMac) {
    const isGlow = hasAnyFilter ? macActive : true;
    icons.push(
      <span key="mac" className={`flex items-center justify-center transition-all ${isGlow ? 'text-[#ffffff] drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] scale-110 opacity-100' : 'text-slate-500 opacity-50 drop-shadow-[0_0_2px_rgba(255,255,255,0.2)]'}`}>
        <Apple className="w-5 h-5" />
      </span>
    );
  }
  if (hasLinux) {
    const isGlow = hasAnyFilter ? linuxActive : true;
    icons.push(
      <span key="linux" className={`flex items-center justify-center transition-all ${isGlow ? 'text-[#9B59B6] drop-shadow-[0_0_8px_rgba(155,89,182,0.8)] scale-110 opacity-100' : 'text-slate-500 opacity-50 drop-shadow-[0_0_2px_rgba(155,89,182,0.2)]'}`}>
        <Terminal className="w-5 h-5" />
      </span>
    );
  }

  const displayIcons = icons.slice(0, 6);

  return (
    <div className="flex items-center gap-3">
      {displayIcons}
    </div>
  );
};

function useDebounce<T>(value: T, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}

export default function BrowseGames({
  games,
  wishlist,
  onToggleWishlist,
  onViewChange,
  onSelectGame,
  onGoBack,
}: BrowseGamesProps) {
  const [internalSearch, setInternalSearch] = useState('');
  
  const [sortBy, setSortBy] = useState('Most Popular');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedScores, setSelectedScores] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const [paginatedGames, setPaginatedGames] = useState<Game[]>([]);
  const [totalGamesCount, setTotalGamesCount] = useState(0);
  const [isLoadingGames, setIsLoadingGames] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const debouncedSearch = useDebounce(internalSearch, 400);
  const debouncedPriceRange = useDebounce(priceRange, 400);
  const requestIdRef = useRef(0);

  // Reset page when filters change
  useEffect(() => {
    setPage(0);
    setPaginatedGames([]);
    setHasMore(true);
  }, [debouncedSearch, selectedGenres, selectedPlatforms, selectedFeatures, selectedScores, debouncedPriceRange, sortBy]);

  useEffect(() => {
    let isMounted = true;
    
    const fetchGames = async () => {
      setIsLoadingGames(true);
      const currentRequestId = ++requestIdRef.current;

      try {
        let query = supabase.from('games').select('*', { count: 'exact' });
        
        if (debouncedSearch) {
          query = query.ilike('title', `%${debouncedSearch}%`);
        }
        
        if (selectedGenres.length > 0) {
          query = query.overlaps('genres', selectedGenres);
        }
        
        if (selectedPlatforms.length > 0) {
          let platformStrs: string[] = [];
          selectedPlatforms.forEach(p => {
            if (p === 'PC') platformStrs.push('PC (Microsoft Windows)', 'PC');
            if (p === 'PlayStation 5') platformStrs.push('PlayStation 5', 'PlayStation 4', 'PS5', 'PS4');
            if (p === 'Xbox Series X/S') platformStrs.push('Xbox Series X|S', 'Xbox One', 'Xbox Series X', 'Xbox Series S');
            if (p === 'Nintendo Switch') platformStrs.push('Nintendo Switch', 'Switch');
            if (p === 'Mac') platformStrs.push('Mac', 'macOS');
            if (p === 'Linux') platformStrs.push('Linux');
            if (p === 'Steam Deck') platformStrs.push('Steam Deck');
          });
          query = query.overlaps('platforms', platformStrs);
        }
        
        if (selectedFeatures.length > 0) {
          let featureStrs: string[] = [];
          selectedFeatures.forEach(f => {
            if (f === 'Singleplayer') featureStrs.push('Single player');
            if (f === 'Multiplayer') featureStrs.push('Multiplayer', 'Online Co-Op', 'LAN Co-Op');
            if (f === 'Co-op') featureStrs.push('Co-operative', 'Online Co-Op');
            if (f === 'Split Screen') featureStrs.push('Split screen', 'Shared/Split Screen Co-Op');
            if (f === 'MMO') featureStrs.push('Massively Multiplayer Online', 'MMO');
          });
          query = query.overlaps('features', featureStrs);
        }
        
        if (selectedScores.length > 0) {
          const minScore = Math.min(...selectedScores.map(s => parseInt(s.replace('+', ''))));
          query = query.gte('rating', minScore);
        }
        
        if (debouncedPriceRange[0] > 0 || debouncedPriceRange[1] < 100) {
          query = query.gte('price', debouncedPriceRange[0]).lte('price', debouncedPriceRange[1]);
        }
        
        // Sorting
        if (sortBy === 'Most Popular') {
          query = query.order('rating', { ascending: false });
        } else if (sortBy === 'Highest Rated') {
          query = query.order('rating', { ascending: false });
        } else if (sortBy === 'New Releases') {
          query = query.order('id', { ascending: false }); // surrogate for new
        } else if (sortBy === 'Price: Low to High') {
          query = query.order('price', { ascending: true });
        } else if (sortBy === 'Price: High to Low') {
          query = query.order('price', { ascending: false });
        } else if (sortBy === 'Biggest Discount') {
          query = query.order('discount', { ascending: false });
        } else if (sortBy === 'Free Games') {
          query = query.eq('price', 0).order('rating', { ascending: false });
        } else if (sortBy === 'Most Wishlisted') {
          query = query.order('rating', { ascending: false });
        }
        
        // Add stable secondary sort to prevent duplicate keys in pagination
        query = query.order('id', { ascending: true });
        
        // Pagination
        const limit = page === 0 ? 18 : 20;
        const from = page === 0 ? 0 : 18 + (page - 1) * 20;
        const to = from + limit - 1;
        query = query.range(from, to);
        
        const { data, error, count } = await query;
        if (error) throw error;
        
        // ignore outdated requests
        if (currentRequestId !== requestIdRef.current) return;

        if (isMounted && data) {
          const mapped = data.map((d: any) => ({
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
            reviews: d.reviews || []
          }));

          if (page === 0) {
            setPaginatedGames(mapped);
          } else {
            setPaginatedGames(prev => {
              const existingIds = new Set(prev.map(g => g.id));
              const newGames = mapped.filter((g: any) => !existingIds.has(g.id));
              return [...prev, ...newGames];
            });
          }
          
          if (count !== null) setTotalGamesCount(count);
          setHasMore(mapped.length === limit);
        }
      } catch (err) {
        console.error('Error fetching games in BrowseGames:', err);
      } finally {
        if (isMounted) setIsLoadingGames(false);
      }
    };
    
    fetchGames();
    
    return () => { isMounted = false; };
  }, [page, debouncedSearch, selectedGenres, selectedPlatforms, selectedFeatures, selectedScores, debouncedPriceRange, sortBy]);


  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close sort dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleFilter = (list: string[], setList: Dispatch<SetStateAction<string[]>>, item: string) => {
    if (list.includes(item)) setList(list.filter(i => i !== item));
    else setList([...list, item]);
  };

  const clearAllFilters = () => {
    setSelectedGenres([]);
    setSelectedPlatforms([]);
    setSelectedFeatures([]);
    setSelectedScores([]);
    setPriceRange([0, 100]);
    setSortBy('Most Popular');
    setInternalSearch('');
  };

  // Helper matching functions
  const matchesFeature = (g: Game, feature: string) => {
    if (g.features && g.features.length > 0) {
      if (feature === 'Singleplayer') return g.features.some(f => f.toLowerCase().includes('single player'));
      if (feature === 'Multiplayer') return g.features.some(f => f.toLowerCase().includes('multiplayer'));
      if (feature === 'Co-op') return g.features.some(f => f.toLowerCase().includes('co-operative'));
      if (feature === 'Split Screen') return g.features.some(f => f.toLowerCase().includes('split screen'));
      if (feature === 'MMO') return g.features.some(f => f.toLowerCase().includes('massively multiplayer online'));
      return g.features.some(f => f.toLowerCase().includes(feature.toLowerCase()));
    }
    const multi = (g.multiplayer || '').toLowerCase();
    if (feature === 'Multiplayer') return multi.includes('multiplayer') || multi.includes('co-op') || multi.includes('pvp') || multi.includes('online');
    if (feature === 'Singleplayer') return !multi.includes('only') || multi === 'none';
    if (feature === 'Co-op') return multi.includes('co-op');
    // Mock rest as true or random for UI depth
    return true; 
  };

  const filteredGames = paginatedGames;

  // Calculate counts statically for the UI
  const getGenreCount = (genre: string) => games.filter(g => g.genres.some(gen => gen.toLowerCase().includes(genre.toLowerCase()))).length;
  const getPlatformCount = (platform: string) => {
    return games.filter(g => {
      if (platform === 'PC') return g.platforms.some(p => p.toLowerCase().includes('pc'));
      if (platform === 'PlayStation 5') return g.platforms.some(p => p.toLowerCase().includes('playstation 5') || p.toLowerCase().includes('playstation 4'));
      if (platform === 'Xbox Series X/S') return g.platforms.some(p => p.toLowerCase().includes('xbox series x') || p.toLowerCase().includes('xbox one'));
      if (platform === 'Nintendo Switch') return g.platforms.some(p => p === ('Switch' as any) || p === 'Nintendo Switch' as any);
      if (platform === 'Mac') return g.platforms.some(p => p.toLowerCase().includes('mac'));
      if (platform === 'Linux') return g.platforms.some(p => p.toLowerCase().includes('linux'));
      if (platform === 'Steam Deck') return true;
      return g.platforms.some(p => p.toLowerCase().includes(platform.toLowerCase()));
    }).length;
  };

  const activeFilters = [
    ...selectedGenres.map(g => ({ type: 'genre', value: g })),
    ...selectedPlatforms.map(p => ({ type: 'platform', value: p })),
    ...selectedFeatures.map(f => ({ type: 'feature', value: f })),
    ...selectedScores.map(s => ({ type: 'score', value: s })),
  ];
  if (priceRange[0] > 0 || priceRange[1] < 100) {
    activeFilters.push({ type: 'price', value: `$${priceRange[0]} - $${priceRange[1]}` });
  }

  const removeFilter = (filter: { type: string, value: string }) => {
    if (filter.type === 'genre') toggleFilter(selectedGenres, setSelectedGenres, filter.value);
    if (filter.type === 'platform') toggleFilter(selectedPlatforms, setSelectedPlatforms, filter.value);
    if (filter.type === 'feature') toggleFilter(selectedFeatures, setSelectedFeatures, filter.value);
    if (filter.type === 'score') toggleFilter(selectedScores, setSelectedScores, filter.value);
    if (filter.type === 'price') setPriceRange([0, 100]);
  };

  return (
    <div className="min-h-screen bg-[#0d1017]">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-8 w-full flex flex-col gap-6 animate-in fade-in duration-500">
        
        {/* Back navigation & Page Header */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={onGoBack}
              className="flex items-center gap-2 bg-[#1b1f2e] border border-slate-800 hover:border-slate-600 px-4 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-[#252b41] transition-all w-max"
              style={{ borderRadius: '8px' }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:items-end justify-between">
            <div className="space-y-2">
              <h1 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight drop-shadow-lg">
                Game<span className="text-[#00b0ff]">Library</span>
              </h1>
              <p className="text-slate-400 font-sans font-medium">Discover your next favorite game from our collection</p>
            </div>
            
            {/* Search Bar Input */}
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-slate-500" />
              </div>
              <input
                type="text"
                placeholder="Search games..."
                value={internalSearch}
                onChange={(e) => setInternalSearch(e.target.value)}
                className="w-full bg-[#131722]/80 backdrop-blur-md border border-slate-800 pl-12 pr-4 py-3.5 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#00b0ff]/50 focus:ring-1 focus:ring-[#00b0ff]/50 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]"
              />
            </div>
          </div>
        </div>

        {/* Main Interface Layout grid */}
        <div className="flex flex-col lg:flex-row gap-8 mt-6">
          
          {/* Left Sidebar Filters */}
          <div className="w-full lg:w-[320px] flex-shrink-0 flex flex-col gap-6 bg-[#131722]/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-800/80 shadow-2xl sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto">
            
            {/* Filters Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2 font-black text-white tracking-wide uppercase text-sm">
                <SlidersHorizontal className="w-4 h-4 text-[#00b0ff]" /> 
                Refine Search
              </div>
              <button 
                onClick={clearAllFilters}
                className="text-xs font-semibold text-slate-500 hover:text-[#00b0ff] transition-colors uppercase tracking-wider"
              >
                Clear All
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="space-y-3 relative" ref={sortRef}>
              <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase font-bold">SORT BY</span>
              <div 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className={`flex items-center justify-between bg-[#0a0d14] border ${isSortOpen ? 'border-[#00b0ff]' : 'border-slate-800/80'} px-4 py-3.5 rounded-xl cursor-pointer hover:border-[#00b0ff]/70 transition-all shadow-inner group`}
              >
                <span className={`text-sm font-semibold ${isSortOpen ? 'text-[#00b0ff]' : 'text-slate-300'} group-hover:text-white transition-colors`}>{sortBy}</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${isSortOpen ? 'rotate-180 text-[#00b0ff]' : ''}`} />
              </div>
              
              <AnimatePresence>
                {isSortOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-[80px] left-0 w-full bg-[#0a0d14] border border-slate-800 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-50 overflow-hidden"
                  >
                    {sortOptions.map(option => (
                      <div 
                        key={option}
                        onClick={() => { setSortBy(option); setIsSortOpen(false); }}
                        className={`px-4 py-3 text-sm cursor-pointer transition-colors flex items-center justify-between ${sortBy === option ? 'bg-[#00b0ff]/10 text-[#00b0ff] font-bold' : 'text-slate-400 hover:bg-[#1b1f2e] hover:text-slate-200'}`}
                      >
                        {option}
                        {sortBy === option && <Check className="w-4 h-4" />}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Price section */}
            <div className="space-y-4 pt-2 border-t border-slate-800/50">
              <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase font-bold mt-2 inline-block">PRICE RANGE</span>
              
              <div className="flex items-center justify-center bg-[#0a0d14] px-4 py-2 rounded-lg border border-slate-800 mb-6 w-max mx-auto shadow-inner">
                <span className="text-sm font-mono font-bold text-[#00b0ff] drop-shadow-[0_0_5px_rgba(0,176,255,0.4)]">${priceRange[0]} - ${priceRange[1]}</span>
              </div>

              <div className="relative h-6 w-full flex items-center group">
                <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-slate-800 -translate-y-1/2 rounded-full overflow-hidden">
                  <div 
                    className="absolute h-full bg-gradient-to-r from-[#00b0ff] to-[#0081cb]" 
                    style={{ left: `${priceRange[0]}%`, right: `${100 - priceRange[1]}%` }}
                  />
                </div>
                
                {/* Native Range Inputs overlay for Dual Slider effect */}
                <input 
                  type="range" min="0" max="100" step="5"
                  value={priceRange[0]} 
                  onChange={e => setPriceRange([Math.min(parseInt(e.target.value), priceRange[1] - 5), priceRange[1]])}
                  className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-[#00b0ff] [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,176,255,0.8)] [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-[#00b0ff] cursor-pointer"
                />
                <input 
                  type="range" min="0" max="100" step="5"
                  value={priceRange[1]} 
                  onChange={e => setPriceRange([priceRange[0], Math.max(parseInt(e.target.value), priceRange[0] + 5)])}
                  className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-[#00b0ff] [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,176,255,0.8)] [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-[#00b0ff] cursor-pointer"
                />
              </div>
            </div>

            {/* Genre section */}
            <div className="space-y-4 pt-4 border-t border-slate-800/50">
              <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase font-bold inline-block">GENRE</span>
              <div className="flex flex-col gap-1.5 max-h-[220px] overflow-y-auto custom-scrollbar pr-2 mr-[-8px]">
                {genreOptions.map((genre) => {
                  const isActive = selectedGenres.includes(genre);
                  const count = getGenreCount(genre);
                  
                  return (
                    <button 
                      key={genre}
                      onClick={() => toggleFilter(selectedGenres, setSelectedGenres, genre)}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-lg transition-all border ${isActive ? 'bg-[#00b0ff]/10 border-[#00b0ff]/50 shadow-[inset_0_0_10px_rgba(0,176,255,0.1)]' : 'bg-transparent border-transparent hover:bg-white/5'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isActive ? 'bg-[#00b0ff] border-[#00b0ff]' : 'border-slate-600'}`}>
                          {isActive && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <span className={`text-sm font-semibold ${isActive ? 'text-[#00b0ff] drop-shadow-[0_0_8px_rgba(0,176,255,0.8)]' : 'text-slate-300'}`}>{genre}</span>
                      </div>
                      <span className={`text-[10px] font-mono ${isActive ? 'text-[#00b0ff]' : 'text-slate-500'}`}>({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Platform section */}
            <div className="space-y-4 pt-4 border-t border-slate-800/50">
              <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase font-bold inline-block">PLATFORM</span>
              <div className="flex flex-wrap gap-2">
                {platformOptions.map((platform) => {
                  const isActive = selectedPlatforms.includes(platform);
                  return (
                    <button 
                      key={platform}
                      onClick={() => toggleFilter(selectedPlatforms, setSelectedPlatforms, platform)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${isActive ? 'bg-[#00b0ff]/10 border-[#00b0ff]/50 text-[#00b0ff] shadow-[0_0_10px_rgba(0,176,255,0.2)]' : 'bg-[#0a0d14] border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200'}`}
                    >
                      {platform}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Game Features */}
            <div className="space-y-4 pt-4 border-t border-slate-800/50">
              <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase font-bold inline-block">GAME FEATURES</span>
              <div className="flex flex-wrap gap-2">
                {featureOptions.map((feature) => {
                  const isActive = selectedFeatures.includes(feature);
                  return (
                    <button 
                      key={feature}
                      onClick={() => toggleFilter(selectedFeatures, setSelectedFeatures, feature)}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all border ${isActive ? 'bg-[#00b0ff]/10 border-[#00b0ff]/50 text-[#00b0ff] shadow-[0_0_10px_rgba(0,176,255,0.2)]' : 'bg-transparent border-slate-800 text-slate-400 hover:bg-[#1b1f2e] hover:text-slate-200'}`}
                    >
                      {feature}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Review Score */}
            <div className="space-y-4 pt-4 border-t border-slate-800/50">
              <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase font-bold inline-block">REVIEW SCORE</span>
              <div className="flex flex-col gap-1.5">
                {scoreOptions.map((score) => {
                  const isActive = selectedScores.includes(score);
                  return (
                    <button 
                      key={score}
                      onClick={() => toggleFilter(selectedScores, setSelectedScores, score)}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-lg transition-all border ${isActive ? 'bg-[#00b0ff]/10 border-[#00b0ff]/50 shadow-[inset_0_0_10px_rgba(0,176,255,0.1)]' : 'bg-transparent border-transparent hover:bg-white/5'}`}
                    >
                      <div className="flex items-center gap-3">
                         <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${isActive ? 'border-[#00b0ff]' : 'border-slate-600'}`}>
                           {isActive && <div className="w-2 h-2 rounded-full bg-[#00b0ff]" />}
                         </div>
                         <div className="flex items-center gap-1.5">
                           <Star className={`w-4 h-4 ${isActive ? 'text-[#00b0ff] fill-[#00b0ff]' : 'text-slate-500'}`} />
                           <span className={`text-sm font-semibold ${isActive ? 'text-[#00b0ff]' : 'text-slate-300'}`}>{score}</span>
                         </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Games Grid main view */}
          <div className="flex-1 flex flex-col gap-6">
            
            {/* Active Filters Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#131722]/80 backdrop-blur-xl border border-slate-800/80 p-4 rounded-2xl shadow-lg h-max">
              <div className="flex items-center gap-2 flex-wrap flex-1">
                <span className="text-sm text-slate-400 font-medium mr-2 whitespace-nowrap">Active Filters:</span>
                
                <AnimatePresence mode="popLayout">
                  {activeFilters.length === 0 ? (
                    <motion.span 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="text-sm font-mono text-slate-600 italic"
                    >
                      None
                    </motion.span>
                  ) : (
                    activeFilters.map((filter, i) => (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        key={`${filter.type}-${filter.value}-${i}`}
                        className="flex items-center gap-1.5 bg-[#1b1f2e] border border-[#00b0ff]/30 text-[#00b0ff] hover:bg-[#00b0ff]/10 px-3 py-1.5 rounded-full group cursor-pointer transition-colors shadow-[0_0_10px_rgba(0,176,255,0.1)]"
                        onClick={() => removeFilter(filter)}
                      >
                        <span className="text-[11px] font-bold transition-colors">{filter.value}</span>
                        <X className="w-3.5 h-3.5 group-hover:text-white transition-colors" />
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>

              <div className="text-sm font-bold bg-[#0a0d14] border border-slate-800 px-4 py-2 rounded-xl text-slate-300 shrink-0 shadow-inner">
                Showing <span className="text-[#00b0ff] drop-shadow-[0_0_5px_rgba(0,176,255,0.5)]">{filteredGames.length}</span> of <span className="text-[#00b0ff] drop-shadow-[0_0_5px_rgba(0,176,255,0.5)]">{totalGamesCount}</span> Games
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              
              <AnimatePresence mode="popLayout">
                {filteredGames.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="col-span-1 md:col-span-2 xl:col-span-3 flex flex-col items-center justify-center py-32 rounded-2xl border border-dashed border-slate-800 bg-[#131722]/50 backdrop-blur-sm mt-6"
                  >
                    <Search className="w-12 h-12 text-slate-600 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No games found</h3>
                    <p className="text-slate-400 text-center max-w-sm">Try adjusting your filters or search query to find what you're looking for.</p>
                    <button 
                      onClick={clearAllFilters}
                      className="mt-6 px-6 py-2.5 bg-[#00b0ff]/10 border border-[#00b0ff]/30 text-[#00b0ff] hover:bg-[#00b0ff]/20 font-semibold rounded-lg transition-all shadow-[0_0_15px_rgba(0,176,255,0.2)]"
                    >
                      Clear All Filters
                    </button>
                  </motion.div>
                ) : (
                  filteredGames.map((game) => {
                    const liked = wishlist.includes(game.id);
                    
                    return (
                      <motion.div 
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        key={game.id}
                        onClick={() => {
                          onSelectGame(game.id);
                        }}
                        className="group relative bg-[#131722] rounded-2xl overflow-hidden border border-slate-850 hover:border-[#00b0ff]/50 transition-all duration-300 flex flex-col hover:shadow-[0_0_20px_rgba(0,176,255,0.2)] cursor-pointer hover:-translate-y-1"
                      >
                        
                        {/* Top image wrapper */}
                        <div className="relative aspect-[16/10] bg-slate-900 cursor-pointer overflow-hidden">
                          
                          {/* Heart Wishlist button */}
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleWishlist(game.id);
                            }}
                            className="absolute top-3 left-3 z-20 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white backdrop-blur-md cursor-pointer transition-colors shadow-lg border border-white/5"
                          >
                            <Heart className={`w-4 h-4 transition-colors ${liked ? 'fill-[#ff1744] text-[#ff1744] drop-shadow-[0_0_8px_rgba(255,23,68,0.6)]' : 'hover:fill-[#00b0ff] hover:text-[#00b0ff]'}`} />
                          </button>
  
                          {/* Discount Tag Top Right */}
                          {game.discount > 0 && (
                            <div className="absolute top-3 right-3 z-20 bg-[#00e676] text-[#003300] font-mono font-black text-xs px-2.5 py-1 rounded shadow-[0_0_10px_rgba(0,230,118,0.5)]">
                              -{game.discount}%
                            </div>
                          )}
  
                          {/* Content Image */}
                          {game.coverImage && (
                            <img
                              src={game.coverImage}
                              alt={game.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                              referrerPolicy="no-referrer"
                            />
                          )}
  
                          <div className="absolute inset-0 bg-gradient-to-t from-[#131722] via-[#131722]/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                        </div>
  
                        {/* Bottom Details Row */}
                        <div className="p-5 flex flex-col gap-4 flex-1 justify-between relative z-10 bg-[#131722]">
                          
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-bold text-white text-[17px] leading-tight group-hover:text-[#00b0ff] transition-colors line-clamp-2 cursor-pointer">
                              {game.title}
                            </h3>
                            {game.releaseDate && game.releaseDate !== 'TBA' && (
                              <span className="text-xs text-slate-400 font-mono mt-0.5 flex-shrink-0 bg-slate-800/50 px-1.5 py-0.5 rounded">
                                {new Date(game.releaseDate).getFullYear()}
                              </span>
                            )}
                          </div>
  
                          <div className="flex items-center justify-between mt-auto">
                            {/* Rating Badgy */}
                            <div className="flex items-center gap-1.5 font-sans font-bold text-xs text-[#00e676] bg-[#00e676]/10 px-2.5 py-1 rounded border border-[#00e676]/20">
                              <Star className="w-3.5 h-3.5 fill-[#00e676]" />
                              <span>{game.rating > 0 ? `${(game.rating / 10).toFixed(1)} / 10` : 'N/A'}</span>
                            </div>
  
                            {/* Platforms summary icons */}
                            <PlatformIcons platforms={game.platforms} selectedPlatforms={selectedPlatforms} />
                          </div>
  
                          {/* Pricing Row -> Buy btn */}
                          <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 min-h-[40px]">
                            {game.id.startsWith('igdb-') ? (
                              <a 
                                href={`https://store.steampowered.com/search/?term=${encodeURIComponent(game.title)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-sm font-bold text-[#00b0ff] hover:underline"
                              >
                                Check on Steam ↗
                              </a>
                            ) : (
                              <div className="flex items-baseline gap-2.5">
                                 {game.discount > 0 ? (
                                   <>
                                    <span className="text-xs text-slate-500 line-through font-mono">
                                      ${game.originalPrice.toFixed(2)}
                                    </span>
                                    <span className="text-lg font-mono font-black text-[#00b0ff]">
                                      ${game.lowestPrice.toFixed(2)}
                                    </span>
                                   </>
                                 ) : (
                                    <span className="text-lg font-mono font-black text-[#00b0ff]">
                                      ${game.originalPrice.toFixed(2)}
                                    </span>
                                 )}
                              </div>
                            )}
                            
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectGame(game.id);
                              }}
                              className="px-4 py-2 bg-[#25283b] hover:bg-[#00b0ff] border border-slate-700 hover:border-[#00b0ff] text-white text-xs font-bold rounded-lg transition-all shadow-md active:scale-95 text-center truncate ml-3 group/btn hover:shadow-[0_0_15px_rgba(0,176,255,0.4)]"
                            >
                              <span className="group-hover/btn:hidden block">View Details</span>
                              <span className="hidden group-hover/btn:block">View Deals ↗</span>
                            </button>
                          </div>
  
                        </div>
  
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>

              {/* Pagination UI */}
              <div className="flex flex-col items-center w-full col-span-full mt-8 mb-4">
                {isLoadingGames && page === 0 && (
                  <div className="py-12">
                    <div className="w-10 h-10 border-4 border-[#00b0ff] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                
                {hasMore && (page > 0 || !isLoadingGames) && (
                  <div className="pt-8 pb-4">
                    <button
                      onClick={() => setPage(p => p + 1)}
                      disabled={isLoadingGames}
                      className="bg-[#1b1f2e] border border-slate-700 hover:border-[#00b0ff] hover:bg-[#252b41] text-white font-medium py-3 px-8 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,176,255,0.2)] disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
                    >
                      {isLoadingGames && (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      )}
                      Load More Games
                    </button>
                  </div>
                )}
                
                {!isLoadingGames && !hasMore && filteredGames.length > 0 && (
                  <div className="pt-12 flex flex-col items-center opacity-60">
                    <div className="w-16 h-1 bg-slate-800 rounded-full mb-4"></div>
                    <span className="text-slate-400 font-medium">You've reached the end of the library</span>
                  </div>
                )}
              </div>

            </div>

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
