const colors = require("colors"),
mongoose = require('mongoose'),
discord = require("discord.js");;
require("dotenv").config();
const MONGO_DDB = process.env["KM_MONGO"]
module.exports = {
	name: 'ready',
    run: async(client) => {
    mongoose.connect(MONGO_DDB).then(
      console.log(`
_______________________________
[✅]==> Mongo-DB Connection is OK 
_______________________________
    `.brightGreen)
    ).catch(e =>{
      console.log("MongoDB Connection Error".red)
      client.destroy()
    })
  }
}