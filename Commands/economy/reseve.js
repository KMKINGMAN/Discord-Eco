const {
    MessageEmbed,
    MessageButton
} = require("discord.js")
module.exports = {
    name: "logs-reseve",
    description: "to show recive history",
    category: "economy",
    examples: ["log-reseve"],
    usage: ["log-reseve"],
    run: async(client, kmsg, args, prefix) => {
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
        let data = await client.GetData(kmsg.author)
        let Reseve = data.Reseve;
        if(data.Reseve.length === 0 ) {
            return kmsg.channel.send("**The money has not been transferred to you before**")
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
        client.page_message(kmsg, ps, [button1, button2])
    }
}