import { useState } from 'react';
import { ThumbsUp, User } from 'lucide-react';
import { Game } from '../types';

interface UserReviewsProps {
  game: Game;
}

export default function UserReviews({ game }: UserReviewsProps) {
  const [showAll, setShowAll] = useState(false);

  // Use the 4 reviews of the active selected blockbusters (e.g. Elden Ring)
  let baseReviews = game.reviews || [];
  
  // Fallback reviews to ensure we always have 8 reviews to display for the grid layout
  const extraReviews = [
    { id: 'mock_1', avatarColor: 'bg-[#ff1744]', username: 'PixelKnight', text: 'Stunning graphics and incredible lore. A must play for any fan of the genre. I could not put my controller down once I started.', date: '1 month ago', helpfulVotes: 120, rating: 9, isRecommended: true },
    { id: 'mock_2', avatarColor: 'bg-[#00c853]', username: 'RetroGamer99', text: 'Classic feel with modern improvements. Found a few bugs but nothing game-breaking. Still highly recommend it.', date: '2 months ago', helpfulVotes: 45, rating: 8, isRecommended: true },
    { id: 'mock_3', avatarColor: 'bg-[#ff9100]', username: 'LootGoblin', text: 'The loot mechanics and progression loop is extremely satisfying. Can easily sink 100+ hours into this.', date: '3 weeks ago', helpfulVotes: 88, rating: 10, isRecommended: true },
    { id: 'mock_4', avatarColor: 'bg-[#0091ff]', username: 'CoopCommander', text: 'Playing this with friends has been an absolute blast. Highly recommend picking this up if you have a group.', date: '4 days ago', helpfulVotes: 310, rating: 9, isRecommended: true },
    { id: 'mock_5', avatarColor: 'bg-[#aa00ff]', username: 'SneakyScout', text: 'The level design is top notch and there are so many secrets to discover. The developers really outdid themselves here.', date: '5 days ago', helpfulVotes: 175, rating: 9, isRecommended: true },
    { id: 'mock_6', avatarColor: 'bg-[#2979ff]', username: 'CasualDad', text: 'Great game, though I wish there were more accessibility options out of the box. Still a solid experience.', date: '1 week ago', helpfulVotes: 60, rating: 8, isRecommended: true },
  ];
  
  // Combine real reviews with fallbacks to guarantee 8 total
  const allReviews = [...baseReviews, ...extraReviews].slice(0, 8);
  const displayedReviews = showAll ? allReviews : allReviews.slice(0, 4);

  return (
    <div className="w-full space-y-8 bg-transparent">
      
      {/* Header with reviews counter on the right */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-slate-900 pb-4">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-[#3b82f6]" />
          <h2 className="font-display font-extrabold text-2xl text-white">
            User Reviews
          </h2>
        </div>
        <span className="text-xs text-slate-500 font-mono">
          2,847 reviews
        </span>
      </div>

      {/* Grid of reviews (4 columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {displayedReviews.map((rev) => {
          // Render stars depending on our custom scores in mock data
          const starArray = Array.from({ length: 5 }, (_, i) => i);

          return (
            <div 
              key={rev.id}
              className="bg-[#111221] border border-slate-850 p-6 rounded-2xl flex flex-col justify-between space-y-5 hover:border-slate-700 transition-all shadow-md group"
            >
              
              {/* Header profile info */}
              <div className="flex items-center justify-between gap-4">
                
                {/* Profile card left */}
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${rev.avatarColor || 'bg-[#1b2a47]'} flex items-center justify-center font-bold text-slate-100`}>
                    {rev.username.substring(0, 1)}
                  </div>
                  <div>
                    <span className="block font-bold text-white text-sm truncate max-w-[100px]">
                      {rev.username}
                    </span>
                    <span className="block text-[10px] text-slate-500 font-mono">
                      {rev.date}
                    </span>
                  </div>
                </div>

                {/* Rating Right stars block */}
                <div className="flex items-center gap-0.5 whitespace-nowrap">
                  {starArray.map((idx) => (
                    <span key={idx} className={`${idx < (rev.rating / 2) ? 'text-[#00e676]' : 'text-slate-700'} text-xs tracking-tight font-sans`}>
                      ★
                    </span>
                  ))}
                </div>

              </div>

              {/* Review critique body text */}
              <p className="text-xs text-slate-350 leading-relaxed font-medium font-sans">
                {rev.text}
              </p>

              {/* Helpful Votes list at bottom of card */}
              <div className="flex items-center gap-4 pt-3 border-t border-slate-850/60 text-[11px] font-mono text-slate-500">
                <button className="flex items-center gap-1.5 hover:text-slate-300 cursor-pointer transition-colors select-none group-hover:text-white">
                  <ThumbsUp className="w-3.5 h-3.5 text-[#3b82f6]" />
                  <span>Helpful ({rev.helpfulVotes})</span>
                </button>
                <span>|</span>
                <button className="hover:text-red-400 cursor-pointer transition-colors select-none">
                  Report
                </button>
              </div>

            </div>
          );
        })}

      </div>

      {/* Center aligned load more button */}
      <div className="flex items-center justify-center pt-4">
        <button 
          onClick={() => setShowAll(!showAll)}
          className="px-6 py-2.5 bg-[#1b1c30] border border-slate-800 hover:border-slate-600 hover:bg-[#1f2038] text-slate-300 hover:text-white transition-all rounded-full text-xs font-semibold cursor-pointer select-none shadow-md outline-none focus:ring-2 focus:ring-[#3b82f6]"
        >
          {showAll ? 'See Less Reviews' : 'Load More Reviews'}
        </button>
      </div>

    </div>
  );
}
