const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const plrs = JSON.parse(fs.readFileSync('plr.json', 'utf8'));
console.log('Loading...')


client.on('ready', () => {
  console.log('Bot loaded, bot is ready.');
  client.user.setPresence({game:{name:`Type ${prefix}help for cmds`,type:0}});
});

client.on("guildMemberAdd", (member) => { 
    const plr2 = plrs[member.id];
    const logs = member.guild.channels.find('name', 'logs');
    if (plr2 === undefined) {
        if (logs) {
            var embed = new Discord.RichEmbed()
            .setColor(123456)
            .setTitle("A new user has joined the server")
            .addField("Name", `${member.user.username}`, true)
            .addField("ID", `${member.user.id}`, true)
            .setTimestamp()
            logs.send({embed});
    }} else {
       if (logs) {
        var embed = new Discord.RichEmbed()
        .setColor(123456)
        .setTitle("An existing user has joined the server")
        .addField("Name", `${plr2.name}`, true)
        .addField("ID", `${member.user.id}`, true)
        .setTimestamp()
        logs.send({embed});
    }}
});

client.on("guildMemberRemove", (member) => {
    const plr2 = plrs[member.id]
    const logs = member.guild.channels.find("name", 'logs');
    if (plr2 === undefined) {
        if (logs) {
            var embed = new Discord.RichEmbed()
            .setColor("ff0000")
            .setTitle("An unlogged user has left the server")
            .addField("Name", `${member.user.username}`, true)
            .addField("ID", `${member.user.id}`, true)
            .setTimestamp()
            logs.send({embed});
        }} else {
            if (logs) {
                var embed = new Discord.RichEmbed()
                .setColor("ff0000")
                .setTitle("A logged user has left the server")
                .addField("Name", `${plr2.name}`, true)
                .addField("ID", `${member.user.id}`, true) 
                .setTimestamp()
                logs.send({embed});
        }}
});

let prefix = ".";

client.on('message', message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
 
  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);
  let args = message.content.split(" ").slice(1);
if (command === "help") {
    if (message.channel.type === "dm") {
        return;
    }
    let HR = message.guild.roles.find("name", "[HR] Colonel")
    if (message.member.highestRole.position >= HR.position) {
        var embed = new Discord.RichEmbed()
        .setColor(123456)
        .setTitle("My commands are")
        .setDescription(`${prefix}help\n${prefix}warinfo\n${prefix}profile\n${prefix}mute\n${prefix}unmute\n${prefix}warn\n${prefix}purge`) 
        } else {
            var embed = new Discord.RichEmbed()
            .setColor(123456)
            .setTitle("My commands are")
            .setDescription(`${prefix}help\n${prefix}warinfo\n${prefix}profile`)
        }
    message.author.send({embed});
    message.reply("Help has been sent to your DMs. If you haven't received any messages go to User Settings > Privacy & Safety and turn on `Allow DMs from server members`.")
} else

if (command === "warinfo") {
    if (message.channel.type === "dm") {
        return;
    }
    var embed = new Discord.RichEmbed()
    .setColor(123456)
    .addField("Wars Won", "0", true)
    .addField("War Ties", "0", true)
    .addField("Wars Lost", "0", true)
    message.channel.send({embed});
} else

if (command === "profile") {
    if (message.channel.type === "dm") {
        return;
    }
    const plr = plrs[message.author.id];
    if (plr === undefined) {
     message.reply("```You are not in my database, you need to attend at least 1 training to be registered into my database.```")     
} else {
   message.channel.send({embed : {
       color: 123456,
       thumbnail: {
        url: plr.thumbnail,
        },
       fields: [{
           name: "Name",
           value: plr.name,
           },
           {
            name: "Points",
            value: plr.points,
           },
           {
            name: "Trust",
            value: plr.trust,
           },
           {
            name: "Rank",
            value: plr.rank,
           },
           ],
           footer: {
            icon_url: client.user.avatarURL,
            text: "Created by Jim2AC"
            }
        }});
    }
} else

if (command === "prefix") {
    if (message.author.id === "296996377081413633") {
        prefix = (args.join(" "));
        message.channel.send(`The new prefix is `+"`"+`${prefix}`+"`")
        client.user.setPresence({game:{name:`Type ${prefix}help for cmds`,type:0}});
}} else

