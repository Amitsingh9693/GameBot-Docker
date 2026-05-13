const rawgService = require('../services/rawgService');
const redisService = require('../services/redisService');
const History = require('../models/History');

// @desc    Get all genres
// @route   GET /api/genres
const getGenres = async (req, res) => {
  try {
    const cacheKey = 'genres';
    const cachedData = await redisService.getCachedData(cacheKey);

    if (cachedData) {
      return res.json(cachedData);
    }

    const data = await rawgService.getGenres();
    await redisService.setCachedData(cacheKey, data);

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error fetching genres' });
  }
};

// @desc    Get all platforms
// @route   GET /api/platforms
const getPlatforms = async (req, res) => {
  try {
    const cacheKey = 'platforms';
    const cachedData = await redisService.getCachedData(cacheKey);

    if (cachedData) {
      return res.json(cachedData);
    }

    const data = await rawgService.getPlatforms();
    await redisService.setCachedData(cacheKey, data);

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error fetching platforms' });
  }
};

// @desc    Get popular tags
// @route   GET /api/tags
const getTags = async (req, res) => {
  try {
    const cacheKey = 'tags';
    const cachedData = await redisService.getCachedData(cacheKey);

    if (cachedData) {
      return res.json(cachedData);
    }

    const data = await rawgService.getTags();
    await redisService.setCachedData(cacheKey, data);

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error fetching tags' });
  }
};

// @desc    Get recommendations based on filters
// @route   POST /api/recommend
const getRecommendations = async (req, res) => {
  const { sessionId, genres, platforms, tags } = req.body;

  try {
    // 1. Save filter history if sessionId is provided
    if (sessionId) {
      try {
        await History.create({
          sessionId,
          genres: genres || [],
          platforms: platforms || [],
          tags: tags || []
        });
      } catch (dbError) {
         console.error('Error saving history to MongoDB', dbError);
         // Continue even if history fails
      }
    }

    // 2. Generate cache key based on selected filters
    const cacheKey = `recs:${(genres||[]).join('-')}:${(platforms||[]).join('-')}:${(tags||[]).join('-')}`;
    const cachedData = await redisService.getCachedData(cacheKey);

    if (cachedData) {
      return res.json(cachedData);
    }

    // 3. Fetch data from RAWG API
    const gamesData = await rawgService.getRecommendations(genres, platforms, tags);
    
    // 4. Fetch details for each game to get the description (limited to 12 as per page_size)
    if (gamesData.results && gamesData.results.length > 0) {
        const gamePromises = gamesData.results.map(async (game) => {
            const details = await rawgService.getGameDetails(game.id);
            return {
                ...game,
                description: details.description || 'No description available.'
            };
        });

        const detailedGames = await Promise.all(gamePromises);
        gamesData.results = detailedGames;
    }

    // 5. Cache the final result
    await redisService.setCachedData(cacheKey, gamesData);

    res.json(gamesData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error fetching recommendations' });
  }
};

module.exports = {
  getGenres,
  getPlatforms,
  getTags,
  getRecommendations
};
