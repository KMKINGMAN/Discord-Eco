const { readfolderSync } = require("fs"),
ascii = require("ascii-table"),
fs = require("fs"),
colors = require("colors"),
table = new ascii("SlashCommands");
table.setHeading("Command", "Load status");

module.exports = (client) => {
    let Commands = []
    fs.readdirSync("./SlashCommands/").forEach(folder => {
        const commands = fs.readdirSync(`./SlashCommands/${folder}/`).filter(file => file.endsWith(".js"));
        for (let file of commands) {
            let cmd = require(`../../SlashCommands/${folder}/${file}`);
            if (cmd.name) {
                client.SlashCommands.set(cmd.name, cmd);
                Commands.push(cmd)
                table.addRow(file, '✅');
            } else {
                table.addRow(file, `❌`);
                continue;
            }
            if (cmd.aliases && Array.isArray(cmd.aliases)) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name));
        }
    });
    client.on("ready", async ()=> {
        Commands.forEach(async cmd => {
            await client.guilds.cache.forEach(async (guild)=> {
                await guild.commands.create(cmd)
            })
        })
    })
    console.log(table.toString().brightCyan);    
}