if (command === "mute") {
    if (message.channel.type === "dm") {
        return;
    }
    let HR = message.guild.roles.find("name", "[HR] Colonel")
    if (message.member.highestRole.position < HR.position) {
    return message.reply("Admin only command.");
}
let mutedmember = message.mentions.members.first();
if (!mutedmember) {
    return message.reply("Please mention a valid user.");
}
let muted = message.guild.roles.find("name", "Muted")
if (mutedmember.roles.has(muted.id)) {
    return message.reply("This person already has the muted role.");
}
if (message.member.highestRole.position <= mutedmember.highestRole.position) {
    return message.reply("The person who you are trying to mute has a bigger role than you do.");
}
let m = mutedmember.roles
if (m.size > 2) {
mutedmember.removeRoles(m)
somethinglel()
} else {
if (m.size === 2) {
mutedmember.removeRole(mutedmember.highestRole.id)
somethinglel()
} else {
somethinglel()
}}
function somethinglel () {
mutedmember.addRole(muted.id)
message.channel.send(`${mutedmember.user} has been successfully muted.`)
const logs = message.guild.channels.find("name", "logs")
    if (logs) {
        var embed = new Discord.RichEmbed()
        .setColor("5a1475")
        .setTitle("A user has been muted")
        .addField("Name", `${mutedmember.user.username}`)
        .addField("ID", `${mutedmember.user.id}`)
        .addField("MName", `${message.author.username}`)
        .addField("MID", `${message.author.id}`)
        .setTimestamp()
        logs.send({embed});
}}
} else

if (command === "unmute") {
    if (message.channel.type === "dm") {
        return;
    }
    let HR = message.guild.roles.find("name", "[HR] Colonel")
    if (message.member.highestRole.position < HR.position) {
    return message.reply("Admin only command.");
    }
    let mutedmember = message.mentions.members.first();
    if (!mutedmember) {
    return message.reply("Please mention a valid user.");
    }
    let muted = message.guild.roles.find("name", "Muted")
    if (!mutedmember.roles.has(muted.id)) {
    return message.reply("The person you're trying to unmute doesn't have the muted role.");
    }
    mutedmember.removeRole(muted.id)
    message.channel.send(`${mutedmember.user} has been successfully unmuted.`)
    const logs = message.guild.channels.find("name", "logs")
    if (logs) {
        var embed = new Discord.RichEmbed()
        .setColor("0e7e99")
        .setTitle("A user has been unmuted")
        .addField("Name", `${mutedmember.user.username}`)
        .addField("ID", `${mutedmember.user.id}`)
        .addField("UName", `${message.author.username}`)
        .addField("UID", `${message.author.id}`)
        .setTimestamp()
        logs.send({embed});
}
} else

if (command === "warn") {
    if (message.channel.type === "dm") {
        return;
    }
    let HR = message.guild.roles.find("name", "[HR] Colonel")
    if (message.member.highestRole.position < HR.position) {
    return message.reply("Admin only command.");
    }
    let warnedmember = message.mentions.members.first();
    if (!warnedmember) {
    return message.reply("Please mention a valid user.");
    }
    let reason = args.slice(1).join(' ');
    if (reason.length === 0) {
    return message.reply("Please add a reason.");
    }
    var embed = new Discord.RichEmbed()
    .setColor("ff0000")
    .setTitle("You have been warned in the server Exuberant Assassins")
    .addField("Reason", `${reason}`, true)
    warnedmember.send({embed}).catch(console.error);
    message.channel.send(`${warnedmember.user} has been warned for ` + "`" + `${reason}`+"`.")
} else

if (command === "purge") {
    if (message.channel.type === "dm") {
        return;
    }
    async function purge() {
        let HR = message.guild.roles.find("name", "[HR] Colonel")
        if (message.member.highestRole.position < HR.position) {
        return message.reply("Admin only command.");
        }
        if (isNaN(args[0])) {
            return message.channel.send("Please provide a number.");
         } 
        await message.delete()
         let p = parseInt(args[0])
            const fetched = await message.channel.fetchMessages({limit : p});
            message.channel.bulkDelete(fetched).catch(error => message.reply(`Couldn't delete messages because : ${error}`));
        }
        purge()
        }
});

client.login(process.env.BOT_TOKEN);
