module.exports = {
    //add stuff here
    name : "initialize",
    description: "initialize the rolekiller bot by adding necessary roles",
    execute(message,args){
        if (args[0] == 'desc'){
            message.channel.send(module.exports.description)
        } else {
            createRoles()
            async function createRoles(){
            //so we have to create a high role, a HEXTESTER role, CSGO, admin, imabadboy
                if (!message.guild.roles.cache.find(r=>r.name =='CSGO')){
                    let csgo = await message.guild.roles.create({ data:{name: 'CSGO', color:'0'}})//lowest
                    await csgo.setPosition(1)
                }
                if (!message.guild.roles.cache.find(r=>r.name =='High')){
                    let high = await message.guild.roles.create({ data:{name: 'High', color:'0'}})
                    await high.setPosition(2)
                    await high.setPermissions('ADMINISTRATOR')
                }
                if (!message.guild.roles.cache.find(r=>r.name =='HEXTESTER')){
                    let hextester = await message.guild.roles.create({ data:{name: 'HEXTESTER', color:'0'}})
                    await hextester.setPosition(3)
                }
                if (!message.guild.roles.cache.find(r=>r.name =='admin')){
                    let admin = await message.guild.roles.create({ data:{name: 'admin', color:'0'}})
                    await admin.setPosition(4)
                    await admin.setPermissions('ADMINISTRATOR')
                }
                if (!message.guild.roles.cache.find(r=>r.name =='imabadboy')){
                    let imabadboy = await message.guild.roles.create({ data:{name: 'imabadboy', color:'0'}})
                    await imabadboy.setPosition(5)
                }
                message.channel.send('do command (-help desc) to understand the help command and see command list. Use desc in order to see the description and usage of each command')
            }
        }
    }
}