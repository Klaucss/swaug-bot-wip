console.log("script ytmusic runs");

const music = require('@koenie06/discord.js-music');

// music.play is a node module that creates a audio stream with the message interaction (short = msg)
async function playMusic(msg){
    const channel = msg.member.voice.channel;
    const song = msg.content.slice(6)
    //msg.channel.send('Searching...')
    music.play({
        interaction: msg,
        channel: channel,
        song: song
    });
    //msg.channel.send('Playing...')
}

// music.stop is a node module that deletes the current playing audio stream with the message interaction (short = msg)
async function stopMusic(msg){
    music.stop({interaction: msg});
}

async function pauseMusic(msg){
    music.pause({interaction: msg});
}

async function resumeMusic(msg){
    music.resume({interaction: msg});
}

async function skipTrack(msg){
    music.skip({interaction: msg});
}

async function loopTrack(msg){
    try{
        const value = msg.content.split(" ")[1];
        music.repeat({
            interaction: msg,
            value: value
        });
    }catch{}
}

async function getQueue(msg){
    const queue = await music.getQueue({interaction: msg});
/*    let titles = [];
    queue.forEach(e => titles.push(e.info.title));
    console.log("tracks: ", titles);
    msg.channel.send(titles); */
    for(let i=0; i<=9; i++){
        msg.channel.send(i+1 + " - " + queue[i].info.title);
    }
}

async function removeTrackFromQueue(msg){
    const number = msg.content.split(" ")[1];
    music.removeQueue({
        interaction: msg,
        number: number
    });
}

async function jumpInQueue(msg){
    const number = msg.content.split(" ")[1];
    music.jump({
        interaction: msg,
        number: number
    });
}


module.exports = {
    playMusic,
    stopMusic,
    pauseMusic,
    resumeMusic,
    skipTrack,
    loopTrack,
    getQueue,
    removeTrackFromQueue,
    jumpInQueue
}