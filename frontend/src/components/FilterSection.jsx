import React from 'react';

const FilterSection = ({ title, icon: Icon, options, selectedIds, onToggle, type }) => {
  return (
    <div className="bg-card-bg rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
      <h3 className="text-lg font-semibold mb-4 text-primary flex items-center gap-2">
        <Icon size={20} /> {title}
      </h3>
      <div className="flex flex-wrap gap-2.5">
        {options.map((option) => {
          const isActive = selectedIds.includes(option.id);
          return (
            <div
              key={option.id}
              onClick={() => onToggle(type, option.id, option.name)}
              className={`px-4 py-2 rounded-full text-sm cursor-pointer transition-all duration-300 border select-none ${
                isActive 
                  ? 'bg-primary text-white border-primary font-medium shadow-md scale-105' 
                  : 'bg-light text-text-color border-gray-200 hover:bg-primary-light hover:text-white hover:border-primary-light'
              }`}
              title={option.name}
            >
              {option.name}
            </div>
          );
        })}
        {options.length === 0 && (
          <div className="text-sm text-gray-400 italic">Loading {title.toLowerCase()}...</div>
        )}
      </div>
    </div>
  );
};

export default FilterSection;
