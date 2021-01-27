let lobbies = []
module.exports = {
    name : "duel",
    description: "duel a friend by @ing them in the command",
    var: lobbies,
    execute(message,args,client){
        console.log(message.mentions)
        //if no one is mentioned, do nothing
        if (message.mentions.members.first() == null){
            message.channel.send('go off en')
            return
        }
        let challengeAccept = false
        let member1 = message.member.id
        let member2 = message.mentions.members.first().id
        for (let i = 0; i < lobbies.length; i ++){
            //challenge is being accepted
            if (lobbies[i].challenged == member1 && lobbies[i].member == member2 && lobbies[i].channel == message.channel.id) {
                challengeAccept = true
                lobbies[i].start = true
                message.channel.send('game has started, use the -fire command along with wind speed')
                setTimeout(()=> {
                    for (let i = 0; i < lobbies.length; i ++) {
                        //member1 has been challenged, he has specified who challenged him
                        if (lobbies[i].member == member2 && lobbies[i].challenged == member1 && lobbies[i].channel == message.channel.id) {
                            message.channel.send(`"it's high noon, the wind is traveling at ${lobbies[i].headshot}km/h"`)
                            lobbies[i].canShoot = true
                            let d = new Date();
                            lobbies[i].time = d.getTime()
                            break
                        }
                    }
                    setTimeout(() => {
                        for (let i =0 ; i< lobbies.length; i ++){
                            if (lobbies[i].member == member2 && lobbies[i].challenged == member1 && lobbies[i].channel == message.channel.id) {
                                message.channel.send('the two rangers were boomers who either cant react or cant hit anything')
                                //end the lobby
                                lobbies.splice(i,1)
                                break
                            }
                        }
                    },10000)
                }, randInt(20000))
            //if guy has already challenged someone, make sure he cannot issue another challenge (can still accept challenges)
            } else if (lobbies[i].member == member1){
                challengeAccept = true
            }
            break
        }
        //challenge is being issued, add  lobby restriction???? how to
        if (challengeAccept == false) {
            let d = new Date();
            lobbies.push({member:member1, challenged: member2, start:false, canShoot : false, headshot : randInt(9), time: d.getTime(),channel:message.channel.id})
            message.channel.send('duel request sent')
            setTimeout(() => {
                for (let i = 0; i < lobbies.length; i ++){
                    if (lobbies[i].member == member1 && lobbies[i].challenged == member2 && lobbies[i].start == false) {
                        lobbies.splice(i,1)
                        message.channel.send('opponent never showed up')
                        break
                    }
                }
            }, 30000)
        }
    }
}
function randInt(max){
    return Math.floor(Math.random() * max + 1)
}