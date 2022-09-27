import { Message } from "discord.js";
import { EventsTyper } from "../../lib/handler/events";

export let events = {
    name: "messageCreate",
    async run(client, kmsg: Message){
        let manager = new client.managers.Message(kmsg);
        let pmention = new RegExp(`^<@!?${client.user?.id}>( |)$`);
        if (kmsg.content.match(pmention)) {
          return kmsg.reply(`**MY PREFIX IS: ${client.config.prefix}**`)
        };
        if (kmsg.author.bot) return;
        if (!kmsg.guild) {
          return kmsg.reply("**ONLY WORK ON SERVERS NOT DM**")
        };
        if (!kmsg.content.startsWith(client.config.prefix)) return;
        const args = kmsg.content
        .slice(client.config.prefix.length)
        .trim() 
        .split(/ +/g),
        command = args.shift()?.toLowerCase();
        if(!command) return;
        if (command?.length === 0) return;
        let command_file = client.collection.prefix_command.get(command);
        if(command_file){
            if(!kmsg.member?.permissions.has(command_file.permissions?.me || [])){
                return kmsg.reply({ embeds: [manager.generateError(`You need \`${command_file.permissions?.me}\` permissions`)]})
            }
            if(!kmsg.guild.members.cache.get(client.user?.id ?? "")?.permissions.has(command_file.permissions?.bot || [])){
                return kmsg.reply({ embeds: [manager.generateError(`I need \`${command_file.permissions?.bot}\` permissions`)]})
            };
            try {
                await command_file.run(client, kmsg, args, manager);
            } catch (error) {
                console.log(error)
            }
        }
    }
} as EventsTyper;