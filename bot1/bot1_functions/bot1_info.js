console.log("script info runs");

const { MessageEmbed } = require('discord.js');

//get server informations
async function getServerInfo(msg){
    let rolemap = msg.guild.roles.cache
    .sort((a, b) => b.position - a.position)
    .map(r => r)
    .join(",");
    if (rolemap.length > 1024) rolemap = "To many roles to display";
    if (!rolemap) rolemap = "No roles";
    const embedINFO = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`Das hier ist die Servinfo von Swaug-Central!`)
        .setURL('https://mee6.xyz/leaderboard/390614129552916480/')
        .setAuthor(msg.guild.name, msg.guild.iconURL(), 'https://mee6.xyz/leaderboard/390614129552916480')
        .setThumbnail(msg.guild.iconURL())
        .addFields(
            { name: 'Servername:', value: `${msg.guild.name}` },
            { name: 'Membercount:', value: `${msg.guild.memberCount}` },
            { name: 'Server Roles:', value: `${rolemap}`, inline: true },
            { name: 'Server ID:', value: `${msg.guild.id}`, inline: true },
        )
        .setTimestamp()
        .setFooter('',msg.author.avatarURL());
        msg.channel.send({ embeds: [embedINFO] });
}

//get user informations
async function getUserInfo(msg){
    let id;
    let avatar
    const mentionedUser = msg.mentions
        if (mentionedUser.users.size < 1) {
            id = msg.guild.members.cache.get(msg.author.id.toString())
            avatar = msg.author.avatarURL()
        }else{
            id = msg.mentions.members.first()
            avatar = msg.mentions.members.first().user.avatarURL()
        }

        let roles = id._roles

        let new_roles = []
        for (let i = 0; i < roles.length; i++) {
            new_roles.push("<@&" + roles[i] + ">")
        }

        let dateT;
        convert(id.id)
        const exampleEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Usercard von ' + `${id.user.username}`)
        .setURL('https://mee6.xyz/leaderboard/390614129552916480/')
        .setAuthor(msg.member.user.tag, msg.guild.iconURL(), 'https://mee6.xyz/leaderboard/390614129552916480')
        .setThumbnail(avatar)
        .addFields(
            { name: 'Username', value: `${id.user.username}` },
            { name: 'Account Created:', value: `${dateT}` },
            { name: 'Roles', value: `${new_roles}`, inline: true },
            { name: 'ID', value: `${id.id}`, inline: true },
        )
        .setTimestamp()
        .setFooter('Footer',avatar);
        msg.channel.send({ embeds: [exampleEmbed] });

        convert(id.id)
        function convertIDtoUnix(id) {
            var bin = (+id).toString(2);
            var unixbin = '';
            var unix = '';
            var m = 64 - bin.length;   
            unixbin = bin.substring(0, 42-m);
            unix = parseInt(unixbin, 2) + 1420070400000;
            return unix;
        }
        
        function convert(id) {
            var unix = convertIDtoUnix(id.toString());
           var date=new Date(unix);
           day=date.getDate();
           month=date.getMonth();
           month=month+1;
           if((String(day)).length==1)
           day='0'+day;
           if((String(month)).length==1)
           month='0'+month;
       
           dateT = day+ '.' + month + '.' + date.getFullYear();
        }
}

module.exports = {
    getServerInfo,
    getUserInfo
}