module.exports = {
    name: "daily",
    description: "to recive daily",
    examples: ["daily"],
    usage: ["daily"],
    category: "economy",
    run : async (client , interacion) =>{
        interacion.reply(await client.Daily(kmsg.author))
    }
}