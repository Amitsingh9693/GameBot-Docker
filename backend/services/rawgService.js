const axios = require('axios');

const RAWG_BASE_URL = 'https://api.rawg.io/api';

const getGenres = async () => {
  const response = await axios.get(`${RAWG_BASE_URL}/genres`, {
    params: { key: process.env.RAWG_API_KEY }
  });
  return response.data;
};

const getPlatforms = async () => {
  const response = await axios.get(`${RAWG_BASE_URL}/platforms`, {
    params: { key: process.env.RAWG_API_KEY }
  });
  return response.data;
};

const getTags = async () => {
  const response = await axios.get(`${RAWG_BASE_URL}/tags`, {
    params: { key: process.env.RAWG_API_KEY, page_size: 20 }
  });
  return response.data;
};

const getRecommendations = async (genres, platforms, tags) => {
  let url = `${RAWG_BASE_URL}/games?key=${process.env.RAWG_API_KEY}&page_size=12&ordering=-rating`;
  
  if (genres && genres.length > 0) {
    url += `&genres=${genres.join(',')}`;
  }
  if (platforms && platforms.length > 0) {
    url += `&platforms=${platforms.join(',')}`;
  }
  if (tags && tags.length > 0) {
    url += `&tags=${tags.join(',')}`;
  }

  const response = await axios.get(url);
  return response.data;
};

const getGameDetails = async (gameId) => {
    try {
        const response = await axios.get(`${RAWG_BASE_URL}/games/${gameId}?key=${process.env.RAWG_API_KEY}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching details for game ${gameId}`, error.message);
        return { description: '' };
    }
}

module.exports = {
  getGenres,
  getPlatforms,
  getTags,
  getRecommendations,
  getGameDetails
};
