module.exports = {
    name : "role",
    description: "assigns/removes role to self. Format is (-role ExistingRole) where ExistingRole is a role on the server and if you have existing role it is removed and if you dont have it, it is added to you.",
    execute(message,args){
        if (args[0]=="desc"){
            message.channel.send(module.exports.description)
        } else {
            //define role based on args
            let roleName = ""
            for (let i =0 ; i <args.length; i ++) {
                if (i == args.length - 1) {
                    roleName += args[i]
                } else {
                    roleName += args[i] + " "
                }
            }
            //make sure role is infact a role
            if (message.guild.roles.cache.find(r=>r.name == roleName)){
                //find role by name and assign to variable (roleName becomes obsolete)
                let role = message.guild.roles.cache.find(r=>r.name == roleName)
                //if role has administrator permission, do not give
                if (role.permissions.has("ADMINISTRATOR") || role.name == "imabadboy") {
                    message.reply("Cannot alter administrator role")
                //else if role is not haven, give role to member
                } else if (!message.member.roles.cache.has(role.id)){
                    message.member.roles.add(role)
                    message.reply(role.name +' role added')
                //else if role is haven, remove
                } else {
                    message.member.roles.remove(role)
                    message.reply(role.name + " role removed")
                }
            //role is not a role
            } else if (roleName == ""){
                message.reply("WARNING 1 OUT OF 2: YOU DID NOT SPECIFY A ROLE, REACHING MAXIMUM NUMBER OF WARNINGS WILL RESULT IN PERMANENT IP BAN")
            }else {
                message.reply("Such a lamo role does not exist in the kingdom of cool")
            }
        }
    }
}