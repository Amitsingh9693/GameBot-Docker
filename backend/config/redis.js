const { createClient } = require('redis');

let redisClient;

const connectRedis = async () => {
  redisClient = createClient({
    url: process.env.REDIS_URL
  });

  redisClient.on('error', (err) => console.error('Redis Client Error', err));
  redisClient.on('connect', () => console.log('Redis Client Connected'));

  try {
    await redisClient.connect();
  } catch (err) {
    console.error('Could not connect to Redis:', err);
  }
};

const getRedisClient = () => redisClient;

module.exports = { connectRedis, getRedisClient };
