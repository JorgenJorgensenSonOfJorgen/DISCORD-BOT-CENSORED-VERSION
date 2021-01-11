let original = []
module.exports = {
    name : "roleedit",
    description: "to begin the roleedit process choose a preexisting role and insert it into the command as such: (-roleedit role)",
    execute(message,args, Discord, masterArgs){
        //if -role desc is typed, show role desc
        let member = message.member.id
        let guild = message.guild.id
        let index;
        let count = 0
        for (let i =0; i < original.length;i++){
            if (original[i].member != member || original[i].guild != guild) {
                count ++
            } else {
                index = i
            }
        }
        if (args[0]=="desc"){
            message.channel.send(module.exports.description)
        } else if (args[0]=="end"){
            //end roleedit phase 2
            end()
            //otherwise begin the roleedit sequence
        } else if (args[0] == 'endmaster' && String(masterArgs) != 'undefined') {
            endmaster(masterArgs)
        }else if (message.member.permissions.has(`ADMINISTRATOR`)){
            //define a list of permissions that are inherent to admin
            const adminList = ['KICK_MEMBERS', 'BAN_MEMBERS', 'MANAGE_CHANNELS', 'MANAGE_GUILD','PRIORITY_SPEAKER','SEND_TTS_MESSAGES','MANAGE_MESSAGES','MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MANAGE_NICKNAMES', 'MOVE_MEMBERS', 'MANAGE_ROLES','MANAGE_WEBHOOKS','MANAGE_EMOJIS']
            //if rename is blank, begin phase 1 of roleedit (role selection)
            //there are no such members in such guilds
            if (count == original.length){
                let reName = ''
                reName = createName(reName, 0)
                //reName is infact a name of an exisiting role, alert that role has been selected
                if(message.guild.roles.cache.find(r=>r.name == reName)){ 
                    //reName is set to subject role
                    reName = message.guild.roles.cache.find(r=>r.name == reName)
                    let d = new Date();
                    let time = d.getTime()
                    original.push({member: member, guild: guild, reName: reName, time: time})
                    message.reply(reName.name + " selected, repeat the command with your edit parameters in form (-roleedit addpermissions removepermissions #color adjustorder displaytoggle newname) permissions should be seperated by commas. use 0 to indicate no change (SHOULD HAVE 6 PARAMETERS) you can also use -roleedit mentionable to toggle mentionable" ).then(msg=>{
                        setTimeout(()=>{
                            for (let i =0; i <original.length; i ++){
                                if (original[i].member==member && original[i].guild == guild && original[i].time == time){
                                    original.splice(i,1)
                                    msg.delete()
                                    message.channel.send(`ended roleedit of ${message.member.user}`)
                                    return
                                }
                            }
                          }, 30000);
                    })
                } else {
                    message.channel.send("Such a lamo role does not exist in the kingdom of cool")
                }
            } else {
                let reName = original[index].reName
                if(args.length >= 6) {
                    editRole()
                    async function editRole(){
                        //set certain properties to certain argument indexes
                        let rColor = args[2]
                        let hoist = args[4].toLowerCase() == 'true'
                        let rName = ""
                        args[0] = args[0].toUpperCase()
                        args[1] = args[1].toUpperCase()
                        let pAdd = args[0].split(',')
                        let pRemove = args[1].split(',')
                        let orderAdjust = Math.round(Number(args[3]))
                        rName = await createName(rName, 5)
                        //for all properties, if argument is 0, do not change anything 
                        let disObj = {hoist: 0,color: reName.color,permissions: {removals:0, additions:0, newPermsList: 0},position: 0,names: {oldName:reName.name, newName:reName.name}}
                         if (args[4] != 0) {
                             //hoist is a boolean value which we set to the roles hoist property. We also alert of this change and catch any possible errors
                             //same idea for all properties
                             disObj.hoist = hoist
                            await reName.setHoist(hoist).catch(()=>{
                                disObj.hoist = `error . . . somehow`
                            })
                        } else {
                            disObj.hoist = reName.hoist
                        }
                        if (rColor != 0){
                            disObj.color = rColor
                            await reName.setColor(rColor).catch(()=> {
                                disObj.color =`Invalid color code range`
                            });
                        }
                        if (pAdd != 0 || pRemove != 0) {
                            //creates an object of information necessary to changing the role permissions
                            let permsInfo = await createPermsList(pAdd,pRemove)
                            disObj.permissions = permsInfo
                            //uses the permsInfo to create a string that will sent to the channel
                            await reName.setPermissions(permsInfo.newPermsList).catch(()=>{
                                disObj.permissions = {removals:'error', additions: 'error', newPermsList:'error'}
                            });
                        }
                        //checks to make sure that orderAdjust is a number
                        if (String(orderAdjust) != "NaN"){
                            //assigns newPos to a position value based on orderAdjust value and preset limitations
                            let newPos = await createPositionValue(orderAdjust)
                            disObj.position = newPos
                            await reName.setPosition(newPos).catch(() => {
                                disObj.position = `Invalid Position set`
                            });
                        } else {
                            disObj.position = `order adjust must be number value`
                        }
                        if (rName != 0){
                            let names = {oldName: reName.name, newName: rName}
                            disObj.names = names
                            await reName.setName(rName).catch(()=>{
                                disObj.names = {oldName: reName.name, newName: 'error'}
                            })
                        }
                        //if all args are 0 and rName is also just 0, alert that nothing has been changed
                        if(disObj.color !=rColor) {
                            rColor = reName.color
                        }
                        const embed = new Discord.MessageEmbed()
                        .setColor(rColor)
                        .setTitle(`ROLEEDIT OF ROLE ${disObj.names.oldName}`)
                        .addFields(
                            {name:'permissions:', value: `removals: ${disObj.permissions.removals}, additions: ${disObj.permissions.additions}, new perms: ${disObj.permissions.newPermsList}`},
                            {name:'position:', value: disObj.position},
                            {name:'hoist:', value: disObj.hoist},
                            {name:'color:', value: disObj.color},
                            {name:'name:', value: `changed name from ${disObj.names.oldName} to ${disObj.names.newName}`}
                        )
                        let count = 0
                        for (let i = 0; i <5 ; i++){
                            if (args[i] == 0){
                                count ++
                            }
                        }
                        if (count == 5 && rName == 0) {
                            message.channel.send('changed nothing')
                        } else {
                            message.channel.send(embed)
                        }
                        //reset back to phase 1
                        original.splice(index,1)
                    }

                    //PERMISSIONS FUNCTION

                    async function createPermsList(pAdd,pRemove) {

                        let removals = []
                        //create an array of the current permissions
                        let roleP = reName.permissions.toArray()

                        if (pAdd != 0){
                        //assigns roleP to a new permissions array where old roleP and pAdd have been combined whilst eliminating repititions
                        roleP = await addPermissions(pAdd,roleP)
                        } else {
                            //have to make sure pAdd is empty array with length of 0
                            pAdd = []
                        }
                        if (pRemove[0] != 0) {
                            
                            //if pRemove has administrator in it, add the adminList to pRemove
                            for(let i = 0; i < pRemove.length; i++){
                                if (pRemove[i] == "ADMINISTRATOR"){
                                    for (let i2 =0; i2<adminList.length;i2++){
                                        pRemove.push(adminList[i2])
                                    }
                                }
                            }
                            //begin removal process by checking if pRemove has the same permissions as roleP and removing all same permissions
                            for (let i = 0; i < roleP.length; i ++){
                                for (let i2 = 0; i2 < pRemove.length; i2 ++){
                                    if (roleP[i] == pRemove[i2]){
                                        //add all removed permissions to removals array
                                        removals.push(roleP.splice(i,1))
                                        i--
                                    }
                                }
                            }
                        }
                        //create object of info regarding the processes that occured in the function and the newPermsList
                        let permsInfo = {removals:removals, additions: pAdd, newPermsList:roleP}
                        return permsInfo   
                    }
                    //function adding permissions arrays together
                    function addPermissions(pAdd, roleP){
                        let newRoleP = []
                        for (let i = 0; i < roleP.length; i ++){
                            for (let i2 = 0; i2 < pAdd.length; i2 ++){
                                if (roleP[i] ==pAdd[i2]){
                                    pAdd.splice(i2,1)
                                    i2--
                                }
                            }
                        }
                        //add old roles and additional roles to newroles array
                        for (let i = 0; i < roleP.length; i ++){
                            newRoleP.push(roleP[i])
                        }
                        for (let i = 0; i < pAdd.length; i ++){
                            newRoleP.push(pAdd[i])
                        }
                        return newRoleP
                    }



                    //POSITION FUNCTION


                    async function createPositionValue(orderAdjust){
                        //assign old position value to a variable
                        let oldPos = reName.position
                        //add order Adjust to old position
                        let newPos = oldPos + orderAdjust
                        if (reName.permissions.has('ADMINISTRATOR')){
                            //if it is an admin role, cannot let newPos be greater than or equal to the bot's role
                            let bot = await message.member.guild.members.fetch('785919833787203624')
                            let botPos = bot.roles.highest.position
                            if (newPos >= botPos){
                                newPos = botPos -1
                            } else if ( newPos<1){
                                //cannot be 0 or below
                                newPos = 1
                            }
                            //if it is not an admin role, cannot be above set threshold dividing admins and scrubs
                        } else {
                            //max
                            let high = await message.guild.roles.cache.find(r => r.name == "High")
                            if (newPos >= high.position) {
                                newPos = high.position - 1
                            //min
                            } else if (newPos<1){
                                newPos = 1
                            }
                        }
                        return newPos
                    }


                    //MENTIONABLE EDIT


                }else if (args[0].toLowerCase()=='mentionable'){
                    setMentionable()
                    async function setMentionable(){
                        await reName.setMentionable(!reName.mentionable)
                        message.channel.send(`Mentionable is now set to ${reName.mentionable}. DISCLAIMER: you are still editing the role ${reName.name}`)
                    }
                    //arg 0 is not mentionable and less than 6
                }else{
                    //arguments.length is less that 6
                    message.channel.send('not enough parameters')
                    original.splice(index,1)
                }
            }
            //must be admin to roleedit
        } else {
            message.channel.send('LOL YOU HAVE NO PERMISSIONS LOL')
            if (String(index) != 'NaN'){
                original.splice(index,1)
            }
        }
        //resets roleedit command to phase 1
        function end(){
            if (count != original.length) {
                message.channel.send('roleedit has been ended')
                original.splice(index,1)
            }
        }
        async function endmaster(nameArgs){
            let countEnd = 0
            let masterName = ""
            for (let i =0; i < nameArgs.length; i ++){
                if (i == nameArgs.length - 1){
                    masterName += nameArgs[i]
                } else {
                    masterName += nameArgs[i] + " "
                }
            }
            if (message.guild.roles.cache.find(r=> r.name == masterName)) {
                let masterRole = message.guild.roles.cache.find(r=> r.name == masterName)
                for (let i =0; i <original.length ; i ++){
                    if (masterRole == original[i].reName && guild == original[i].guild){
                        original.splice(i,1)
                        countEnd ++
                    }
                }
                if (countEnd != 0){
                    message.channel.send(`ended ${countEnd} role edit processes`)
                }
            }
        }
        //general name creation function that takes in arguments regarding initial name and starting index of args
        function createName(rName, iStart) {
            for (let i = iStart; i < args.length; i ++){
                if (i == args.length - 1){
                    rName += args[i]
                } else {
                    rName += args[i] + " "
                }
            }
            return rName
        }
    }   
}
