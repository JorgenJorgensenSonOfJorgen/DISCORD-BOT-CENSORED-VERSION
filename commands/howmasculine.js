module.exports = {
    name : "howmasculine",
    description: "calculates through machine learning how masculine one is",
    execute(message,args){
        if (args[0]=="desc"){
            message.channel.send(module.exports.description)
        }else{
            let percent = Math.floor(Math.random() *101)
            let subject = ""
            for (let i = 0; i < args.length; i ++) {
                if (i == args.length - 1){
                    subject += args[i]
                } else {
                    subject += args[i] + " "
                }
            }
            if (args.length == 0){
                subject = message.member.user.username
            }
            //output
            message.channel.send(subject + " is " + percent + "% masculine.")
        }
    } 
}