import { ApplicationCommandOptionType, User, GuildMember } from "discord.js";
import { CommandFilerType } from "../../lib/handler/command";
export let command = {
    slachcmd: {
        name: "credits",
        description: "to show your credits and transfare a credits",
        options: [
            {
                name: "member",
                type: ApplicationCommandOptionType.User,
                description: "member that you wanna to show her credits"
            },
            {
                name: "credits",
                type: ApplicationCommandOptionType.Number,
                description: "number of credits taht you wanna to send"
            }
        ],
        examples: ["credits", "credits @KINGMAN", "credits @KINGMAN 1000"],
        usage: ["credits", "credits [Member]", "credits [Member] [Amout]"],
        category: "economy",
        async run(client, interaction) {
            let eco = new client.managers.EcoSystem(client);
            let member = interaction.options.getUser("member", false);
            let credits = interaction.options.getNumber("credits", false)
            if(member == null){
                let data = await eco.get_data(interaction.member as GuildMember);
                interaction.reply(`**💳 | <@${(interaction.member as GuildMember).id}>'s have a \`$${data.credit}\`**`);
            }
            if(member && credits === null){
                let data = await eco.get_data(member);
                interaction.reply(`**💳 | <@${member.id}>'s have a \`$${data.credit}\`**`);
            } else if(member && credits){
                eco.transfere((interaction.member as GuildMember), member, credits)
                .then((res)=> {
                    interaction.reply(res);
                })
                .catch((err: string)=> {
                    interaction.reply(err);
                })
            }
            
        }
    },
    general: {
        name: "daily",
        description: "to show your credits and transfare a credits",
        examples: ["credits", "credits @KINGMAN", "credits @KINGMAN 1000"],
        usage: ["credits", "credits [Member]", "credits [Member] [Amout]"],
        category: "economy",
        async run(client, message, args, manager) {
            let eco = new client.managers.EcoSystem(client);
            let member = await manager.getUser(args[0]??"");
            if(!member){
                let data = await eco.get_data(message.author);
                message.reply(`**💳 | <@${message.author.id}>'s have a \`$${data.credit}\`**`);
            };
            if(member && !args[1]){
                let data = await eco.get_data(member);
                message.reply(`**💳 | <@${member.id}>'s have a \`$${data.credit}\`**`);
            }
            if(isNaN(parseInt(args[1]))){
                let data = await eco.get_data(member);
                message.reply(`**💳 | <@${member.id}>'s have a \`$${data.credit}\`**`);
            } else {
                eco.transfere(message.author, member, parseInt(args[1]))
                .then((res)=> {
                    message.reply(res);
                })
                .catch((err: string)=> {
                    message.reply(err);
                })
            }
        },
    },
    user_command: {
        id: "credits",
        async run(client, interaction) {
            let member = interaction.targetUser as User;
            if(member.bot) return interaction.reply({ content: "**You Cant Use This Command in Bots User**", ephemeral: true });
            let  eco = new client.managers.EcoSystem(client);
            let data = await eco.get_data(member);
            interaction.reply(`**💳 | <@${member.id}>'s have a \`$${data.credit}\`**`);
        },
    }
} as CommandFilerType