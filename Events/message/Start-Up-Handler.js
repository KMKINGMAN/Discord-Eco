module.exports = {
    name: "messageCreate",
    run: async (kmsg, client)=>{
        if(kmsg.author.bot) return;
        if(!kmsg.guild) return;
        if(!kmsg.content.startsWith(client.config.prefix)) return;
        const args = kmsg.content.slice(client.config.prefix.length).trim().split(/ +/g),
        command = args.shift().toLowerCase();
        if(command.length === 0 ) return;
        let cmd = client.commands.get(command)
        if(cmd){
            cmd.run(client, kmsg, args, client.config.prefix)
        }
    }
}