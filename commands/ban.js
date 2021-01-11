module.exports = {
    name : "ban",
    description: "ban those fools",
    execute(message,args){
        message.member.kick({reason: 'lying is bad'}).then(() => {message.reply(`kicked the liar ${message.author.tag}`)})
    }
}