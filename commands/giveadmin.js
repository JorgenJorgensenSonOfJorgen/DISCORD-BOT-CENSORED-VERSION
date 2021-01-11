module.exports = {
    name : "giveadmin",
    description: "give admin",
    execute(message,args){
        //global variable
        let guildRoles = message.guild.roles.cache
        //required role for success (insert desired role name)
        let csgoRole = guildRoles.find(r =>r.name == "CSGO")
        //insert desired admin role name
        let adminRole = guildRoles.find(r=>r.name == 'admin')
        //insert desired punish role name
        let punishRole = guildRoles.find(r=>r.name =='imabadboy')
        if (message.member.roles.cache.has(csgoRole.id)){
        //GIVE ADMIN
            message.member.roles.add(adminRole.id)
        //GIVE NOT ADMIN BUT PUNISHMENT ROLE
        } else {
            message.member.roles.add(punishRole.id)
        }
    }
}