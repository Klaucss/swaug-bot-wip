const Discord = require('discord.js');
const client  = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES","GUILD_VOICE_STATES", "GUILD_MEMBERS"] })
const auth    = require('../auth.json');

const info        = require('./bot1_functions/bot1_info');
const maik        = require('./bot1_functions/bot1_maik');
const music       = require('./bot1_functions/bot1_ytmusic');
const nicks       = require('./bot1_functions/bot1_nicknames');
const normen      = require('./bot1_functions/bot1_normen');
const permissions = require('./bot1_permissions');
const utils       = require('./bot1_functions/bot1_utils');


//Start the bot
module.exports = {}
client.login(auth.token);
client.on('ready', () => {console.log(`Logged in as ${client.user.tag}!`)});
client.once("reconnecting", () => {console.log("Reconnecting!")});
client.once("disconnect", () => {console.log("Disconnect!")});

//Global constants
const prefix = ".";

const guild_id    = '390614129552916480';
const bot_channel = '546410932092534808';
const bot_id      = '630041615683026974';


//client.on messageCreate is a listener for the "prefix" + argument from a chat input, it runs the function after the specific thing had been said in the channel
client.on('messageCreate', async (msg) => {

    //block messages from bot
    if(msg.author.id === bot_id) return; 

    //restrict commands to one channel
    if (msg.channel.id != bot_channel) return;
    
    //Maikcounter call function
    if (msg.content.toLowerCase().includes('maik') 
    && !msg.content.toLowerCase().includes(prefix + 'maik') 
    && !(msg.author.id === bot_id)){
        maik.addMaikToCounter();
    }


    //command handler
    if(msg.content.toLowerCase().startsWith(prefix)){
        
        //restrict commands to user connected to a voice channel
        if(!permissions.isInVoiceChannel(msg.author.id, guild_id, client)){ 
            msg.author.send("Einfach nein.")
            return;
        }

        let msg_cmd = msg.content.toLowerCase().split(" ")[0].slice(1);
        
        switch(msg_cmd){
            //utils
            case "prune":
                await utils.deleteMessage(msg);
                break;

            //info
            case "server":
                await info.getServerInfo(msg);
                break;
            case "info":
                await info.getUserInfo(msg);
                break; 

            //nicknames
            case "resetU":
                await nicks.resetUserNick(msg);
                break; 
            case "resetA":
                await nicks.resetAllNicks(msg);
                break; 
            case "random":
                await nicks.changeRandomNick(msg);
                break;
            case "nicka": 
                await nicks.allowUserChangeNick(msg);
                break; 

            //ytmusic bot
            case "play": 
                await music.playMusic(msg); 
                break; 
            case "stop":
                await music.stopMusic(msg);
                break; 
            case "pause":
                await music.pauseMusic(msg);
                break; 
            case "resume":
                await music.resumeMusic(msg);
                break;
            case "skip": 
                await music.skipTrack(msg);
                break;
            case "loop": case "repeat":
                await music.loopTrack(msg);
                break; 
            case "queue": case "playlist":
                await music.getQueue(msg);
                break; 
            case "removeQueue": case "removePlaylist":
                await music.removeTrackFromQueue(msg);
                break;
            case "jump":
                await music.jumpInQueue(msg);
                break;

            //fun with members
            case "maik":
                maik.getMaikCounter(msg);
                break; 
            case "normen":
                await normen.disconnect(msg);
                break; 

            default: 
        }
    }
});


//let maikCounter = preLoad()
//let memberList = []
//let usedMember = []
//let counter = 88 

//Call function to add maik to counter
/* client.on('messageCreate', async (msg) => {
    if (msg.content.toLowerCase().includes('maik')) {
        if (msg.content.toLowerCase().includes(prefix + 'maik')) return
            if (msg.author.id === '630041615683026974') return
                addMaik();
            }
        }
    ) */

//client.on('messageCreate', async (msg) => {
  //  if (msg.channel.id != myChannel) return

    // music.play is a node module that creates a audio stream with the message interaction (short = msg)
/*     if (msg.content.toLowerCase().startsWith(prefix + "play")) {
        const channel = msg.member.voice.channel;
        const song = msg.content.split(" ")[1];
        msg.channel.send('Searching...')
        music.play({
            interaction: msg,
            channel: channel,
            song: song
        });
        msg.channel.send('Playing...')
    }; */

    // music.stop is a node module that deletes the current playing audio stream with the message interaction (short = msg)
    //if (msg.content.toLowerCase().startsWith(prefix + "stop")) music.stop({ interaction: msg })

    //gives server info
