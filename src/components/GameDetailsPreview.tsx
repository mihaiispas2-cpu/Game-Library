import { 
  Calendar, User, Shield, Clock, DollarSign, 
  Hourglass, Users, Briefcase, Cpu, MonitorPlay
} from 'lucide-react';
import { Game } from '../types';

interface GameDetailsPreviewProps {
  game: Game;
}

const stripHtml = (html: string | undefined): string => {
  if (!html) return '';
  return html
    .replace(/<strong>/gi, '')
    .replace(/<\/strong>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<li>/gi, '• ')
    .replace(/<\/li>/gi, '\n')
    .replace(/<ul[^>]*>/gi, '')
    .replace(/<\/ul>/gi, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/<[^>]+>/g, '')
    .replace(/\n\s*\n/g, '\n')
    .trim();
};

export default function GameDetailsPreview({ game }: GameDetailsPreviewProps) {
  const renderValue = (val: any) => (val === undefined || val === null || val === '') ? '-' : val;

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
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
                {renderValue(game.releaseDate)}
              </span>
            </div>

            {/* 2. Developer */}
            <div className="flex items-center justify-between py-3">
              <span className="text-slate-450 flex items-center gap-2 font-medium">
                <User className="w-4 h-4 text-[#3b82f6]" /> Developer
              </span>
              <span className="text-slate-200 font-medium font-mono">
                {renderValue(game.developer)}
              </span>
            </div>

            {/* 3. Publisher */}
            <div className="flex items-center justify-between py-3">
              <span className="text-slate-450 flex items-center gap-2 font-medium">
                <Briefcase className="w-4 h-4 text-[#3b82f6]" /> Publisher
              </span>
              <span className="text-slate-200 font-semibold font-mono">
                {renderValue(game.publisher)}
              </span>
            </div>

            {/* 4. Engine */}
            <div className="flex items-center justify-between py-3">
              <span className="text-slate-450 flex items-center gap-2 font-medium">
                <Shield className="w-4 h-4 text-[#3b82f6]" /> Engine
              </span>
              <span className="text-slate-250 font-medium font-mono">
                {renderValue(game.engine)}
              </span>
            </div>

            {/* 5. Development Time */}
            <div className="flex items-center justify-between py-3">
              <span className="text-slate-450 flex items-center gap-2 font-medium">
                <Clock className="w-4 h-4 text-[#3b82f6]" /> Development Time
              </span>
              <span className="text-slate-200 font-medium font-mono">
                {renderValue(game.dev_time)}
              </span>
            </div>

            {/* 6. Budget */}
            <div className="flex items-center justify-between py-3">
              <span className="text-slate-450 flex items-center gap-2 font-medium">
                <DollarSign className="w-4 h-4 text-[#3b82f6]" /> Est. Budget
              </span>
              <span className="text-slate-200 font-medium font-mono">
                {renderValue(game.estimated_budget)}
              </span>
            </div>

            {/* 7. Gameplay Duration */}
            <div className="flex items-center justify-between py-3">
              <span className="text-slate-450 flex items-center gap-2 font-medium">
                <Hourglass className="w-4 h-4 text-[#3b82f6]" /> Gameplay Duration
              </span>
              <span className="text-slate-200 font-medium font-mono">
                {renderValue(game.avg_playtime)}
              </span>
            </div>

            {/* 8. Multiplayer */}
            <div className="flex items-center justify-between py-3">
              <span className="text-slate-450 flex items-center gap-2 font-medium">
                <Users className="w-4 h-4 text-[#3b82f6]" /> Multiplayer
              </span>
              <span className="text-slate-200 font-medium font-mono">
                {renderValue(game.multiplayer)}
              </span>
            </div>

          </div>
        </div>

        {/* Right Column: Technical Performance & System Requirements */}
        <div className="relative w-full h-[550px] lg:h-auto min-h-0">
          <div className="absolute inset-0 bg-[#111221] border border-slate-850 p-6 rounded-2xl flex flex-col justify-between space-y-6">
            <div className="flex flex-col flex-1 min-h-0 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5 shrink-0">
                <MonitorPlay className="w-4 h-4 text-[#00b0ff]" /> System Requirements & Specs
              </h3>

              {/* System Requirements Tab/Section */}
              <div className="bg-[#1a1c2e] p-4 rounded-xl border border-slate-800 flex flex-col flex-1 min-h-0 space-y-3">
                <div className="text-sm font-bold text-slate-200 pb-2 border-b border-slate-800 shrink-0">
                  Minimum Requirements
                </div>
                <div className="overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent flex-1">
                  <p className="text-xs text-slate-400 font-mono whitespace-pre-line leading-relaxed">
                    {stripHtml(game.system_requirements?.minimum) || 'System requirements data is currently not available for this title. Please check back later or visit the official game website.'}
                  </p>
                </div>
                
                <div className="text-sm font-bold text-slate-200 pb-2 border-b border-slate-800 pt-3 shrink-0">
                  Recommended Requirements
                </div>
                <div className="overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent flex-1">
                  <p className="text-xs text-slate-400 font-mono whitespace-pre-line leading-relaxed">
                    {stripHtml(game.system_requirements?.recommended) || 'System requirements data is currently not available for this title. Please check back later or visit the official game website.'}
                  </p>
                </div>
              </div>

              {/* Progress Bars / Slider Indicators */}
              <div className="space-y-4 pt-2 shrink-0">
                
                {/* 1. Mod Support */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Mod Support</span>
                    <span className="text-slate-200">{renderValue(game.modSupport)}</span>
                  </div>
                </div>

                {/* 2. DRM */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>DRM</span>
                    <span className="text-slate-200">{renderValue(game.drmInfo)}</span>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
