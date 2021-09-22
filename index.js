const KINGMAN = require("./Client/EClient");
const Discord = require("discord.js");
const { Intents } =  require("discord.js");
require("dotenv").config()
const client = new KINGMAN({
    shards: "auto",
    allowedMentions: {
      parse: [ ],
      repliedUser: false,
    },
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: [ 
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
});
client.login(process.env.TOKEN).catch(e => console.log(``))