/*     if (msg.content.startsWith(prefix + "server")){
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
    } */

    //Gives info about the current user
/*     if (msg.content.includes(prefix + "info")){
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
      } */

      /* //Disconnects Normen.
      if (msg.content.toLowerCase().startsWith(prefix + "normen")) {
        try {
        let userID = '322085600570245121'
        let user = await msg.guild.members.fetch(userID);
        user.voice.disconnect();
        msg.channel.send('Hau rein.')
        } catch(err) {
            console.error(err);
        }
    } */

    //Gets how much maik has been said on the server
/*     if (msg.content.toLowerCase().startsWith(prefix + 'maik')) {
        if (msg.author.id === '630041615683026974') return
        const fileName = './maik.json';
        const file = require(fileName);
        msg.channel.send('Es wurde schon ' + file.maikCount + ' Maik gesagt')
    } */

        // deletes a message from 1-99 with .prune
/*         if (msg.content.toLowerCase().startsWith(prefix + "prune")) {
            let insertedNumber = msg.content.substr(7,8);
            if (msg.author.id != msg.guild.ownerId) return msg.reply('Ne ist nicht, Kollege Schnürschuh.');
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
            } */

      //Change nickname by random user on the server
/*       if (msg.content.toLowerCase().startsWith(prefix + "random")) {
        try {
            if (msg.author.id != msg.guild.ownerId) return msg.reply('Ne ist nicht, Kollege Schnürschuh.');
            if (!msg.guild.me.permissions.has('MANAGE_NICKNAMES')) return msg.reply('Hab keine Berechtigung für "MANAGE_NICKNAMES"');
                const guild = client.guilds.resolve("390614129552916480");
                guild.members.fetch().then(members =>
                    {
                        members.forEach(member =>
                        {
                            memberList.push(member.user.username)
                        });
                    });
                guild.members.fetch().then(members =>
                    {
                        members.forEach(member =>
                        {
                            if (member.user.id != '263060033472823297') {
                                member.setNickname("")
                            }else{
                                console.log("Chef übersprungen");
                            }
                        });
                        usedMember = []
                    });
            } catch(err) {
                console.error(err);
            }
        }; */

      //Allows user to change their nickname
/*       if (msg.content.toLowerCase().startsWith(prefix + "nick")) {
        try {
            let insertedName = msg.content.substring(6);
            return msg.reply('Sowas willste machen obwohl ein Mottomonat stattfindet?');
            if (!msg.guild.me.permissions.has('MANAGE_NICKNAMES')) return msg.reply('I\'m missing permissions.');
            if (msg.author.id === msg.guild.ownerID) return msg.reply('I can\'t change your nickname.');
            console.log(insertedName);
                msg.member.setNickname(insertedName);
            } catch(err) {
                console.error(err);
            }
        }; */
        
        //resets usernickname on the server
/*         if (msg.content.toLowerCase().startsWith(prefix + "reset")) {
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
        }

        //resets all usernicknames on the server to their default
        if (msg.content.toLowerCase().startsWith(prefix + "reset")) {
            if (msg.author.id != msg.guild.ownerId) return msg.reply('Ne ist nicht, Kollege Schnürschuh.');
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
        } 

    });*/

    //gets a random number
/*     function randomNumberFunc(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
      }
    
      //gets a random name from the userarray
    function getRandomName() {
        let randomNumber = randomNumberFunc(0, counter--);
        if ( usedMember.length === 84) {return console.log("done")}
            s = memberList[randomNumber]
            memberList = memberList.filter(function(item) {
                return item !== s
            })
            if(s === undefined){s = "kaputt"}
            return s
    } */

    //Added +1 Maik to the Maikcounter
/*     function addMaik() {
        maikCounter++
        const fileName = './maik.json';
        const file = require(fileName);
            
        file.maikCount = maikCounter;
            
        fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
        if (err) return console.log(err);
    })}; */

/*     //Preloads the MaikCounter
    function preLoad() {
        const fileName = './maik.json';
        const file = require(fileName);
        return file.maikCount
    } */