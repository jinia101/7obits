import Redis from 'ioredis';

// Standard Redis URL from Upstash (TCP/TLS)
const redisUrl = process.env.REDIS_URL; 

if (!redisUrl) {
  throw new Error('REDIS_URL is not defined in the environment variables.');
}

export const connection = new Redis(redisUrl, {
  maxRetriesPerRequest: null, // Required for BullMQ/Queue workers
  retryStrategy: (times) => {
    if (times > 5) return null; // Stop after 5 tries
    return Math.min(times * 50, 2000); // Exponential backoff
  },
});