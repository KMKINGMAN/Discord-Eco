import { CommandFilerType } from "../../lib/handler/command";
export let command = {
    slachcmd: {
        name: "daily",
        description: "clame your daily",
        category: "economy",
        examples: ["daily"],
        usage: ["daily"],
        async run(client, interaction) {
            let eco = new client.managers.EcoSystem(client);
            eco.Daily(interaction.user)
            .then((message)=> {
                interaction.reply(message)
            })
            .catch((err: string)=> {
                interaction.reply(err);
            })
        }
    },
    general: {
        name: "daily",
        description: "clame your daily",
        category: "economy",
        examples: ["daily"],
        usage: ["daily"],
        async run(client, message) {
            let eco = new client.managers.EcoSystem(client);
            eco.Daily(message.author)
            .then((res_message)=> {
                message.reply(res_message)
            })
            .catch((err: string)=> {
                message.reply(err);
            });
        },
    }
} as CommandFilerType