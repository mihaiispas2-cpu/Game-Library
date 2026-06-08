import React, { useState, useEffect } from 'react';
import { Play, ChevronRight, Zap, Radio, Calendar, Clock, Eye, ShieldAlert, Cpu, MonitorPlay, BarChart, Gamepad2, ArrowUpRight, Flame, ArrowUp } from 'lucide-react';
import { Game } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface NewsProps {
  games: Game[];
  onSelectGame: (id: string) => void;
}

export default function News({ games, onSelectGame }: NewsProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full">
      <style>
        {`
          @keyframes ticker-marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          .animate-ticker {
            animation: ticker-marquee 30s linear infinite;
          }
          .ticker-container:hover .animate-ticker {
            animation-play-state: paused;
          }
        `}
      </style>

      {/* Hero Section */}
      <section className="relative w-full h-[600px] lg:h-[700px] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1606144042873-7c015b699c2d?auto=format&fit=crop&q=80&w=2000" 
            alt="Playstation Controller Hero" 
            className="w-full h-full object-cover object-center transform scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#06070a]/90 via-[#06070a]/50 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06070a] via-[#06070a]/20 to-transparent z-10" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 lg:px-12 h-full flex flex-col justify-center pb-20">
          <div className="max-w-3xl space-y-6">
            {/* Breaking News Label */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 rounded-md font-bold tracking-widest text-[10px] uppercase text-white shadow-lg shadow-red-600/20">
              <Zap className="w-3.5 h-3.5 fill-white" />
              BREAKING NEWS
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold leading-[1.1] text-white tracking-tight">
              Sony Expands PC Gaming Strategy with Day-One Releases
            </h1>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed">
              PlayStation Studios announces simultaneous PC and console launches for major first-party titles starting 2027.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-3 py-2">
              <span className="px-3 py-1 text-xs font-medium text-slate-300 bg-slate-800/60 border border-slate-700/50 rounded-full backdrop-blur-md">
                Platform News
              </span>
              <span className="px-3 py-1 text-xs font-medium text-slate-300 bg-slate-800/60 border border-slate-700/50 rounded-full backdrop-blur-md">
                PlayStation
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-[#00b0ff] hover:bg-[#0090ff] text-white font-bold rounded-lg transition-colors group">
                Read Full Article
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-slate-800/80 hover:bg-slate-700 text-white font-bold rounded-lg backdrop-blur-sm border border-slate-700 transition-colors">
                <Play className="w-4 h-4" />
                Watch Showcase
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-white/40 cursor-pointer hover:bg-white/60 transition-colors" />
          <div className="w-8 h-2 rounded-full bg-[#00b0ff] cursor-pointer" />
          <div className="w-2 h-2 rounded-full bg-white/40 cursor-pointer hover:bg-white/60 transition-colors" />
        </div>
      </section>

      {/* Ticker Section */}
      <section className="w-full bg-[#11121d] border-y border-slate-800/60 overflow-hidden relative z-30 h-10 flex items-center ticker-container">
        {/* LIVE Label inside the flow, with an absolute positioning for z-index */}
        <div className="absolute left-0 top-0 bottom-0 z-40 bg-red-600 flex items-center px-4 md:px-8 skew-x-[-15deg] origin-bottom-left border-r-4 border-[#06070a]">
          <div className="skew-x-[15deg] flex items-center gap-2 font-bold text-xs tracking-wider text-white uppercase">
            <Radio className="w-4 h-4 animate-pulse" />
            LIVE
          </div>
        </div>
        
        {/* Gradient mask for smooth fade on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-[#11121d] to-transparent z-30 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#11121d] to-transparent z-30 pointer-events-none" />

        {/* Scrolling Content */}
        <div className="flex-1 overflow-hidden whitespace-nowrap pl-32 md:pl-48">
          <div className="animate-ticker inline-block text-xs font-mono text-slate-300 pointer-events-none w-[200%] md:w-auto">
            <span className="inline-flex items-center gap-3 mr-12">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              Valve announces Steam Deck 2 with RDNA 4 graphics architecture
            </span>
            <span className="inline-flex items-center gap-3 mr-12 text-[#00b0ff]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00b0ff]" />
              Unity backtracks on runtime fee policy after developer backlash
            </span>
            <span className="inline-flex items-center gap-3 mr-12 text-green-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              AMD launches FSR 4.0 with machine learning upscaling
            </span>
            <span className="inline-flex items-center gap-3 mr-12">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              Nintendo Switch 2 specs allegedly leaked by components supplier
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 lg:px-12 py-16 space-y-24">
        
        {/* Upcoming Releases Section */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Calendar className="w-6 h-6 text-[#00b0ff]" />
            <h2 className="text-2xl font-bold font-display">Upcoming Releases</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Hollow Knight: Silksong",
                img: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=600",
                date: "June 15, 2026",
                tags: ["Metroidvania", "Indie"],
                days: "29 Days"
              },
              {
                title: "Starfield: Shattered Space",
                img: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&q=80&w=600",
                date: "May 30, 2026",
                tags: ["RPG", "Sci-Fi"],
                days: "13 Days"
              },
              {
                title: "The Elder Scrolls VI",
                img: "https://images.unsplash.com/photo-1605806616949-1187b487bcaf?auto=format&fit=crop&q=80&w=600",
                date: "TBA 2027",
                tags: ["RPG", "Open World"],
                days: "365 Days"
              },
              {
                title: "Fable",
                img: "https://images.unsplash.com/photo-1590845947376-28cedb262fca?auto=format&fit=crop&q=80&w=600",
                date: "September 2026",
                tags: ["RPG", "Fantasy"],
                days: "137 Days"
              }
            ].map((game, i) => {
              const matchedGame = games.find(g => g.title.toLowerCase().includes(game.title.toLowerCase().split(':')[0])) || games[0];
              return (
              <div 
                key={i} 
                onClick={() => onSelectGame(matchedGame.id)}
                className="bg-[#11121d] rounded-xl border border-slate-800/80 overflow-hidden group hover:border-[#00b0ff]/50 hover:shadow-[0_0_20px_rgba(0,176,255,0.2)] transition-all duration-300 flex flex-col h-full cursor-pointer hover:-translate-y-1"
              >
                <div className="relative h-40 overflow-hidden">
                  <img src={game.img} alt={game.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  <div className="absolute top-3 right-3 px-2 py-1 bg-[#00b0ff] text-white text-[10px] font-bold rounded shadow-lg">
                    {game.days}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-white mb-2 leading-tight">{game.title}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
                    <Clock className="w-3.5 h-3.5" />
                    {game.date}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {game.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-slate-800 text-slate-300 text-[10px] rounded border border-slate-700/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto">
                    <button className="w-full py-2 bg-[#00b0ff]/10 hover:bg-[#00b0ff] text-[#00b0ff] hover:text-white border border-[#00b0ff]/20 rounded-lg text-sm font-bold transition-colors">
                      Add to Wishlist
                    </button>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </section>

        {/* Industry & Technology News */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Gamepad2 className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold font-display">Industry & Technology News</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Unreal Engine 5.5 Improves Nanite Foliage Rendering",
                desc: "Epic Games delivers massive performance improvements for vegetation-heavy open world games.",
                img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
                badge: { text: "Trending", icon: Flame, color: "bg-orange-500" },
                categoryLabel: "Engine Technology",
                tags: ["Unreal Engine", "Graphics"],
                author: "Epic Games",
                time: "5 min read",
                views: "12,500 views"
              },
              {
                title: "DLSS 4.5 Introduces Advanced AI Reconstruction",
                desc: "NVIDIA's latest AI upscaling technology achieves near-native quality at 1080p to 4K.",
                img: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=800",
                badge: { text: "Trending", icon: Flame, color: "bg-orange-500" },
                categoryLabel: "GPU & Rendering",
                tags: ["NVIDIA", "AI", "Performance"],
                author: "NVIDIA",
                time: "8 min read",
                views: "18,700 views"
              },
              {
                title: "Steam Deck Gets OLED 2.0 Upgrade",
                desc: "Valve announces new Steam Deck model with 120Hz OLED display and improved battery life.",
                img: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&q=80&w=800",
                categoryLabel: "Hardware News",
                tags: ["Steam Deck", "Hardware"],
                author: "Valve",
                time: "6 min read",
                views: "9,300 views"
              },
              {
                title: "Unity Apologizes and Reverses Runtime Fee Policy",
                desc: "After developer outcry, Unity announces complete removal of controversial pricing model.",
                img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
                categoryLabel: "Engine Technology",
                tags: ["Unity", "Business"],
                author: "Unity Technologies",
                time: "4 min read",
                views: "15,200 views"
              },
              {
                title: "AMD FSR 4.0 Brings Machine Learning to All GPUs",
                desc: "New version of FidelityFX Super Resolution uses AI while maintaining broad hardware support.",
                img: "https://images.unsplash.com/photo-1610484798698-5c4e51147a75?auto=format&fit=crop&q=80&w=800",
                badge: { text: "Trending", icon: Flame, color: "bg-orange-500" },
                categoryLabel: "GPU & Rendering",
                tags: ["AMD", "AI", "Graphics"],
                author: "AMD",
                time: "7 min read",
                views: "11,400 views"
              },
              {
                title: "PlayStation Announces PC Game Pass Alternative",
                desc: "Sony reveals subscription service bringing PS exclusives to PC day-one.",
                img: "https://images.unsplash.com/photo-1606144042873-7c015b699c2d?auto=format&fit=crop&q=80&w=800",
                badge: { text: "Trending", icon: Flame, color: "bg-orange-500" },
                categoryLabel: "Platform Updates",
                tags: ["PlayStation", "PC Gaming"],
                author: "PlayStation",
                time: "5 min read",
                views: "22,100 views"
              }
            ].map((news, i) => (
              <div key={i} className="bg-[#11121d] rounded-xl border border-slate-800/80 overflow-hidden flex flex-col h-full group hover:border-slate-700 transition-colors relative">
                <div className="relative h-48 overflow-hidden">
                  <img src={news.img} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11121d] to-transparent opacity-80" />
                  
                  {/* Category / Badge Tags */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    {news.badge && (
                      <div className={`px-2 py-1 rounded text-[10px] font-bold text-white uppercase flex items-center gap-1 ${news.badge.color}`}>
                        <news.badge.icon className="w-3 h-3" />
                        {news.badge.text}
                      </div>
                    )}
                  </div>
                  <div className="absolute top-3 right-3 px-2 py-1 bg-[#06070a]/80 backdrop-blur border border-slate-700/50 rounded text-[10px] text-slate-300">
                    {news.categoryLabel}
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1 relative z-10 -mt-8">
                  <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-[#00b0ff] transition-colors">{news.title}</h3>
                  <p className="text-xs text-slate-400 mb-4 line-clamp-2">{news.desc}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {news.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-[#1e2030] text-[#00b0ff] text-[10px] font-medium rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                    <div>
                      <span className="text-slate-300">{news.author}</span>
                      <span className="mx-2">•</span>
                      <span>{news.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {news.views}
                    </div>
                  </div>

                  {/* Hover Actions */}
                  <div className="mt-4 overflow-hidden h-0 group-hover:h-10 transition-all duration-300 opacity-0 group-hover:opacity-100">
                     <button className="w-full py-2.5 bg-[#00b0ff] hover:bg-[#0090ff] text-white rounded-lg text-sm font-bold transition-colors">
                      Read Article
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Engine & Graphics Technology */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Cpu className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl font-bold font-display">Engine & Graphics Technology</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Unreal Engine 5.5", desc: "Major Nanite foliage rendering improvements deliver 2x performance in vegetation-heavy scenes.", tags: ["Unreal Engine", "Graphics"], iconBg: "bg-purple-600", border: 'border-purple-500/20' },
              { name: "NVIDIA DLSS 4.5", desc: "AI-powered upscaling reaches new heights with advanced ray reconstruction and frame generation.", tags: ["NVIDIA", "AI"], iconBg: "bg-green-600", border: 'border-green-500/20' },
              { name: "AMD FSR 4.0", desc: "Machine learning upscaling comes to all GPUs with broad hardware support and competitive quality.", tags: ["AMD", "Performance"], iconBg: "bg-red-600", border: 'border-red-500/20' },
              { name: "DirectX 13", desc: "Next-generation graphics API promises revolutionary ray tracing and AI-accelerated rendering.", tags: ["Microsoft", "API"], iconBg: "bg-blue-600", border: 'border-blue-500/20' }
            ].map((tech, i) => (
              <div key={i} className={`bg-[#11121d] rounded-xl border ${tech.border} p-5 flex items-start gap-4 hover:border-slate-600 transition-colors`}>
                <div className={`w-12 h-12 rounded-xl ${tech.iconBg} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-1">{tech.name}</h3>
                  <p className="text-sm text-slate-400 mb-4">{tech.desc}</p>
                  <div className="flex gap-2">
                    {tech.tags.map(t => (
                      <span key={t} className={`px-2 py-1 ${tech.iconBg}/10 text-${tech.iconBg.split('-')[1]}-400 text-[10px] font-bold uppercase tracking-wider rounded border ${tech.iconBg.replace('bg', 'border')}/20`}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Game Development Tracker */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <MonitorPlay className="w-6 h-6 text-green-400" />
            <h2 className="text-2xl font-bold font-display">Game Development Tracker</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "GTA VI", phase: "Production", phaseColor: "bg-purple-500", engine: "RAGE Engine 9", studio: "Rockstar Games", release: "2027", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400" },
              { title: "The Witcher IV", phase: "Pre-production", phaseColor: "bg-blue-500", engine: "Unreal Engine 5", studio: "CD Projekt RED", release: "2028", img: "https://images.unsplash.com/photo-1606144042873-7c015b699c2d?auto=format&fit=crop&q=80&w=400" },
              { title: "Fable", phase: "Beta", phaseColor: "bg-orange-500", engine: "ForzaTech", studio: "Playground Games", release: "Q3 2026", img: "https://images.unsplash.com/photo-1590845947376-28cedb262fca?auto=format&fit=crop&q=80&w=400" },
              { title: "Perfect Dark", phase: "Alpha", phaseColor: "bg-yellow-500", engine: "Unreal Engine 5", studio: "The Initiative", release: "Q4 2026", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400" }
            ].map((game, i) => (
              <div key={i} className="bg-[#11121d] border border-slate-800 rounded-xl overflow-hidden">
                <div className="h-24 w-full relative">
                  <img src={game.img} alt={game.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11121d] to-transparent" />
                </div>
                <div className="p-4 relative -mt-6">
                  <h3 className="font-bold text-white mb-2">{game.title}</h3>
                  <div className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase mb-4 ${game.phaseColor}/20 text-${game.phaseColor.split('-')[1]}-400 border border-${game.phaseColor.split('-')[1]}-500/30`}>
                    {game.phase}
                  </div>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center text-slate-400">
                      <span>Engine:</span>
                      <span className="text-slate-200 font-medium">{game.engine}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-400">
                      <span>Studio:</span>
                      <span className="text-slate-200 font-medium">{game.studio}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-400">
                      <span>Release:</span>
                      <span className="text-[#00b0ff] font-bold">{game.release}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Performance & Patch Radar */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <BarChart className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl font-bold font-display">Performance & Patch Radar</h2>
          </div>
          <div className="space-y-3">
            {[
              { game: "Dragon's Dogma 2", desc: "Major CPU optimization patch reduces frame drops by 40%", tags: ["CPU Optimization", "High Impact"], impact: "high" },
              { game: "Starfield", desc: "DLSS 3.5 support with Ray Reconstruction added", tags: ["DLSS", "High Impact"], impact: "high" },
              { game: "Cyberpunk 2077", desc: "FSR 3.0 Frame Generation support for all GPUs", tags: ["FSR", "Medium Impact"], impact: "medium" },
              { game: "Baldur's Gate 3", desc: "Steam Deck Verified with optimized preset", tags: ["Steam Deck", "Medium Impact"], impact: "medium" }
            ].map((patch, i) => (
              <div key={i} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-[#11121d] border border-slate-800 rounded-xl hover:bg-slate-800/40 transition-colors">
                <div>
                  <h3 className="font-bold text-white text-base mb-1">{patch.game}</h3>
                  <p className="text-slate-400 text-sm">{patch.desc}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {patch.tags.map(tag => (
                    <span 
                      key={tag} 
                      className={`px-3 py-1 rounded text-xs font-medium border ${
                        tag.includes('High Impact') ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                        tag.includes('Medium Impact') ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 
                        'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Showcase Events */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Play className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-bold font-display">Upcoming Showcase Events</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Summer Game Fest 2026", date: "June 7, 2026", days: "21 days", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600" },
              { name: "PlayStation Showcase", date: "May 24, 2026", days: "7 days", img: "https://images.unsplash.com/photo-1606144042873-7c015b699c2d?auto=format&fit=crop&q=80&w=600" },
              { name: "Xbox Games Showcase", date: "June 9, 2026", days: "23 days", img: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&q=80&w=600" }
            ].map((event, i) => (
              <div key={i} className="bg-[#11121d] rounded-xl overflow-hidden border border-slate-800">
                <div className="relative h-32">
                  <img src={event.img} alt={event.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11121d] via-[#11121d]/50 to-transparent" />
                  <h3 className="absolute bottom-3 left-4 text-white font-bold text-lg">{event.name}</h3>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between text-sm mb-4">
                    <span className="text-slate-400">{event.date}</span>
                    <span className="text-[#00b0ff] font-bold">{event.days}</span>
                  </div>
                  <button className="w-full py-2 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/20 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2">
                    <Radio className="w-4 h-4" />
                    Set Reminder
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Community Trending */}
        <section className="pb-12">
          <div className="flex items-center gap-3 mb-8">
            <ArrowUpRight className="w-6 h-6 text-orange-400" />
            <h2 className="text-2xl font-bold font-display">Community Trending</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
               { title: "Unreal Engine 5.5 Improves Nanite Foliage Rendering", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400", stats: { views: 12500, comments: 1250, likes: 625 } },
               { title: "DLSS 4.5 Introduces Advanced AI Reconstruction", img: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=400", stats: { views: 18700, comments: 1870, likes: 935 } },
               { title: "Steam Deck Gets OLED 2.0 Upgrade", img: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&q=80&w=400", stats: { views: 9300, comments: 930, likes: 465 } },
               { title: "Unity Apologizes and Reverses Runtime Fee Policy", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400", stats: { views: 15200, comments: 1520, likes: 760 } }
            ].map((item, i) => (
              <div key={i} className="bg-[#11121d] border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-colors group cursor-pointer">
                <div className="h-32 relative overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11121d] to-transparent opacity-80" />
                </div>
                <div className="p-4 -mt-4 relative z-10">
                  <h4 className="font-bold text-white text-sm mb-3 line-clamp-2 group-hover:text-[#00b0ff] transition-colors">{item.title}</h4>
                  <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" /> {(item.stats.views).toLocaleString()}</span>
                    <span className="flex items-center gap-1.5"><Radio className="w-3.5 h-3.5" /> {(item.stats.comments).toLocaleString()}</span>
                    <span className="flex items-center gap-1.5"><Flame className="w-3.5 h-3.5" /> {(item.stats.likes).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

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
