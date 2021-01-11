module.exports = {
    name : "rolemaster",
    description: "create and delete roles. command format is (-rolemaster preexistingrole) if you want to delete a preexisting role or (-rolemaster rolename #colorhexcode) to create a new role",
    execute(message,args, Discord){
        if(args[0]=='desc'){
            message.channel.send(module.exports.description)
        }else {
            //define role based on args
            let roleName = ""
            let rColor;
            //create roleName
            for (let i = 0; i < args.length; i ++){
                if (i == args.length - 1){
                    roleName += args[i]
                } else {
                    roleName += args[i] + " "
                }
            }
                if(args[args.length-1].startsWith('#')){
                    rColor = args[args.length-1]
                    roleName = roleName.replace(`${rColor}`, '')
                    roleName.slice(0,-1)
                }
            if (message.member.permissions.has('ADMINISTRATOR')) {
                if (message.guild.roles.cache.find(r=>r.name == roleName)){
                    let role = message.guild.roles.cache.find(r=>r.name == roleName)
                    if (role.permissions.has("ADMINISTRATOR") || role.name == 'imabadboy'){
                        message.reply("cannot delete admin role")
                    }else {
                        role.delete()
                        message.channel.send(`Deleted role: ${roleName}`)
                    }
                } else {
                    if (!rColor){
                        message.reply(" You did not set a color with a #")
                    }
                    if (roleName == ""){
                        message.reply(" You did not set a role name")
                    }
                    if (roleName != ""&& rColor){
                        createRole()
                        async function createRole(){
                            let role = await message.guild.roles.create({ data:{name: roleName, color:rColor}})
                            await change(role)
                            const embed = new Discord.MessageEmbed()
                                .setColor(rColor)
                                .setTitle('rolemaster')
                                .setAuthor('Brayden Zheng')
                                .setDescription(`Created Role: ${role.name}`)
                            message.channel.send(embed)
                        }
                    }
                }
                async function change(role){
                    await role.setHoist(true)
                    role.setMentionable(true)
                }
            } else {
                message.reply("you do not have permission to use this command! LOL")
            }
        }
    }
}
