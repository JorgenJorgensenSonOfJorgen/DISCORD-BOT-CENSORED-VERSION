module.exports = {
    name : "ping",
    description: "this is a ping command",
    execute(message,args){
        message.channel.send("I'm gonna put some dirt in your eye");
    }
}