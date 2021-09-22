const {
    Client,
    Collection,
    User
} = require("discord.js");
class KINGMAN_CASH_SYSTEM extends Client {
    constructor (options) {
      super(options);
      this.config = require("../LocalDB/config.json");
      this.commands = new Collection();
      this.SlashCommands = new Collection();
      this.events = new Collection();
      this.aliases = new Collection();
      this.userdata = require("../Client/modals/user_data.js");
      this.ms = require("ms");
      this.page_interction = require("./handler/page-gen");
      this.page_message = require("./handler/page-gen-msg");
      /**
       * @description to add daily balance to member
       * @emits DailyReseve 
       * @param {User} user
       * @returns Message Content 
       */
      this.Daily = async (user) => {
          let amount = Math.floor(Math.random() * 500) + 100;
          let timeout = 86400000;
          let data = await this.userdata.findOne({
              UserID: user.id
          });
          if(!data){
              data = await this.userdata.create({
                  UserID: user.id
              })
              await data.save()
          }
          if (timeout - (Date.now() - data.LastDaily) > 0){
            let times = this.ms(timeout - (Date.now() - data.LastDaily));
            return `**You have to wait a while \`${times}\` To receive the Daily**`
          } else {
            data.Credit = data.Credit + amount
            data.LastDaily = Date.now()
            await data.save()
            this.emit("DailyReseve", user, amount, data)
            return "**💰 | You have received " + `$\`${amount}\` From Daily **`
          }
      }
      /**
       * @description to get User data From DB
       * @param {User} user 
       * @returns 
       */
      this.GetData = async (user) => {
        let data = await this.userdata.findOne({
            UserID: user.id
        });
        if(!data){
            data = await this.userdata.create({
                UserID: user.id
            })
            data.save()
        }
        return data;
      }
      /**
       * @description to send Number Of Credits
       * @emits CreditSent
       * @param {User} user1 
       * @param {User} user2 
       * @param {String} amount 
       * @returns 
       * @example 
       * kmsg.channel.send({
       *   content: client.transfare(Member, MemmberToTransfare, "100") 
       * })
       */
      this.transfare = async (user1, user2, amount) => {
        let data = await this.userdata.findOne({
            UserID: user1.id
        });
        if(!data){
            data = await this.userdata.create({
                UserID: user1.id
            })
            data.save()
        }
        let data2 = await this.userdata.findOne({
            UserID: user2.id
        })
        if(!data2){
            data2 = await this.userdata.create({
                UserID: user2.id
            })
            data2.save()
        }
        if(isNaN(parseInt(amount)))return "**Inviled Amount**"; 
        if(parseInt(amount) > data.Credit)return "**You don't have enogth money!**";
        data.Credit = data.Credit - parseInt(amount);
        data.Transfare.push({
            "to": user2.id,
            "amout": parseInt(amount)
        })
        data.save();
        data2.Reseve.push({
            "from": user1.id,
            "amout": parseInt(amount)
        })
        data2.Credit = data2.Credit + parseInt(amount);
        data2.save();
        this.emit("CreditSent", user1, user2, data, data2, amount)
        return `**${user1}, You have been sent \`$${amount}\` to ${user2}**`;
      }
      try {
          ["commands", "events", "interaction"].forEach(p => {
              require(`./handler/${p}.js`)(this)
          })
      } catch(e){

      }
    }
}
module.exports = KINGMAN_CASH_SYSTEM