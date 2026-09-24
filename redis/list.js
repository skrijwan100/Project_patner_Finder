import client from "./client.js";



async function test() {
    // await client.lPush("message","Hello")  
    // await client.lPush("message","Hii")  
    // await client.lPush("message","Bye")  
    await client.rPop("message")
    

}

test();
