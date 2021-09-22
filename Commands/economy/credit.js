
module.exports = {
    name: "credits",
    description: "to show / transfare credits",
    aliases: ["credit"],
    examples: ["credits", "credits @KINGMAN", "credits @KINGMAN 1000"],
    usage: ["credits", "credits [Member]", "credits [Member] [Amout]"],
    category: "economy",
    run : async (client, kmsg, args, prefix) =>{
        let data;
        let member = kmsg.mentions.users.first()
        if(!member){
            data = await client.GetData(kmsg.author)
            kmsg.channel.send(`**💳 | <@${kmsg.author.id}>'s have a \`$${data.Credit}\`**`)
        }
        if(member && !args[1]){
            data = await client.GetData(member)
            kmsg.channel.send(`**💳 | <@${member.id}>'s have a \`$${data.Credit}\`**`)
        }
        if(args[1] && member){
            if(member.id == kmsg.author.id){
                kmsg.channel.send(`**You can't give yourself money..**`)
            }
            kmsg.channel.send(await client.transfare(kmsg.author, member, args[1]))
        }
    }
}