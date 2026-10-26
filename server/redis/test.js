import redis from "./redis.js";

await redis.set("test", "Hello Rijwan");

const data = await redis.get("test");

console.log(data);