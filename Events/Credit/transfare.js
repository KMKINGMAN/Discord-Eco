module.exports = {
    name: "CreditSent",
    run: async(user1, user2, data, data2, amount)=> {
        user1.send(`**You Have Transfare ${amount} to ${user2.username}**`).catch(e => {0})
        user2.send(`**You Have reseve ${amount} from ${user1.username}**`).catch(e => {0})
    }
}