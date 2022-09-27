import { KMCODES } from "./lib/kingman";

const client = new KMCODES({
    intents: ["Guilds", "GuildMessages", "GuildIntegrations", "MessageContent"]
});

client.login(client.config.token).catch(e=> {
    client.logger.error(`Error to Connet to Discord Bot \n${e.message}`)
})