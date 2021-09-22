module.exports = {
    name: "credits",
    description: "to show / transfare credits",
    type : "CHAT_INPUT",
    options: [{
        name: "member",
        description: "guild member",
        type: 6,
        require: false
    },{
        name: "amout",
        description: "Number of credit",
        type: 10,
        require: false
    }],
    examples: ["credits", "credits @KINGMAN", "credits @KINGMAN 1000"],
    usage: ["credits", "credits [Member]", "credits [Member] [Amout]"],
    category: "economy",
    run: async (client , interacion) => {
        let Member =  interacion.options.getUser("member"),
        amout = interacion.options.getNumber("amout"),
        Data;
        if(!Member){
            data = await client.GetData(interacion.user)
            interacion.reply(`**💳 | <@${interacion.user.id}>'s have a \`$${data.Credit}\`**`)
        }
        if(Member &&!amout){
            data = await client.GetData(Member)
            interacion.reply(`**💳 | <@${Member.id}>'s have a s\`$${data.Credit}\`**`)
        }
        if(interacion.user.id && amout){
            if(Member.id == interacion.user.id){
                interacion.reply(`**You can't give yourself money..**`)
            }
            interacion.reply(await client.transfare(interacion.user, Member, String(amout)))
        }
    }
}