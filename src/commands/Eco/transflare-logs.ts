import { ButtonStyle } from "discord.js";
import { CommandFilerType } from "../../lib/handler/command";
export let command = {
    slachcmd: {
        name: "transfer",
        description: "to show sent history",
        category: "economy",
        examples: ["transfer"],
        usage: ["transfer"],
        async run(client, interaction, manager) {
            const { PreviousPageButton, NextPageButton, InteractionPagination } = client.package.btn_pages;
            let user = interaction.user;
            let  eco = new client.managers.EcoSystem(client);
            let user_data = await eco.get_data(user);
            let embeds = eco.EmbedTransfer(user_data.transfere, "transfered credits");
            if(embeds.length === 0) embeds = [manager.generateDone("You Dont make any action", "transfered History")];
            const pagination = new InteractionPagination()
            .setButtons([
                new PreviousPageButton({
                    custom_id: "prev_page", label: "Previous", style: ButtonStyle.Success
                }),
                new NextPageButton().setStyle({
                    custom_id: "next_page", label: "Next", style: ButtonStyle.Success
                }),
            ])
            .setEmbeds(embeds)
            .setTime(60000);
            await pagination.send(interaction)
        }
    },
    general: {
        name: "transfer",
        description: "to show sent history",
        category: "economy",
        examples: ["transfer"],
        usage: ["transfer"],
        async run(client, message, _args, manager) {
            const { PreviousPageButton, NextPageButton, ChannelPagination } = client.package.btn_pages;
            let  eco = new client.managers.EcoSystem(client);
            let user_data = await eco.get_data(message.author);
            let embeds = eco.EmbedTransfer(user_data.transfere, "transfered credits");
            if(embeds.length === 0) embeds = [manager.generateDone("You Dont make any action", "transfered History")];
            const pagination = new ChannelPagination()
            .setButtons([
                new PreviousPageButton({
                    custom_id: "prev_page", label: "Previous", style: ButtonStyle.Success
                }),
                new NextPageButton().setStyle({
                    custom_id: "next_page", label: "Next", style: ButtonStyle.Success
                }),
            ])
            .setEmbeds(embeds)
            .setTime(60000);

        await pagination.send(message.channel);
        }, 
    },
} as CommandFilerType;