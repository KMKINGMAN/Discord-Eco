import { KMCODES } from "../kingman";
export let config = (client: KMCODES) => {
    client.package.dotenv.config();
    let config_file = client.package.efs.readJSONSync("./src/config.json", { throws: false });
    return {
        token: process.env.token ?? config_file.token,
        prefix: process.env.prefix ?? config_file.prefix,
        mongo_db: process.env.mongo ?? config_file.mongo,
        id: process.env.client_id ?? config_file.client_id
    }
}