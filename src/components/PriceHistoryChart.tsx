import { useState, useEffect } from 'react';
import { Game } from '../types';
import { supabase } from '../supabaseClient';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface PriceHistoryChartProps {
  game: Game;
}

interface PriceHistoryEntry {
  id: string;
  game_id: string;
  price: number;
  created_at: string;
}

export default function PriceHistoryChart({ game }: PriceHistoryChartProps) {
  const [history, setHistory] = useState<PriceHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      setLoading(true);
      const { data, error } = await supabase
        .from('price_history')
        .select('*')
        .eq('game_id', game.id)
        .order('created_at', { ascending: true });
        
      if (!error && data) {
        setHistory(data);
      }
      setLoading(false);
    }
    
    fetchHistory();
  }, [game.id]);

  const currentPrice = game.lowestPrice || game.originalPrice || 0;
  // Calculate launch price based on current discounted price and discount percentage
  const launchPrice = game.discount > 0 ? currentPrice / (1 - game.discount / 100) : currentPrice;
  
  const historyPrices = history.map(h => h.price);
  
  // Historical low from all price records
  const canShowAdditionalStats = historyPrices.length > 1;
  const lowestEver = canShowAdditionalStats ? Math.min(...historyPrices) : currentPrice;
  
  // Average sale price (prices that are less than the launch price)
  const salePrices = historyPrices.filter(p => p < launchPrice);
  const avgSalePrice = salePrices.length > 0 ? salePrices.reduce((a, b) => a + b, 0) / salePrices.length : 0;
  
  const chartData = history.map(h => ({
    date: format(new Date(h.created_at), 'MMM dd, yyyy'),
    price: h.price
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#111221] border border-slate-800 p-3 rounded-lg shadow-xl">
          <p className="text-slate-400 text-xs mb-1 font-mono">{label}</p>
          <p className="text-[#00e676] font-bold font-mono">
            ${payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

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
            ${launchPrice.toFixed(2)}
          </span>
          <span className="text-[10px] text-slate-500 font-mono block">
            {history.length > 0 ? format(new Date(history[0].created_at), 'MMM dd, yyyy') : game.releaseDate}
          </span>
        </div>

        {/* Card 2: Current Price */}
        <div className="bg-[#111221] border border-slate-850 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-[#00b0ff] font-mono uppercase tracking-wider block">
            📈 Current Price
          </span>
          <span className="text-xl font-mono font-black text-[#64b5f6] block">
            ${currentPrice.toFixed(2)}
          </span>
          {game.discount > 0 && (
            <span className="text-[10px] text-[#00e676] font-mono font-bold block bg-[#12251a]/60 px-1.5 py-0.5 rounded w-max">
              -{game.discount}% OFF
            </span>
          )}
        </div>

        {/* Card 3: Historical Low */}
        <div className="bg-[#111221] border border-slate-850 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-[#00e676] font-mono uppercase tracking-wider block">
            🔥 Historical Low
          </span>
          <span className="text-xl font-mono font-black text-[#00e676] block">
            {canShowAdditionalStats ? `$${lowestEver.toFixed(2)}` : "Not enough data"}
          </span>
          {canShowAdditionalStats && currentPrice <= lowestEver && (
            <span className="text-[10px] text-[#00e676] font-mono font-bold block">
              Lowest Ever Price!
            </span>
          )}
        </div>

        {/* Card 4: Avg. Sale Price */}
        <div className="bg-[#111221] border border-slate-850 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">
            📊 Avg. Sale Price
          </span>
          <span className="text-xl font-mono font-black text-purple-400 block">
            {canShowAdditionalStats && avgSalePrice > 0 ? `$${avgSalePrice.toFixed(2)}` : "Not enough data"}
          </span>
          <span className="text-[10px] text-slate-500 font-mono block">
            Calculated from history
          </span>
        </div>

      </div>

      {/* 3. Main Timeline Card container */}
      <div className="bg-[#111221] border border-slate-850 p-6 rounded-2xl space-y-6">
        
        {/* Savings banner row */}
        {launchPrice - currentPrice > 0 && (
          <div className="bg-[#12251a]/65 border border-[#00e676]/20 p-4 rounded-xl flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="block text-xs font-mono uppercase text-[#00e676] font-bold">
                Total Savings:
              </span>
              <p className="text-xs text-slate-350 font-medium">
                Save <span className="text-[#00e676] font-bold">${(launchPrice - currentPrice).toFixed(2)}</span> compared to launch price
              </p>
            </div>
            <span className="text-3xl font-mono font-black text-[#00e676]">
              {Math.round(((launchPrice - currentPrice) / launchPrice) * 100)}%
            </span>
          </div>
        )}

        {/* Price Timeline Subheading */}
        <div className="space-y-1">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Price Timeline
          </h3>
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center text-slate-500 font-mono text-sm animate-pulse">
            Loading price history...
          </div>
        ) : history.length === 0 ? (
          <div className="h-64 flex items-center justify-center text-slate-500 font-mono text-sm border border-dashed border-slate-800 rounded-xl">
            No price history available yet
          </div>
        ) : (
          <div className="h-80 w-full mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#6b7280" 
                  fontSize={12}
                  tickMargin={10}
                  tickFormatter={(val) => val} // Can be refined to show fewer labels on mobile
                />
                <YAxis 
                  stroke="#6b7280" 
                  fontSize={12}
                  tickFormatter={(value) => `$${value}`}
                  domain={['dataMin - 10', 'dataMax + 10']}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="stepAfter" 
                  dataKey="price" 
                  stroke="#00e676" 
                  strokeWidth={2} 
                  dot={{ r: 4, strokeWidth: 2, fill: "#111221" }} 
                  activeDot={{ r: 6, fill: "#00e676" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* 4. Best Time to Buy Information Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-slate-850">
          
          {/* Column 1: Lowest Price Note */}
          <div className="bg-[#18192a]/50 p-4 rounded-xl flex gap-3 text-xs leading-relaxed text-slate-400">
            <span className="text-amber-500 text-lg">💡</span>
            <div>
              <span className="font-bold text-slate-300 block mb-0.5">
                Lowest price ever
              </span>
              <p className="text-[11px] font-sans">
                {canShowAdditionalStats 
                  ? <>The lowest recorded price for this game was <strong className="text-[#00e676] font-mono">${lowestEver.toFixed(2)}</strong>.</>
                  : "We need more historical data to determine the lowest ever price accurately."}
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
                {canShowAdditionalStats ? (
                  currentPrice <= lowestEver ? (
                    <>Currently at historical low price - <span className="text-[#00e676] font-semibold">Great time to buy!</span></>
                  ) : (
                    <>Currently higher than historical low. Consider waiting for the next major sale event.</>
                  )
                ) : (
                  <>Not enough data to analyze the current deal quality.</>
                )}
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
