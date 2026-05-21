import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Bot, Tags, Monitor, Hash, Gamepad2, RotateCcw, Lock, Search, AlertTriangle } from 'lucide-react';
import DeveloperInfo from '../components/DeveloperInfo';
import ChatBox from '../components/ChatBox';
import FilterSection from '../components/FilterSection';
import RecommendationCard from '../components/RecommendationCard';
import { getGenres, getPlatforms, getTags, getRecommendations } from '../services/api';

const Home = () => {
  const [sessionId] = useState(uuidv4());
  
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [allTags, setAllTags] = useState([]);
  
  const [filters, setFilters] = useState({ genres: [], platforms: [], tags: [] });
  const [messages, setMessages] = useState([]);
  
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  
  const totalFilters = filters.genres.length + filters.platforms.length + filters.tags.length;
  const isLocked = totalFilters === 0;

  const addBotMessage = (text) => {
    setMessages(prev => [...prev, { text, sender: 'bot', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
  };

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, { text, sender: 'user', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
  };

  useEffect(() => {
    addBotMessage("Hey there, gamer! 👋 I'm GameGuru, your personal game recommendation bot.");
    addBotMessage("I can help you discover amazing games based on your preferences. Let's get started!");
    addBotMessage("First, please select some filters to unlock the recommendation feature.");
    
    const fetchInitialData = async () => {
      try {
        const [genresData, platformsData, tagsData] = await Promise.all([
          getGenres(),
          getPlatforms(),
          getTags()
        ]);
        setGenres(genresData.results || []);
        setPlatforms(platformsData.results || []);
        setAllTags(tagsData.results || []);
      } catch (error) {
        console.error("Failed to load filter data", error);
        addBotMessage("Sorry, I had trouble loading filters. Please make sure the backend is running.");
      }
    };
    
    fetchInitialData();
  }, []);

  const handleToggleFilter = (type, id, name) => {
    setFilters(prev => {
      const currentList = prev[type];
      const isSelected = currentList.includes(id);
      
      let newList;
      if (isSelected) {
        newList = currentList.filter(itemId => itemId !== id);
        addUserMessage(`Removed ${name} from ${type}`);
      } else {
        newList = [...currentList, id];
        addUserMessage(`Added ${name} to ${type}`);
      }
      
      return { ...prev, [type]: newList };
    });
  };

  const handleGetRecommendations = async () => {
    if (isLocked) return;
    
    setLoading(true);
    setSearched(true);
    setRecommendations([]);
    
    try {
      const data = await getRecommendations(sessionId, filters);
      const results = data.results || [];
      
      setRecommendations(results);
      
      if (results.length > 0) {
        const genreText = filters.genres.length > 0 ? `${filters.genres.length} genre(s)` : 'any genre';
        const platformText = filters.platforms.length > 0 ? `${filters.platforms.length} platform(s)` : 'any platform';
        addBotMessage(`Here are some recommendations (${genreText}, ${platformText}):`);
      } else {
        addBotMessage("Sorry, I couldn't find any games matching your current filters. Try adjusting your preferences.");
      }
    } catch (error) {
      console.error("Error fetching recommendations", error);
      addBotMessage("Sorry, I had trouble finding games. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFilters({ genres: [], platforms: [], tags: [] });
    setRecommendations([]);
    setSearched(false);
    addBotMessage('Filters have been reset. What would you like to try now?');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 relative">
      <DeveloperInfo />
      
      <header className="text-center mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 className="text-primary text-4xl md:text-5xl font-bold mb-3 flex items-center justify-center gap-4">
          <Bot size={40} className="text-primary" />
          Game
        </h1>
        <p className="text-text-light text-lg max-w-2xl mx-auto">
          Your personal gaming assistant that helps you discover perfect games tailored to your taste
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Left Column: Chat & Filters */}
        <div className="flex-1 flex flex-col relative min-w-0">
          <div className="bg-card-bg rounded-2xl shadow-lg p-6 flex flex-col flex-1 h-full border border-gray-100">
            
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <img 
                src="https://ui-avatars.com/api/?name=Game+Guru&background=6c5ce7&color=fff" 
                alt="GameGuru" 
                className="w-10 h-10 rounded-full shadow-sm"
              />
              <h3 className="text-xl font-bold text-primary">GameGuru</h3>
              <div className="w-2.5 h-2.5 bg-success rounded-full ml-auto shadow-sm shadow-success/40" title="Online"></div>
            </div>

            <ChatBox messages={messages} />

            <FilterSection 
              title="Genres" icon={Tags} options={genres} 
              selectedIds={filters.genres} onToggle={handleToggleFilter} type="genres" 
            />
            
            <FilterSection 
              title="Platforms" icon={Monitor} options={platforms} 
              selectedIds={filters.platforms} onToggle={handleToggleFilter} type="platforms" 
            />
            
            <FilterSection 
              title="Popular Tags" icon={Hash} options={allTags} 
              selectedIds={filters.tags} onToggle={handleToggleFilter} type="tags" 
            />

            <div className="flex gap-4 mt-6 pt-4 sticky bottom-0 bg-gradient-to-t from-white via-white to-transparent pb-2 z-10">
              <button 
                onClick={handleGetRecommendations}
                disabled={isLocked || loading}
                className={`flex-1 py-4 px-6 font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden group ${
                  isLocked 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-80' 
                    : 'bg-primary text-white hover:bg-primary-light hover:shadow-lg hover:-translate-y-1'
                }`}
              >
                {isLocked ? <Lock size={20} /> : <Gamepad2 size={20} className="group-hover:animate-bounce" />}
                {loading ? 'Searching...' : 'Get Recommendations'}
              </button>
              
              <button 
                onClick={handleReset}
                disabled={isLocked && !searched}
                className={`flex-1 py-4 px-6 font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${
                  (isLocked && !searched)
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-secondary text-white hover:bg-pink-500 hover:shadow-lg hover:-translate-y-1'
                }`}
              >
                <RotateCcw size={20} /> Reset
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Recommendations */}
        <div className="flex-1 min-w-0">
          <div className="bg-transparent h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-primary">Your Recommendations</h2>
              <div className="bg-primary-light text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                {recommendations.length} games
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-primary h-64 bg-card-bg rounded-2xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 border-4 border-primary-light/30 border-t-primary rounded-full animate-spin mb-4"></div>
                <p className="font-medium text-lg animate-pulse">Searching our game database...</p>
              </div>
            ) : recommendations.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {recommendations.map(game => (
                  <RecommendationCard key={game.id} game={game} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-text-light text-center bg-card-bg rounded-2xl shadow-sm border border-gray-100 h-64">
                {searched ? (
                  <>
                    <Search size={48} className="mb-4 text-primary-light opacity-50" />
                    <p className="text-lg max-w-sm">No games found matching your filters. Try different preferences.</p>
                  </>
                ) : (
                  <>
                    <Lock size={48} className="mb-4 text-primary-light opacity-50" />
                    <p className="text-lg max-w-sm">Select at least one filter to unlock recommendations</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
