import { readdirSync } from "fs";
import { ClientEvents } from "discord.js";
import { KMCODES } from "../kingman";
interface EventsTyper {
    name: keyof ClientEvents,
    run: (client: KMCODES, ...args: any[]) => void
}
let load = (client : KMCODES): void =>{
    client.package.fs.readdirSync("./src/events").forEach(folder=>{
        client.package.fs.readdirSync(`./src/events/${folder}`).filter(f=> f.endsWith(".ts")).forEach(async(file)=>{
            let event = (await import(`../../events/${folder}/${file}`)).events as EventsTyper;
            if(event.name){
                client.on(event.name, async(...args)=> event.run(client, ...args))
            }
        })
    })
}
export { load, EventsTyper }