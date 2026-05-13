import React from 'react';
import { Star } from 'lucide-react';

const RecommendationCard = ({ game }) => {
  const imageUrl = game.background_image || 'https://via.placeholder.com/400x225?text=No+Image';
  const released = game.released ? new Date(game.released).toLocaleDateString() : 'Coming soon';
  const rating = game.rating ? game.rating.toFixed(1) : 'N/A';
  const tags = game.tags ? game.tags.slice(0, 3).map(tag => tag.name) : [];

  return (
    <div 
      className="bg-card-bg rounded-xl overflow-hidden shadow-sm hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col h-full"
      onClick={() => window.open(game.website || `https://rawg.io/games/${game.slug}`, '_blank')}
    >
      <div className="h-40 relative overflow-hidden shrink-0">
        <img 
          src={imageUrl} 
          alt={game.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {game.rating_top && (
          <div className="absolute top-2 right-2 bg-warning text-dark px-2 py-1 rounded text-xs font-bold z-10 shadow-sm">
            Top {game.rating_top}/5
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-bold mb-2 text-dark line-clamp-1 group-hover:text-primary transition-colors">
          {game.name}
        </h3>
        <div className="flex justify-between items-center mb-3 text-sm text-text-light font-medium">
          <span>{released}</span>
          <span className="text-warning flex items-center gap-1">
            <Star size={14} fill="currentColor" /> {rating}
          </span>
        </div>
        <p className="text-sm text-text-light mb-3 line-clamp-3 leading-relaxed flex-1">
          {game.description.replace(/<[^>]*>?/gm, '') || 'No description available.'}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-gray-100">
          {tags.map((tag, idx) => (
            <span key={idx} className="bg-light px-2 py-1 rounded text-xs text-text-light font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
