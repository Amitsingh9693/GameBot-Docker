import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getGenres = async () => {
  const response = await api.get('/genres');
  return response.data;
};

export const getPlatforms = async () => {
  const response = await api.get('/platforms');
  return response.data;
};

export const getTags = async () => {
  const response = await api.get('/tags');
  return response.data;
};

export const getRecommendations = async (sessionId, filters) => {
  const response = await api.post('/recommend', {
    sessionId,
    genres: filters.genres,
    platforms: filters.platforms,
    tags: filters.tags,
  });
  return response.data;
};

export default api;
