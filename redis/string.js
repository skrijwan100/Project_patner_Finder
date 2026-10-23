import client from "./client.js";

async function stringMethodsDemo() {
    // SET and GET
    await client.set("user:1:name", "Rijwan");
    console.log("GET:", await client.get("user:1:name"));

    // MSET and MGET
    await client.mSet({
        "user:1:city": "Dhaka",
        "user:1:role": "Developer",
    });
    console.log(
        "MGET:",
        await client.mGet(["user:1:city", "user:1:role"])
    );

    // INCR
    await client.set("user:1:visits", 0);
    console.log("INCR:", await client.incr("user:1:visits"));

    // APPEND
    await client.append("user:1:name", " Khan");
    console.log("APPEND + GET:", await client.get("user:1:name"));

    await client.quit();
}

stringMethodsDemo().catch(async error => {
    console.error("Redis string methods demo failed:", error);
    await client.quit();
    process.exitCode = 1;
});
