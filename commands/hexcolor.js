module.exports = {
    name : "hexcolor",
    description: "show hexcolors either a list or specific color. command is issued in form (-hexcolors list) or (-hexcolors color) the way hexadecimal works is that it contains 6 digits with 2 digits assigned to an rgb value . 2 digits in hexadecimal allows for 16*16 values from 0 - 255 inclusive",
    execute(message,args, Discord){
        let colors = [{name:'red', code:'#FF0000'}, {name:'blue',code:'#0000FF'}, {name:'green', code:'#00FF00'}, {name:'yellow',code:'#FFFF00'},{name:'purple',code:'#FF00FF'},{name:'cyan',code:'#00FFFF'}, {name:'brown', code:'#4B8513'}, {name:'black',code:"#000000"}, {name:'white',code:'#FFFFFF'}, {name:'gold',code:'#FFD700'}, {name:'pink',code:'#FFC0CB'}, {name:'valorant',code:'#FB4353'}, {name:'league', code:'#268D9A'}, {name:'lavender',code:'#938EC8'}, {name:'apex',code:'#8B3233'}, {name:'genshin', code:'#FEFEF4'} ]
        if (args.length >=1) {
            if (args[0]=="desc"){
                message.channel.send(module.exports.description)
            } else if (args[0]== 'list') {
                let colorRow = ""
                let count = 0
                let colorsList = []
                    //create a string of roles names (will be displayed on the same line)
                    for (let i = 0; i < colors.length; i ++){
                        colorRow += `${colors[i].name}/${colors[i].code}, `
                        count ++
                        //when string of role names becomes 4 roles, add to array of list of roles, clear rowNames
                        if (count > 3){
                            count = 0
                            colorsList.push(colorRow)
                            colorRow = ''
                        }
                    }
                colorsList.push(colorRow)
                message.channel.send(colorsList)
            } else if (args[0]== 'display' && args.length > 1){
                display()
            } else {
                let name = args[0].toLowerCase()
                let code = ""
                for (let i = 0; i < colors.length; i ++){
                    if (colors[i].name == name){
                        code = colors[i].code
                    }
                }
                if (code != "") {
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`the code of color ${args[0]} is ${code}`)
                        .setColor(code)
                    message.channel.send(embed)
                } else {
                    message.channel.send('could not find specified color, please message devs to have your color added to the hexcolors list')
                }
            }
        } else {
            message.channel.send('not enough arguments')
        }

        async function display() {
            let colorTester = await message.guild.roles.cache.find(r => r.name == 'HEXTESTER')
            let valid = true
            await colorTester.setColor(args[1]).catch(()=>{
                message.channel.send(`that's an invalid color hexcode!`)
                valid = false
            })
            if (valid) {
                const embed1 = new Discord.MessageEmbed()
                    .setColor(args[1])
                    
                message.channel.send(embed1)
            }
        }
    }
}