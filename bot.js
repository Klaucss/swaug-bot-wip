const Discord = require('discord.js');
const music = require('@koenie06/discord.js-music');
const { MessageEmbed } = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES","GUILD_VOICE_STATES"] })
const auth = require('./auth.json');

client.on('ready', () => {
console.log(`Logged in as ${client.user.tag}!`);
});

client.login(auth.token);

let prefix = "."

client.once("ready", () => {
  console.log("Ready!");
});

client.once("reconnecting", () => {
  console.log("Reconnecting!");
});

client.once("disconnect", () => {
  console.log("Disconnect!");
});

// client.on messageCreate is a listener for the "prefix" + play argument from a chat input, it runs the function after the specific thing had been said in the channel
// music.play is a node module that creates a audio stream with the message interaction (short = msg)
client.on("messageCreate", msg => {
  if (msg.content.toLowerCase().startsWith(prefix + "play")) {
         const channel = msg.member.voice.channel;
         const song = msg.content.split(" ")[1];

         music.play({
             interaction: msg,
             channel: channel,
             song: song
         });
      };
});
// music.stop is a node module that deletes the current playing audio stream with the message interaction (short = msg)
client.on("messageCreate", msg => { if (msg.content.toLowerCase().startsWith(prefix + "stop")) music.stop({ interaction: msg })});  




client.on("messageCreate", msg => {
    let insertedNumber = msg.content.substr(7,8);
    if (msg.content.toLowerCase().startsWith(prefix + "prune")) {
        if(insertedNumber <= 0 || insertedNumber >= 100) {
            msg.channel.send('Range nur erlaubt zwischen 1-99.')
        }else{
            async function clear() {
                msg.delete();
                console.log(insertedNumber);
                const fetched = await msg.channel.messages.fetch({limit: insertedNumber});
                msg.channel.bulkDelete(fetched);
            } 
            clear();   
        }
    }
});




client.on('messageCreate', async (message) => {
    if (message.content.startsWith(prefix + "info")){
        
        let rolemap = message.guild.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(r => r)
        .join(",");
        if (rolemap.length > 1024) rolemap = "To many roles to display";
        if (!rolemap) rolemap = "No roles";
        console.log([message.guild.roles.cache]);
      const embedINFO = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Das hier ist die Servinfo von Swaug-Central!`)
            .setURL('https://mee6.xyz/leaderboard/390614129552916480/')
            .setAuthor(message.guild.name, message.guild.iconURL(), 'https://mee6.xyz/leaderboard/390614129552916480')
            .setThumbnail(message.guild.iconURL())
            .addFields(
                { name: 'Servername:', value: `${message.guild.name}` },
                { name: 'Membercount:', value: `${message.guild.memberCount}` },
                { name: 'Server Roles:', value: `${rolemap}`, inline: true },
                { name: 'Server ID:', value: `${message.guild.id}`, inline: true },
            )
            .setTimestamp()
            .setFooter('',message.author.avatarURL());
            message.channel.send({ embeds: [embedINFO] });
    }

    if (message.content.includes(prefix + "me")){

            let id = message.guild.members.cache.get(message.author.id.toString())

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
            .setAuthor(message.member.user.tag, message.guild.iconURL(), 'https://mee6.xyz/leaderboard/390614129552916480')
            .setThumbnail(message.author.avatarURL())
            .addFields(
                { name: 'Username', value: `${id.user.username}` },
                { name: 'Account Created:', value: `${dateT}` },
                { name: 'Roles', value: `${new_roles}`, inline: true },
                { name: 'ID', value: `${id.id}`, inline: true },
            )
            .setTimestamp()
            .setFooter('Footer',message.author.avatarURL());
            message.channel.send({ embeds: [exampleEmbed] });

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
    });
