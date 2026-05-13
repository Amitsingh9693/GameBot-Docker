import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Code, Bug, Lightbulb } from 'lucide-react';

const DeveloperInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="absolute top-5 left-5 z-50 md:static md:flex md:justify-center md:mb-5" ref={dropdownRef}>
      <div 
        className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-full shadow-sm cursor-pointer hover:bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-9 h-9 rounded-full border-2 border-primary-light flex items-center justify-center bg-primary text-white font-bold text-xs overflow-hidden">
            AK
        </div>
        <span className="font-medium text-sm text-dark">Development Team</span>
        <ChevronDown 
          size={16} 
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </div>

      {isOpen && (
        <div className="absolute top-16 left-0 md:left-1/2 md:-translate-x-1/2 bg-white rounded-xl shadow-lg py-2 w-64 animate-in fade-in slide-in-from-top-2 duration-300 z-50">
          <div className="px-4 py-2 border-b border-gray-100 mb-1">
            <div className="text-xs uppercase text-text-light mb-2 tracking-wider">Development Team</div>
            <div className="flex items-center gap-3 py-2 hover:bg-primary/5 rounded-lg transition-colors px-2">
              <div className="w-8 h-8 rounded-full border-2 border-primary-light bg-primary text-white flex items-center justify-center text-xs font-bold">AK</div>
              <div>
                <div className="text-sm font-medium">Amit Kumar</div>
                <div className="text-xs text-text-light">Lead Developer</div>
              </div>
            </div>
          </div>
          
          <a 
            href="https://github.com/Amitsingh9693/Game-Recommendation-Bot" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-primary-light hover:text-white transition-colors cursor-pointer"
          >
            <Code size={18} /> View Source Code
          </a>
          <div className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-primary-light hover:text-white transition-colors cursor-pointer">
            <Bug size={18} /> Report Bug
          </div>
          <div className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-primary-light hover:text-white transition-colors cursor-pointer">
            <Lightbulb size={18} /> Suggest Feature
          </div>
        </div>
      )}
    </div>
  );
};

export default DeveloperInfo;
