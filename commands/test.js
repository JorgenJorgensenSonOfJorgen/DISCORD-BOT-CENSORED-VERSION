module.exports = {
    name : "test",
    description: "this is a test command that musnt see the light of day",
    execute(message,args){
        message.member.ban({reason: 'fuck off'}).then(() => {message.reply(`banned ${message.author.tag}`)})
    }
}

