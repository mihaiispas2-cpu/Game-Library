import { 
  Calendar, User, Shield, Clock, DollarSign, 
  Hourglass, Users, Briefcase, Cpu 
} from 'lucide-react';
import { Game } from '../types';

interface GameDetailsPreviewProps {
  game: Game;
}

export default function GameDetailsPreview({ game }: GameDetailsPreviewProps) {
  return (
    <div className="py-12 px-4 lg:px-12 max-w-7xl mx-auto w-full space-y-8" id="details-section bg-[#06070a]">
      
      {/* Section Header */}
      <div className="flex items-center gap-2 border-b border-slate-900 pb-4">
        <span className="text-xl">⚙️</span>
        <h2 className="font-display font-extrabold text-2xl text-white">
          Game Details & Technical Info
        </h2>
      </div>

      {/* Main Structural Grid 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Development & Release */}
        <div className="bg-[#111221] border border-slate-850 p-6 rounded-2xl space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Development & Release
          </h3>
          
          <div className="divide-y divide-slate-800 text-sm">
            
            {/* 1. Release Date */}
            <div className="flex items-center justify-between py-3">
              <span className="text-slate-450 flex items-center gap-2 font-medium">
                <Calendar className="w-4 h-4 text-[#3b82f6]" /> Release Date
              </span>
              <span className="text-slate-200 font-medium font-mono">
                {game.releaseDate}
              </span>
            </div>

            {/* 2. Developer */}
            <div className="flex items-center justify-between py-3">
              <span className="text-slate-450 flex items-center gap-2 font-medium">
                <User className="w-4 h-4 text-[#3b82f6]" /> Developer
              </span>
              <span className="text-slate-200 font-medium font-mono">
                {game.developer}
              </span>
            </div>

            {/* 3. Publisher */}
            <div className="flex items-center justify-between py-3">
              <span className="text-slate-450 flex items-center gap-2 font-medium">
                <Briefcase className="w-4 h-4 text-[#3b82f6]" /> Publisher
              </span>
              <span className="text-slate-200 font-semibold font-mono">
                {game.publisher}
              </span>
            </div>

            {/* 4. Engine */}
            <div className="flex items-center justify-between py-3">
              <span className="text-slate-450 flex items-center gap-2 font-medium">
                <Shield className="w-4 h-4 text-[#3b82f6]" /> Engine
              </span>
              <span className="text-slate-250 font-medium font-mono">
                {game.engine}
              </span>
            </div>

            {/* 5. Development Time */}
            <div className="flex items-center justify-between py-3">
              <span className="text-slate-450 flex items-center gap-2 font-medium">
                <Clock className="w-4 h-4 text-[#3b82f6]" /> Development Time
              </span>
              <span className="text-slate-200 font-medium font-mono">
                {game.developmentTime}
              </span>
            </div>

            {/* 6. Budget */}
            <div className="flex items-center justify-between py-3">
              <span className="text-slate-450 flex items-center gap-2 font-medium">
                <DollarSign className="w-4 h-4 text-[#3b82f6]" /> Est. Budget
              </span>
              <span className="text-slate-200 font-medium font-mono">
                {game.budget}
              </span>
            </div>

            {/* 7. Gameplay Duration */}
            <div className="flex items-center justify-between py-3">
              <span className="text-slate-450 flex items-center gap-2 font-medium">
                <Hourglass className="w-4 h-4 text-[#3b82f6]" /> Gameplay Duration
              </span>
              <span className="text-slate-200 font-medium font-mono">
                {game.gameplayDuration}
              </span>
            </div>

            {/* 8. Multiplayer */}
            <div className="flex items-center justify-between py-3">
              <span className="text-slate-450 flex items-center gap-2 font-medium">
                <Users className="w-4 h-4 text-[#3b82f6]" /> Multiplayer
              </span>
              <span className="text-slate-200 font-medium font-mono">
                {game.multiplayerSupport}
              </span>
            </div>

          </div>
        </div>

        {/* Right Column: Technical Performance */}
        <div className="bg-[#111221] border border-slate-850 p-6 rounded-2xl flex flex-col justify-between space-y-6">
          <div className="space-y-4 flex-1">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-[#00b0ff]" /> Technical Performance
            </h3>

            {/* Progress Bars / Slider Indicators */}
            <div className="space-y-5">
              
              {/* 1. Mod Support */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Mod Support</span>
                  <span className="text-slate-200">{game.modSupport}</span>
                </div>
                <div className="relative pt-1">
                  <div className="h-1.5 w-full bg-[#1e2035] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#e0a106] to-[#ffab00] rounded-full" style={{ width: '60%' }} />
                  </div>
                  <div className="flex justify-between text-[8px] font-mono text-slate-500 pt-1">
                    <span>0%</span>
                    <span>60%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>

              {/* 2. DRM */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>DRM</span>
                  <span className="text-slate-200">{game.drmInfo}</span>
                </div>
                <div className="relative pt-1">
                  <div className="h-1.5 w-full bg-[#1e2035] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#ef5350] to-[#f44336] rounded-full" style={{ width: '70%' }} />
                  </div>
                  <div className="flex justify-between text-[8px] font-mono text-slate-500 pt-1">
                    <span>0%</span>
                    <span>70%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>

              {/* 3. Optimization */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Optimization</span>
                  <span className="text-[#00e676] font-bold">Excellent</span>
                </div>
                <div className="relative pt-1">
                  <div className="h-1.5 w-full bg-[#1e2035] rounded-full overflow-hidden">
                    <div className="h-full bg-[#00e676] rounded-full" style={{ width: '92%' }} />
                  </div>
                  <div className="flex justify-between text-[8px] font-mono text-slate-500 pt-1">
                    <span>0%</span>
                    <span className="text-[#00e676] font-bold">92%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>

              {/* 4. Performance */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Performance</span>
                  <span className="text-[#00b0ff] font-bold">Excellent</span>
                </div>
                <div className="relative pt-1">
                  <div className="h-1.5 w-full bg-[#1e2035] rounded-full overflow-hidden">
                    <div className="h-full bg-[#00b0ff] rounded-full" style={{ width: '95%' }} />
                  </div>
                  <div className="flex justify-between text-[8px] font-mono text-slate-500 pt-1">
                    <span>0%</span>
                    <span className="text-[#00b0ff] font-bold">95%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Action Callout banner */}
          <div className="bg-[#121c29] border border-[#0d47a1]/40 px-4 py-3.5 rounded-xl space-y-1 shadow-sm">
            <div className="flex items-center gap-1.5 text-xs text-[#4cc2f7] font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              Highly Recommended
            </div>
            <p className="text-[11px] text-slate-350 leading-relaxed font-medium">
              Excellent optimization, stable performance across platforms, and minimal technical issues.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
