console.log("script ytmusic runs");

const music = require('@koenie06/discord.js-music');

// music.play is a node module that creates a audio stream with the message interaction (short = msg)
async function playMusic(msg){
    const channel = msg.member.voice.channel;
    const song = msg.content.split(" ")[1];
    msg.channel.send('Searching...')
    music.play({
        interaction: msg,
        channel: channel,
        song: song
    });
    msg.channel.send('Playing...')
}

// music.stop is a node module that deletes the current playing audio stream with the message interaction (short = msg)
async function stopMusic(msg){
    music.stop({ interaction: msg });
}

module.exports = {
    playMusic,
    stopMusic
}