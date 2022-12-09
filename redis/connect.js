import * as dotenv from "dotenv";
import mongoose from "mongoose";
import * as redis from "redis";

dotenv.config();

// MongoDB 연결
function connectDB() {
  mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_ID}:${process.env.MONGODB_PASSWORD}@cluster0.a7vmgdw.mongodb.net/database0?`,
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("mongoDB is connected...");
      }
    }
  );
}

connectDB();

// redis 연결
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

export const redisCli = redisClient.v4;
