const { MessageEmbed, MessageButton } = require("discord.js")
module.exports = {
    name: "log-reseve",
    description: "to sgow resive history ",
    examples: ["log-reseve"],
    usage: ["log-reseve"],
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
              .map(p => `**User: <@${p.from}>\nAmount: \`${p.amout}\`**`)
              .join('\n')
              const em = new MessageEmbed()
              .setTitle(title)
              .setDescription(ebc)
              embeds.push(em)
            }
            return embeds
          }
        let data = await client.GetData(interacion.user)
        let Reseve = data.Reseve;
        if(data.Reseve.length === 0 ) {
            return interacion.reply("**The money has not been transferred to you before**")
        }
        let ps = gen(Reseve, "Received")
        const button1 = new MessageButton()
                .setCustomId('previousbtn')
                .setLabel('⬅️ Previous')
                .setStyle('DANGER');

        const button2 = new MessageButton()
                        .setCustomId('nextbtn')
                        .setLabel('➡️ Next')
                        .setStyle('SUCCESS');
        client.page_interction(interacion, ps, [button1, button2])
    }
}