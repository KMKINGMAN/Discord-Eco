import { EventsTyper } from "../../lib/handler/events";
export let events = {
    name: "ready",
    async run(client){
        console.log(
            client.package.chalk.green(
                client.package.figlet.textSync(`KINGMAN`)
            ),
            client.package.chalk.green(`[DONE] Connected to ${client.user?.username}#${client.user?.discriminator}(${client.user?.id})`)
        )
        client.package.mongo.connect(client.config.mongo_db)
        .then(()=> {
            console.log(
                client.package.chalk.green(
                    client.package.figlet.textSync("KMCODES DB")
                )
            )
        })
        .catch(()=> {
            console.log(
                client.package.chalk.red(
                    client.package.figlet.textSync("NO DB")
                ),
                client.package.chalk.red(`[ERROR] Faild to connect to the Database`)
            )
        })
    }
} as EventsTyper;