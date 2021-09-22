const { MessageEmbed, MessageButton } = require("discord.js")
module.exports = {
    name: "logs-sent",
    description: "to show sentcresits history",
    category: "economy",
    examples: ["log-sent"],
    usage: ["log-sent"],
    category: "economy",
    run : async (client , interacion) =>{
        let gen =  (arr, title) => {
            const embeds = [];
            let k = 5;
            for(let i = 0; i < arr.length; i +=5){
              const newarr = arr.slice(i, k);
              let j = i
              k += 5;
              const ebc = newarr
              .map(p => `**User: <@${p.to}>\nAmount: \`${p.amout}\`**`)
              .join('\n')
              const em = new MessageEmbed()
              .setTitle(title)
              .setDescription(ebc)
              embeds.push(em)
            }
            return embeds
          }
        let data = await client.GetData(interacion.user)
        let Transfare = data.Transfare;
        if(data.Transfare.length === 0 ) {
            return interacion.reply("**You dont transfer credits to anyone**")
        }
        let ps = gen(Transfare, "transferred")
        const button1 = new MessageButton()
          .setCustomId('previousbtn')
          .setLabel('⬅️ Previous')
          .setStyle('DANGER')
        const button2 = new MessageButton()
          .setCustomId('nextbtn')
          .setLabel('➡️ Next')
          .setStyle('SUCCESS');
        client.page_message(interacion, ps, [button1, button2])
    }
}