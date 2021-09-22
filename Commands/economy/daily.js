module.exports = {
    name: "daily",
    description: "to recive daily",
    category: "economy",
    examples: ["daily"],
    usage: ["daily"],
    run : async (client, kmsg, args, prefix) =>{
        kmsg.channel.send(await client.Daily(kmsg.author))
    }
}