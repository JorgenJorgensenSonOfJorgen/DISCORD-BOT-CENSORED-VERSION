module.exports = {
    name : "fire",
    description: "shoot people",
    execute(message,args,client){
        let lobbies = client.commands.get('duel').var
        let member = message.member.id
        let deadRole = message.guild.roles.cache.find(r => r.name == 'dead')
        for (let i =0; i < lobbies.length; i ++){
            if ((lobbies[i].member == member || lobbies[i].challenged == member) && lobbies[i].channel){
                if (lobbies[i].canShoot == true){
                    if(args[0] == lobbies[i].headshot) {
                        let d = new Date()
                        let time = d.getTime()- lobbies[i].time
                        //killed the challenger
                        if (lobbies[i].member != member) {
                            //member is dead, give dead role
                            message.guild.members.cache.get(lobbies[i].member).roles.add(deadRole)
                        //killed the challenged
                        } else {
                            //challenged is dead,, give dead role
                            message.guild.members.cache.get(lobbies[i].challenged).roles.add(deadRole)
                        }
                        message.channel.send(`<@${member}> shot his opponent dead in ${time} miliseconds. "and the ranger came one mornin' with the big iron on his hip"`)
                        lobbies.splice(i, 1)
                    } else {
                        message.channel.send('you missed you absolute donkey')
                    }
                } else {
                    message.channel.send(`<@${member}> forgot to use the cowboy reload and shot himself in the foot and died`)
                    lobbies.splice(i,1)
                    //give them the dead role
                }
                break
            }
        }
    }
}
