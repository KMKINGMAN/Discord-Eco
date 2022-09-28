import { GuildMember, User, EmbedBuilder } from "discord.js";
import { KMCODES } from "../kingman";

export class KINGMAN_ECO {
    public client: KMCODES
    constructor(client: KMCODES){
        this.client = client
    };
    async Daily(user: GuildMember | User){
        return new Promise<string>(async(resolve, reject) => {
            let amount = Math.floor(Math.random() * 500) + 100
            let timeout = 86400000;
            let data = await this.client.eco.findOne({
                user_id: user.id
            });
            if(!data) data = await (await this.client.eco.create({
                user_id: user.id
            })).save();
            if (timeout - (Date.now() - data.last_daily) > 0){
                let time = this.client.package.ms(timeout - (Date.now() - data.last_daily));
                return reject(`**You have to wait a while \`${time}\` To receive the Daily**`)
            } else {
                data.credit = data.credit + amount;
                data.last_daily = Date.now();
                await data.save();
                return resolve("**💰 | You have received " + `$\`${amount}\` From Daily **`)
            }
        })
    };
    async transfere(user_transfer: GuildMember | User, user_recive: GuildMember | User, amount: number){
        return new Promise<string>(async(resolve, reject)=> {
            let user_profile_1 = await this.client.eco.findOne({ user_id: user_transfer.id });
            if(!user_profile_1) user_profile_1 = await (await this.client.eco.create({
                user_id: user_transfer.id
            })).save();
            let user_profile_2 = await this.client.eco.findOne({ user_id: user_recive.id });
            if(!user_profile_2) user_profile_2 = await (await this.client.eco.create({
                user_id: user_recive.id
            })).save();
            if(amount > user_profile_1.credit) return resolve(`**You don't have enogth money!**`);
            user_profile_1.credit = user_profile_1.credit - amount;
            user_profile_1.transfere.push({
                amout: amount,
                to: user_recive.id
            });
            await user_profile_1.save();
            user_profile_2.credit = user_profile_2.credit + amount;
            user_profile_2.receive.push({
                amout: amount,
                from: user_transfer.id
            });
            await user_profile_2.save();
            return resolve(`**${user_transfer}, You have been sent \`$${amount}\` to ${user_recive}**`)
        })
    };
    async get_data(user: GuildMember | User){
        return new Promise<{user_id: string, credit: number, last_daily: number, transfere:{to?: string | undefined; amout?: number | undefined;}[], receive: {from?: string | undefined; amout?: number | undefined}[]}>(async(resolve, reject) => {
            let data = await this.client.eco.findOne({ user_id: user.id });
            if(!data) data = await (await this.client.eco.create({ user_id: user.id })).save();
            return resolve({
                user_id: data.user_id,
                credit: data.credit,
                last_daily: data.last_daily,
                receive: data.receive,
                transfere: data.transfere
            });
        })
    }
    EmbedTransfare (arr: {to?: string | undefined; amout?: number | undefined;}[], title: string) {
        const embeds: EmbedBuilder[] = [];
        let k: number = 5;
        for(let i = 0; i < arr.length; i +=5){
            const newarr = arr.slice(i, k);
            let j = i
            k += 5;
            const ebc = newarr
            .map(p => `**User: <@${p.to}>\nAmount: \`${p.amout}\`**`)
            .join('\n')
            const em = new EmbedBuilder()
            .setTitle(title)
            .setDescription(ebc)
            embeds.push(em)
        }
        return embeds
    };
    EmbedReceive (arr: {from?: string | undefined; amout?: number | undefined}[], title: string) {
        const embeds: EmbedBuilder[] = [];
        let k: number = 5;
        for(let i = 0; i < arr.length; i +=5){
            const newarr = arr.slice(i, k);
            let j = i
            k += 5;
            const ebc = newarr
            .map(p => `**User: <@${p.from}>\nAmount: \`${p.amout}\`**`)
            .join('\n')
            const em = new EmbedBuilder()
            .setTitle(title)
            .setDescription(ebc)
            embeds.push(em)
        }
        return embeds
    };
}