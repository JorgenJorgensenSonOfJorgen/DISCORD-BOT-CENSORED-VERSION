
const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = "-"

const fs = require('fs')

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name,command)
}
client.once('ready', () => {
    console.log('Online');
});
client.on('message', message =>{
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
        //ping yik gay
    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);
        //kill target
    } else if (command === 'kill'){
        client.commands.get('kill').execute(message, args);
        //giveadmin or punish for lying
    } else if (command === 'iamagoodboy'){
        client.commands.get('giveadmin').execute(message, args);
        //role command
    } else if(command === 'role') {
        client.commands.get('role').execute(message, args);
        //ban instantly
    } else if (command ==='braydenisstupid') {
        client.commands.get('ban').execute(message, args);
        //howgay
    } else if (command ==='howmasculine') {
        client.commands.get('howmasculine').execute(message, args);
        //help
    } else if (command === 'help') {
        client.commands.get('help').execute(message, args);
        //create and delete roles
    } else if (command === 'rolemaster') {
        client.commands.get('rolemaster').execute(message, args,Discord);
        client.commands.get('roleedit').execute(message, ['endmaster'], Discord, args);
        //show list of hexcolors
    } else if (command === 'hexcolor') {
        client.commands.get('hexcolor').execute(message, args, Discord);
        //editrole
    }else if (command === 'roleedit') {
        client.commands.get('roleedit').execute(message, args, Discord);
        //how many triangles
    }else if (command === 'triangle') {
        client.commands.get('triangle').execute(message, args);
        //give prinicple angle
    } else if (command == 'principle'){
        client.commands.get('principle').execute(message, args);
        //get a list of server roles
    } else if (command == 'rolelist'){
        client.commands.get('rolelist').execute(message, args);
        //random test command
    }else if (command == 'test'){
        client.commands.get('test').execute(message, args);
    } else if (command == `initialize`) {
        client.commands.get('initialize').execute(message, args);
    } else if (command == 'yikhei'){
        client.commands.get('yikhei').execute(message, args);
    } else if (command == 'swear'){
        client.commands.get('swear').execute(message, args);
    }
});










client.login('Nzg1OTE5ODMzNzg3MjAzNjI0.X8-24g.MP4LPUM_hVlNl7gY0UZD5xHYMxc')
