import { KMCODES } from "../kingman";

export let Eco_ = (client: KMCODES) => {
    return client.package.mongo.model("Users Credits", new client.package.mongo.Schema({
        user_id: {
          type: String,
          required: true  
        },
        credit: {
            type: Number,
            default: 0
        },
        last_daily: {
            type: Number,
            default: 0
        },
        transfere: [{
            to: String,
            amout: Number
        }],
        receive: [{
            from: String,
            amout: Number
        }]
    }))
}