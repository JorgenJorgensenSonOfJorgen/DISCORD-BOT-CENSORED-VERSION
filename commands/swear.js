module.exports = {
    name : "swear",
    description: "censors",
    async execute(message,args){
        await message.member.voice.setMute(true, 'swearbear - muted for 3 mins')
        message.channel.send(`NO SWEARINNNGGGG <@!${message.member.id}>`)
        setTimeout(async ()=> {
            await message.member.voice.setMute(false)
            message.channel.send(`you have been unmuted <@!${message.member.id}>`)
        }, 180000)
    }
}