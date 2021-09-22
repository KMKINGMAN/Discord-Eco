module.exports = {
    name: "DailyReseve",
    run: async(user, amount, data)=>{
        console.log(user, amount, data)
        try{
            user.send(`**You Have Recive ${amount} from Daily**`)
        }catch{
            return
        }
    }
}