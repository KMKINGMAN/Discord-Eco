module.exports = {
    name: "interactionCreate",
    run: async(interaction , client) => {
        if(!interaction.isCommand()) return;
        let cmd = client.SlashCommands.get(interaction.commandName);
        if(!cmd){
            return interaction.reply({
                content: `Something went Wrong`
            })
        }
        try {
            cmd.run(client, interaction)
        } catch (err) {
            console.log(err)
        }
    }
}