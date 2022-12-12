import * as redis from "redis";

const redisClient = redis.createClient({
  url: `redis://@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
  legacyMode: true,
});

redisClient.on("connect", () => {
  console.info("Redis connected!");
});
redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});

redisClient.connect();
const redisCli = redisClient.v4;

export default redisCli;
