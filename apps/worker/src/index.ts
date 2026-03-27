import Redis from 'ioredis';

// Replace with your actual Redis connection string/config
const redis = new Redis('rediss://default:gQAAAAAAAU_dAAIncDI4M2ZlMjg3OWEzZmM0ZjU5YjMzZjE5MzkxYTUwZDIxZnAyODU5ODE@inviting-javelin-85981.upstash.io:6379'); 

async function testConnection() {
  try {
    const result = await redis.ping();
    console.log(`Redis connection test: ${result}`); // This should print "PONG"
  } catch (err) {
    console.error('Redis connection failed:', err);
  }
}

testConnection();