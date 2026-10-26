import { createClient } from "redis";

const client = createClient({
  url: process.env.REDIS_URL,
});

client.on("connect", () => {
  console.log("✅ Redis Connected");
});

client.on("ready", () => {
  console.log("🚀 Redis Ready");
});

client.on("error", (err) => {
  console.error("❌ Redis Error:", err);
});

client.on("reconnecting", () => {
  console.log("🔄 Redis Reconnecting...");
});

if (!client.isOpen) {
  await client.connect();
}

export default client;