const { readfolderSync } = require("fs"),
ascii = require("ascii-table"),
fs = require("fs"),
colors = require("colors"),
table = new ascii("Commands");
table.setHeading("Command", "Load status");

module.exports = (client) => {
    fs.readdirSync("./Commands/").forEach(folder => {
        const commands = fs.readdirSync(`./Commands/${folder}/`).filter(file => file.endsWith(".js"));
        for (let file of commands) {
            let cmd = require(`../../Commands/${folder}/${file}`);
            if (cmd.name) {
                client.commands.set(cmd.name, cmd);
                table.addRow(file, '✅');
            } else {
                table.addRow(file, `❌`);
                continue;
            }
            if (cmd.aliases && Array.isArray(cmd.aliases)) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name));
        }
    });
    console.log(table.toString().brightCyan);    
}