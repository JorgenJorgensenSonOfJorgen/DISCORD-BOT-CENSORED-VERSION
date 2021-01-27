module.exports = {
    name : "help",
    description: "shows a list of commands",
    execute(message,args){
        let helpList1 = ["ping", "howmasculine",  'kill',  'principle','triangle', 'duel']
        let helpList2 = ['rolemaster', 'roleedit', 'hexcolors', 'rolelist', 'role', 'swear']
        let helplistlist = [helpList1, helpList2]
        if (args.length == 0){
            message.channel.send(helpList1)
        } else {
            let list = "no list"
            args[0] = Number(args[0])
            for (let i =0; i < helplistlist.length; i ++){
                if (args[0] - 1  == i) {
                    list = helplistlist[i]
                }
            }
            if (list == "no list"){
                message.channel.send('help ' + args[0] + ' is not a valid')
            } else {
                message.channel.send(list)
            }
        }
    }
}