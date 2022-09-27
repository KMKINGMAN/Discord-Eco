import { EmbedBuilder } from "@discordjs/builders";
import { BaseInteraction } from "discord.js";
import { EventsTyper } from "../../lib/handler/events";

export let events = {
    name: "interactionCreate",
    async run(client, interaction: BaseInteraction){
        if (interaction.isChatInputCommand()) {
            let manager = new client.managers.Message(interaction)
            const command = client.collection.slash_commands.get(interaction.commandName);
            if (!command) return;
            if(interaction.member){
                if(!interaction.guild?.members.cache.get(interaction.member.user.id)?.permissions.has(command.permissions?.me || [])){
                    return interaction.reply({ embeds: [manager.generateError(`You need \`${command.permissions?.me}\` permissions`)]})
                }
            }
            if(!interaction.guild?.members.cache.get(client.user?.id ?? "")?.permissions.has(command.permissions?.bot || [])){
                return interaction.reply({ embeds: [manager.generateError(`I need \`${command.permissions?.bot}\` permissions`)]})
            };
            try {
                await command.run(client, interaction, manager)
            } catch (error) {
                console.error(error)
            }
        };
        if (interaction.isUserContextMenuCommand()) {
            const command = client.collection.user_commands.get(interaction.commandName);
            if (!command) return;
            try {
                let manager = new client.managers.Message(interaction)
                command.run(client, interaction, manager);
            } catch (e) {
                console.error(e)
            };
        };
        if (interaction.isMessageContextMenuCommand()) { 
            const command = client.collection.message_commands.get(interaction.commandName);
            if (!command) return;
            try {
                command.run(client, interaction);
            } catch (e) {
                console.error(e)
            };
        };
        if (interaction.isModalSubmit()) {
            const modal = client.collection.modals.get(interaction.customId);
            if (!modal) return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setDescription('Something went wrong... Probably the Modal ID is not defined in the modals handler.')
                ],
                ephemeral: true
            });
            try {
                modal.run(client, interaction);
            } catch (e) {
                console.error(e)
            };
        }
        if (interaction.isButton()) {
            const button = client.collection.buttons.get(interaction.customId);
            if (!button) return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setDescription('Something went wrong... Probably the button ID is not defined in the modals handler.')
                ],
                ephemeral: true
            });
            try {
                button.run(client, interaction);
            } catch (e) {
                console.error(e)
            };
        };
        if(interaction.isSelectMenu()){
            const menu = client.collection.select_menu.get(interaction.customId);
            if(!menu) return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setDescription('Something went wrong... Probably the selectmenu ID is not defined in the modals handler.')
                ]
            });
            try {
                menu.run(client, interaction)
            } catch (error) {
                console.log(error)
            }
        }
    }
} as EventsTyper