import { Gamepad2, Heart, Github, Twitter, Youtube, Check, Radio } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#05060b] border-t border-slate-900 pt-16 pb-12 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Upper Column Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand & Mission column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="text-[#00d4ff]">
                <Gamepad2 className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <span className="font-display font-black text-xl tracking-tight text-[#00d4ff]">
                Game<span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3b82f6] to-[#a855f7]">Library</span>
              </span>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The aggregate next-generation video game documentation agency. Our system indexes pricing channels, developer specifications, structural optimization metrics, and real-time community verdicts.
            </p>

            {/* Social handles */}
            <div className="flex gap-4 pt-1">
              <a href="#" className="p-2 rounded-lg bg-[#0d0e19] text-slate-400 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/20 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-[#0d0e19] text-slate-400 hover:text-red-400 border border-slate-800 hover:border-red-500/20 transition-all">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-[#0d0e19] text-slate-400 hover:text-violet-400 border border-slate-800 hover:border-violet-500/20 transition-all">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold">Metadata Library</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#trending-section" className="hover:text-cyan-400 transition-colors">Catalog Index</a></li>
              <li><a href="#trending-section" className="hover:text-cyan-400 transition-colors">Top Handpicked Releases</a></li>
              <li><a href="#deals-section" className="hover:text-cyan-400 transition-colors">Compare Live Stores</a></li>
              <li><a href="#details-section" className="hover:text-cyan-400 transition-colors">Engine specifications</a></li>
            </ul>
          </div>

          {/* Platform API Feeds column */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold">Active API Feeds</h4>
            <ul className="space-y-1.5 text-[10px] font-mono text-slate-400">
              <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> Steam Store Live API</li>
              <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> Epic Online Services</li>
              <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> GOG Price Tracker v2</li>
              <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> Metacritic Syndicated RSS</li>
            </ul>
          </div>

          {/* Contact or Support Details */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold">Press & Dev Contact</h4>
            <div className="space-y-1 text-xs text-slate-400">
              <span className="block font-medium">Syndicate HQ:</span>
              <span className="block text-slate-500 text-[11px]">88 Cyber Lane, Megacity</span>
              <span className="block text-[#a855f7] mt-1 hover:underline cursor-pointer">syndicate@gamelibrary.db</span>
            </div>
          </div>

        </div>

        {/* Lower Disclaimer Box */}
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
          <div>
            <span>© 2026 GameLibrary Database Agency. All properties and visual assets belong to their respective copyright holders.</span>
          </div>

          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-350 transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-350 transition-colors">Privacy Policy</a>
            <span>•</span>
            <span className="flex items-center gap-1 hover:text-pink-400 transition-colors">
              Crafted for players worldwide <Heart className="w-3 h-3 fill-rose-500 text-rose-500 animate-pulse" />
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
