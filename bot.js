const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES","GUILD_VOICE_STATES"] })
const auth = require('./auth.json');
const ytdl = require('ytdl-core');
const { joinVoiceChannel } = require('@discordjs/voice');

client.on('ready', () => {
console.log(`Logged in as ${client.user.tag}!`);
});

client.login(auth.token);

let prefix = "."



      const queue = new Map();

client.once("ready", () => {
  console.log("Ready!");
});

client.once("reconnecting", () => {
  console.log("Reconnecting!");
});

client.once("disconnect", () => {
  console.log("Disconnect!");
});



client.on("messageCreate", async message => {
    console.log(message.author.bot);
    console.log(message.author);
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const serverQueue = queue.get(message.guild.id);

  if (message.content.startsWith(`${prefix}play`)) {
    execute(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}skip`)) {
    skip(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}stop`)) {
    stop(message, serverQueue);
    return;
  } else {
    message.channel.send("You need to enter a valid command!");
  }
});

async function execute(message, serverQueue) {
  const args = message.content.split(" ");
  console.log(args);

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      "You need to be in a voice channel to play music!"
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "I need the permissions to join and speak in your voice channel!"
    );
  }

  const songInfo = await ytdl.getInfo(args[1]);
  const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
   };

  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await joinVoiceChannel({
        channelId: message.member.voice.channel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator
    });
      queueContruct.connection = connection;
      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    return message.channel.send(`${song.title} has been added to the queue!`);
  }
}

function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
  if (!serverQueue)
    return message.channel.send("There is no song that I could skip!");
  serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
    
  if (!serverQueue)
    return message.channel.send("There is no song that I could stop!");
    
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}

async function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  console.log( serverQueue.connection," serverQueue.connection");

  const dispatcher = await serverQueue.connection.play(ytdl(song.url)).on("finish", () => { serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`Start playing: **${song.title}**`);
}




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
