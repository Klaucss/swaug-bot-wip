const Discord = require('discord.js');
const music = require('@koenie06/discord.js-music');
const { MessageEmbed } = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES","GUILD_VOICE_STATES", "GUILD_MEMBERS"] })
const auth = require('./auth.json');
const fs = require('fs')

//Starts the bot
module.exports = {}
client.login(auth.token);
client.on('ready', () => {console.log(`Logged in as ${client.user.tag}!`)});
client.once("reconnecting", () => {console.log("Reconnecting!")});
client.once("disconnect", () => {console.log("Disconnect!")});

//Global variables
let prefix = "."
let maikCounter = preLoad()

//Preloads the MaikCounter
function preLoad() {
        const fileName = './maik.json';
        const file = require(fileName);
        return file.maikCount
    }

// client.on messageCreate is a listener for the "prefix" + play argument from a chat input, it runs the function after the specific thing had been said in the channel
// music.play is a node module that creates a audio stream with the message interaction (short = msg)
client.on("messageCreate", msg => {
    if (msg.content.toLowerCase().startsWith(prefix + "play")) {
            const channel = msg.member.voice.channel;
            const song = msg.content.split(" ")[1];
            msg.channel.send('Searching...')
            music.play({
                interaction: msg,
                channel: channel,
                song: song
            });
            msg.channel.send('Playing...')
        };
    });

// music.stop is a node module that deletes the current playing audio stream with the message interaction (short = msg)
client.on("messageCreate", msg => { if (msg.content.toLowerCase().startsWith(prefix + "stop")) music.stop({ interaction: msg })}); 

// deletes a message from 1-99 with .prune
client.on("messageCreate", msg => {
    let insertedNumber = msg.content.substr(7,8);
    if (msg.content.toLowerCase().startsWith(prefix + "prune")) {
            try {
                if(insertedNumber <= 1 || insertedNumber >= 100) {
                    msg.channel.send('Range erlaubt nur 2-99.')
                }else{
                    async function clear() {
                        msg.delete();
                        const fetched = await msg.channel.messages.fetch({limit: insertedNumber});
                        msg.channel.bulkDelete(fetched);
                        msg.channel.send('I removed ' + insertedNumber + ' Messages!')
                    } 
                    clear();
                }
            } catch(err) {
                console.error(err);
            }
        }
    });

//Call function to add maik to counter
client.on("messageCreate",async  msg => {
    if (msg.content.toLowerCase().includes('maik')) {
    if (msg.content.toLowerCase().includes(prefix + 'maik')) return
        if (msg.author.id === '630041615683026974') return
            addMaik();}
    })

//Gets how much maik has been said on the server
client.on("messageCreate",async  msg => {
    if (msg.content.toLowerCase().startsWith(prefix + 'maik')) {
        if (msg.author.id === '630041615683026974') return
        const fileName = './maik.json';
        const file = require(fileName);
        msg.channel.send('Es wurde schon ' + file.maikCount + ' Maik gesagt')
        }
    })

//Added +1 Maik to the Maikcounter
function addMaik() {
        maikCounter++
        const fileName = './maik.json';
        const file = require(fileName);
            
        file.maikCount = maikCounter;
            
        fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
        if (err) return console.log(err);
    })};

//Disconnects Normen.
client.on("messageCreate",async  msg => {
    if (msg.content.toLowerCase().startsWith(prefix + "normen")) {
        try {
        let userID = '322085600570245121'
        let user = await msg.guild.members.fetch(userID);
        user.voice.disconnect();
        msg.channel.send('Hau rein.')
        } catch(err) {
            console.error(err);
        }
    }});

