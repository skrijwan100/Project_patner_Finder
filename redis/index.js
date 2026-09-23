import client from "./client.js";



async function test() {
    await client.set("user:1","Rijwan");
    // await client.set("user:2","Rani");
    // await client.expire("user:2",10)
    const value = await client.get('user:2');
    console.log(value);

}
test();
