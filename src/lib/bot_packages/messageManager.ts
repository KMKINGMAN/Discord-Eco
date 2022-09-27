import { EmbedBuilder } from "@discordjs/builders";
import { Channel, ChatInputCommandInteraction, UserContextMenuCommandInteraction,Guild, GuildMember, Message, Role, User } from "discord.js";

export class MESSAGE_MANAGER {
    public message: Message | ChatInputCommandInteraction | UserContextMenuCommandInteraction
    constructor(message: Message | ChatInputCommandInteraction | UserContextMenuCommandInteraction){
        this.message = message
    };
    generateDone(content: string, title?: string): EmbedBuilder {
        return new EmbedBuilder({
            title: title??`**✔️ Succeed**`,
            author: {
                name: `${this.message.member?.user.username}`
            },
            description: content,
            footer: {
                text: `${this.message.client.user?.username} Power By KMCodes`
            },
            color: 15844367
        })
    };
    generateError(content: string, title?: string): EmbedBuilder {
        return new EmbedBuilder({
            title: title??"**⚠️ Error**",
            description: content,
            footer: {
                text: `${this.message.client.user?.username} Power By KMCodes`
            },
            color: 15548997
        })
    };
    async getUser(key: string){
        return new Promise<User>(async(resolve, reject) => {
            if(this.message instanceof Message) {
              let user = await this.message.mentions.members?.first() || 
              await this.message.guild?.members.cache.get(key) ||
              await this.message.guild?.members.cache.find(m => m.displayName.toLowerCase() == key.toLowerCase());
              if(!user){
                return reject({ message: "NO MEMBER FOUND" })
              }
              return resolve(user.user)
            } else {
                let user = await this.message.guild?.members.cache.get(key) ||
                await this.message.guild?.members.cache.find(m => m.displayName.toLowerCase() == key.toLowerCase());
                if(!user){
                    return reject({ message: "NO MEMBER FOUND" })
                }
                return resolve(user.user)
            }
        })
    };
    async getMember(key: string){
        return new Promise<GuildMember>(async(resolve, reject) => {
            if(this.message instanceof Message) {
              let user = await this.message.mentions.members?.first() || 
              await this.message.guild?.members.cache.get(key) ||
              await this.message.guild?.members.cache.find(m => m.displayName.toLowerCase() == key.toLowerCase());
              if(!user){
                return reject({ message: "NO MEMBER FOUND" })
              }
              return resolve(user)
            } else {
                let user = await this.message.guild?.members.cache.get(key) ||
                await this.message.guild?.members.cache.find(m => m.displayName.toLowerCase() == key.toLowerCase());
                if(!user){
                    return reject({ message: "NO MEMBER FOUND" })
                }
                return resolve(user)
            }
        })
    };
    async getChannel(key: string){
        return new Promise<Channel>(async(resolve, reject) => {
            if(this.message instanceof Message){
                let channel = await this.message.mentions.channels.first() ||
                await this.message.guild?.channels.cache.get(key) || 
                await this.message.guild?.channels.cache.find((c) => c.name == key);
                if(!channel){
                    return reject({ message: "NO CHANNEL FOUND" })
                }
                return resolve(channel)
            } else {
                let channel = await this.message.guild?.channels.cache.get(key) || 
                await this.message.guild?.channels.cache.find((c) => c.name == key);
                if(!channel){
                    return reject({ message: "NO CHANNEL FOUND" })
                }
                return resolve(channel)
            }
        })
    };
    async getRole(key: string){
        return new Promise<Role>(async(resolve, reject) => {
            if(this.message instanceof Message){
                let role = await this.message.mentions.roles.first() ||
                await this.message.guild?.roles.cache.get(key) ||
                await this.message.guild?.roles.cache.find(role=> role.name === key);
                if(!role){
                    return reject({ message: "NO ROLE FOUND" })
                }
                if(role.managed || role.name === '@everyone'){
                    return reject({ message: "Managed Role" })
                }
                return resolve(role)
            } else {
                let role = await this.message.guild?.roles.cache.get(key) ||
                await this.message.guild?.roles.cache.find(role=> role.name === key);
                if(!role){
                    return reject({ message: "NO ROLE FOUND" })
                };
                if(role.managed || role.name === '@everyone'){
                    return reject({ message: "Managed Role" })
                }
                return resolve(role)
            }
        })
    }
}