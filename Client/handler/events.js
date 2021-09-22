const { readdirSync } = require("fs"),
ascii = require("ascii-table"),
fs = require("fs"),
colors = require("colors"),
table = new ascii("Events");
table.setHeading("Events", "Load status");
module.exports = (client) => {
    readdirSync("./Events/").forEach(folder => {
      const events = readdirSync(`./Events/${folder}/`).filter(file => file.endsWith(".js"));
        for (const file of events){
        const event = require(`../../Events/${folder}/${file}`)
        if(event.name){
        let eventName = file.split(".")[0];
        client.events.set(event.name, event);
        table.addRow(file, '✅');
        client.on(event.name, (...args) => event.run(...args, client));
        }else{
          table.addRow(file, `❌`);
          continue;
        }
      }
    });
    console.log(table.toString().brightMagenta);    
}