//Change nickname by random json input
client.on("messageCreate", msg => {
    if (msg.content.toLowerCase().startsWith(prefix + "random")) {
        try {
            if (!msg.guild.me.permissions.has('MANAGE_NICKNAMES')) return msg.reply('Hab keine Berechtigung für "MANAGE_NICKNAMES"');
            if (msg.author.id === msg.guild.ownerId) return msg.reply('Geht nicht, Chef.');
                msg.member.setNickname(getRandomName());
            } catch(err) {
                console.error(err);
            }
        };
        function getRandomName() {
            let json = require('./games.json');
            let randomNumber = Math.floor(Math.random()*json.length);
                s = json[randomNumber].title
                console.log(s);
                s = s.substring(0, 32)
            return s
        }
    });

//sets all usernicknames on the server by the specific input (json/string)
client.on("messageCreate", msg => {
    if (msg.content.toLowerCase().startsWith(prefix + "motto")) {
        if (msg.author.id != msg.guild.ownerId) return msg.reply('Ne ist nicht Kollege Schnürschuh.');
        const guild = client.guilds.resolve("390614129552916480");
        guild.members.fetch().then(members =>
            {
                    // Loop through every members
                members.forEach(member =>
                {
                    if (member.user.id != '263060033472823297') {
                        member.setNickname("")
                    }else{
                        console.log("Chef übersprungen");
                    }
                });
            });
    }});


    //resets usernickname on the server
client.on("messageCreate", msg => {
    if (msg.content.toLowerCase().startsWith(prefix + "reset")) {
        const mentionedUser = msg.mentions
        let person;
        if (mentionedUser.users.size < 1) {
            if (msg.author.id === msg.guild.ownerId) return msg.reply('Geht nicht Chef.');
            person = msg.guild.members.cache.get(msg.author.id.toString())
            msg.channel.send('Deine Name is nun wieder schmierig.');
        }else{
            if (msg.author.id === msg.guild.ownerId) {
                person = msg.mentions.members.first()
                msg.channel.send(`Deine Name wurde zurückgesetzt. ${person}`);
            }else if(msg.author.id != msg.mentions.members.first().id){
                return msg.channel.send('Abgelehnt.');
            }else{
                if (msg.author.id === msg.guild.ownerId) return msg.reply('Geht nicht Chef.');
                person = msg.mentions.members.first()
                msg.channel.send('Deine Name war [REDACTED].');
            }
        }
        person.setNickname("");
    }});
       
//Allows user to change their nickname
client.on("messageCreate", msg => {
    if (msg.content.toLowerCase().startsWith(prefix + "nick")) {
        try {
            let insertedName = msg.content.substring(6);
            if (!msg.guild.me.permissions.has('MANAGE_NICKNAMES')) return msg.reply('I\'m missing permissions.');
            if (msg.author.id === msg.guild.ownerID) return msg.reply('I can\'t change your nickname.');
            console.log(insertedName);
                msg.member.setNickname(insertedName);
            } catch(err) {
                console.error(err);
            }
        };
  });

//gives server info
client.on('messageCreate', async (message) => {
    if (message.content.startsWith(prefix + "server")){
        let rolemap = message.guild.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(r => r)
        .join(",");
        if (rolemap.length > 1024) rolemap = "To many roles to display";
        if (!rolemap) rolemap = "No roles";
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

    if (message.content.includes(prefix + "info")){
        let id;
        let avatar
        const mentionedUser = message.mentions
            if (mentionedUser.users.size < 1) {
                id = message.guild.members.cache.get(message.author.id.toString())
                avatar = message.author.avatarURL()
            }else{
                id = message.mentions.members.first()
                avatar = message.mentions.members.first().user.avatarURL()
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
            .setAuthor(message.member.user.tag, message.guild.iconURL(), 'https://mee6.xyz/leaderboard/390614129552916480')
            .setThumbnail(avatar)
            .addFields(
                { name: 'Username', value: `${id.user.username}` },
                { name: 'Account Created:', value: `${dateT}` },
                { name: 'Roles', value: `${new_roles}`, inline: true },
                { name: 'ID', value: `${id.id}`, inline: true },
            )
            .setTimestamp()
            .setFooter('Footer',avatar);
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
