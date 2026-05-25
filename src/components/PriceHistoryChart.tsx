import { Game } from '../types';

interface PriceHistoryChartProps {
  game: Game;
}

export default function PriceHistoryChart({ game }: PriceHistoryChartProps) {
  return (
    <div className="py-12 px-4 lg:px-12 max-w-7xl mx-auto w-full space-y-8 bg-[#06070a]">
      
      {/* 1. Header */}
      <div className="flex items-center gap-2 border-b border-slate-900 pb-4">
        <span className="text-[#00b0ff] text-xl">📉</span>
        <h2 className="font-display font-extrabold text-2xl text-white">
          Price History - {game.title}
        </h2>
      </div>

      {/* 2. Stat Cards Grid (4 Columns) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Card 1: Launch Price */}
        <div className="bg-[#111221] border border-slate-850 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">
            🚀 Launch Price
          </span>
          <span className="text-xl font-mono font-black text-slate-200 block">
            $59.99
          </span>
          <span className="text-[10px] text-slate-500 font-mono block">
            June 21, 2024
          </span>
        </div>

        {/* Card 2: Current Price */}
        <div className="bg-[#111221] border border-slate-850 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-[#00b0ff] font-mono uppercase tracking-wider block">
            📈 Current Price
          </span>
          <span className="text-xl font-mono font-black text-[#64b5f6] block">
            $39.99
          </span>
          <span className="text-[10px] text-[#00e676] font-mono font-bold block bg-[#12251a]/60 px-1.5 py-0.5 rounded w-max">
            -33% OFF
          </span>
        </div>

        {/* Card 3: Historical Low */}
        <div className="bg-[#111221] border border-slate-850 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-[#00e676] font-mono uppercase tracking-wider block">
            🔥 Historical Low
          </span>
          <span className="text-xl font-mono font-black text-[#00e676] block">
            $39.99
          </span>
          <span className="text-[10px] text-[#00e676] font-mono font-bold block">
            Lowest Ever Price!
          </span>
        </div>

        {/* Card 4: Avg. Sale Price */}
        <div className="bg-[#111221] border border-slate-850 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">
            📊 Avg. Sale Price
          </span>
          <span className="text-xl font-mono font-black text-purple-400 block">
            $45.99
          </span>
          <span className="text-[10px] text-slate-500 font-mono block">
            During sale events
          </span>
        </div>

      </div>

      {/* 3. Main Timeline Card container */}
      <div className="bg-[#111221] border border-slate-850 p-6 rounded-2xl space-y-6">
        
        {/* Savings banner row */}
        <div className="bg-[#12251a]/65 border border-[#00e676]/20 p-4 rounded-xl flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="block text-xs font-mono uppercase text-[#00e676] font-bold">
              Total Savings:
            </span>
            <p className="text-xs text-slate-350 font-medium">
              Save <span className="text-[#00e676] font-bold">$20.00</span> compared to launch price
            </p>
          </div>
          <span className="text-4xl font-mono font-black text-[#00e676]">
            33%
          </span>
        </div>

        {/* Price Timeline Subheading */}
        <div className="space-y-1">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Price Timeline
          </h3>
        </div>

        {/* Timeline Table list items */}
        <div className="space-y-3 font-mono text-xs">
          
          {/* Row 1: Launch Price */}
          <div className="flex items-center justify-between text-slate-400 py-1">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <div>
                <span className="font-semibold text-slate-200 block">Launch Price</span>
                <span className="text-[10px] text-slate-500 font-sans block">June 2024</span>
              </div>
            </div>
            <div className="flex-1 border-b border-dashed border-slate-800 mx-4 h-0" />
            <span className="font-bold text-slate-200">
              $59.99
            </span>
          </div>

          {/* Row 2: Summer Sale */}
          <div className="flex items-center justify-between text-slate-400 py-1">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <div>
                <span className="font-semibold text-slate-200 block">Summer Sale</span>
                <span className="text-[10px] text-slate-500 font-sans block">August 2024</span>
              </div>
            </div>
            <div className="flex-1 border-b border-dashed border-slate-800 mx-4 h-0" />
            <span className="font-bold text-slate-200">
              $47.99
            </span>
          </div>

          {/* Row 3: Black Friday (Highlighted box!) */}
          <div className="bg-[#112419] border border-[#00e676]/30 px-4 py-3 rounded-lg flex items-center justify-between text-slate-400">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00e676]" />
              <div>
                <span className="font-extrabold text-[#00e676] block">Black Friday (Lowest Ever)</span>
                <span className="text-[10px] text-[#00e676]/80 font-sans block">November 2024</span>
              </div>
            </div>
            <div className="flex-1 border-b border-dashed border-[#00e676]/20 mx-4 h-0" />
            <span className="font-extrabold text-[#00e676]">
              $39.99
            </span>
          </div>

          {/* Row 4: Winter Sale */}
          <div className="flex items-center justify-between text-slate-400 py-1">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <div>
                <span className="font-semibold text-slate-200 block">Winter Sale</span>
                <span className="text-[10px] text-slate-500 font-sans block">December 2024</span>
              </div>
            </div>
            <div className="flex-1 border-b border-dashed border-slate-800 mx-4 h-0" />
            <span className="font-bold text-slate-200">
              $44.99
            </span>
          </div>

          {/* Row 5: Current Price */}
          <div className="flex items-center justify-between text-slate-400 py-1">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00b0ff]" />
              <div>
                <span className="font-semibold text-slate-200 block">Current Price</span>
                <span className="text-[10px] text-slate-500 font-sans block">May 2025</span>
              </div>
            </div>
            <div className="flex-1 border-b border-dashed border-slate-800 mx-4 h-0" />
            <span className="font-bold text-slate-200">
              $39.99
            </span>
          </div>

        </div>

        {/* 4. Best Time to Buy Information Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-850">
          
          {/* Column 1: Major Sale Events */}
          <div className="bg-[#18192a]/50 p-4 rounded-xl flex gap-3 text-xs leading-relaxed text-slate-400">
            <span className="text-amber-500 text-lg">💡</span>
            <div>
              <span className="font-bold text-slate-300 block mb-0.5">
                Major Sale Events
              </span>
              <p className="text-[11px] font-sans">
                Black Friday, Winter Sale, Summer Sale typically offer 30-50% discounts.
              </p>
            </div>
          </div>

          {/* Column 2: Current Deal Status */}
          <div className="bg-[#18192a]/50 p-4 rounded-xl flex gap-3 text-xs leading-relaxed text-slate-400">
            <span className="text-[#00e676] text-lg">✔</span>
            <div>
              <span className="font-bold text-slate-300 block mb-0.5">
                Current Deal Status
              </span>
              <p className="text-[11px] font-sans text-slate-350">
                Currently at historical low price - <span className="text-[#00e676] font-semibold">Great time to buy!</span>
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
