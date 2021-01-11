module.exports = {
    name : "kill",
    description: "kills target (or self by default) with a random method",
    execute(message,args){
        if (args[0]=="desc"){
            message.channel.send(module.exports.description)
        }else {
            let target = ""
            for (let i = 0; i < args.length; i ++){
                if (i == args.length - 1){
                    target += args[i]
                } else {
                    target += args[i] + " "
                }
            }
            if (args.length ==0){
                target = message.member.user.username
            }
            let randKill = [" was locked away in Eric's basement and never seen again.",  " was killed in an unfair aim duel", " was accused of conspiring against the revolution and put to the guillotine. He lived for 8 seconds after his head was cut off.", "'s parents were killed by a time traveler.",  " told a lie a blatant lie about Brayden's intelligence and . . .", " woke up from his 20 year long coma.", " tried out for the real life counter-strike team.", " was tried at the Nuremberg Trials and hanged for his crimes against humanity."]
            //output
            message.channel.send(target + randKill[Math.floor(Math.random() * (randKill.length))])
        }
    }
}
