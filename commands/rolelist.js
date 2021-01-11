module.exports = {
    name : "rolelist",
    description: "shows you a list of rolenames",
    execute(message,args){
        let rowNames = ""
        let count = 0
        let rolelist = []
        //cycle through every role
        message.guild.roles.cache.forEach(role => {
            //do not display bot roles or admin roles, do not display everyone role
            if(role.position < message.guild.roles.cache.get('786408778504339477').position && role.name != '@everyone'){
                //create a string of roles names (will be displayed on the same line)
                rowNames += `${role.name}, `
                count ++
                //when string of role names becomes 4 roles, add to array of list of roles, clear rowNames
                if (count > 3){
                    count = 0
                    rolelist.push(rowNames)
                    rowNames = ''
                }
            }
        })
        //make sure to add leftover rowNames to the role list
        rolelist.push(rowNames)
        //output rolelist
        message.channel.send('roles are:')
        message.channel.send(rolelist)
    }
}