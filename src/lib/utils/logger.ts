import { KMCODES } from "../kingman";

export let console_logger = (client: KMCODES) => {
    return {
        error : (text?: string) => {
            console.log(
                client.package.chalk.red(
                    `[ERROR] ${text??``}`
                )
            )
        },
        done: (text?: string) => {
            console.log(
                client.package.chalk.green(
                    `[DONE] ${text??``}`
                )
            )
        },
        warn: (text?: string) => {
            console.log(
                client.package.chalk.yellow(
                    `[WARN] ${text??``}`
                )
            )
        }
    }
}