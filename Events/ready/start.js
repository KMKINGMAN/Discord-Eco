   
const colors = require("colors"),
figlet = require('figlet');
module.exports = {
	name: 'ready',
    run: async(client)=>{
    figlet('KINGMAN',(err, data) => {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data.brightRed)
    });
    client.user.setPresence({
      status: 'online',
      activities:[{
        name:client.config.prefix + `help Discord Eco`,
        type:'STREAMING',
        url: 'https://www.twitch.tv/kingman4hack'
      }]
    })
  }
}