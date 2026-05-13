const { getRedisClient } = require('../config/redis');

// Cache expiration in seconds (1 hour)
const CACHE_EXPIRATION = 3600;

const getCachedData = async (key) => {
  const client = getRedisClient();
  if (!client || !client.isOpen) return null;

  try {
    const data = await client.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Redis get error:', error);
    return null;
  }
};

const setCachedData = async (key, data) => {
  const client = getRedisClient();
  if (!client || !client.isOpen) return;

  try {
    await client.setEx(key, CACHE_EXPIRATION, JSON.stringify(data));
  } catch (error) {
    console.error('Redis set error:', error);
  }
};

module.exports = {
  getCachedData,
  setCachedData
};
