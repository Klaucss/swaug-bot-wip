console.log("script ytmusic runs");

const fs = require('fs');
const music = require('@koenie06/discord.js-music');

const filePath = '../bot1_data/ytsong.json';
const filePathAbsolute = './bot1/bot1_data/ytsong.json';
let file = require(filePath);

// music.play is a node module that creates a audio stream with the message interaction (short = msg)
async function playMusic(msg){
    const channel = msg.member.voice.channel;
    const song = msg.content.slice(6)
    music.play({
        interaction: msg,
        channel: channel,
        song: song
    });
}

// post song title in botchat when playing
music.event.on('playSong', async (channel, songInfo, requester) => {
    channel.send(`Ich spiele nun "${songInfo.title}" ab.`);
    await saveInfoToArray(songInfo, requester);
});

// post song title in botchat when adding to playlist
music.event.on('addSong', async (channel, songInfo, requester) => {
    channel.send(`"${songInfo.title}" zur Playlist hinzugefügt.`);
});

async function saveInfoToArray(songInfo, requester){




/*     async function openFile(){
        return new Promise(async () => {await fs.promises.readFile(filePathAbsolute)});
    }

    let file = await openFile(); */

/*     let file = []; 
    
    fs.readFile(filePathAbsolute, {encoding: 'utf8'}, async (err, data) => {
        if (err) throw err;
        file = data;
        console.log("data: ", data);
    }); */


    let fileArray = file; 

    //debug
    console.log("fileArray before: ", fileArray);

    let alreadyExisted = false; 

    fileArray.forEach(e => {
/*         Object.entries(e).forEach(([key, value]) => {
             if(key === songInfo.title){
                value = (parseInt(value)++).toString();
            }else{
                fileArray.songInfo = 1; 
            } 
            console.log("x - key: ", key, " value: ", value);
        }); */

        if(e.title === songInfo.title){

            //debug 
            console.log("reps: ", e.repetitions);

/*             repetitions = e.repetitions+1;
            fileArray = fileArray.filter(async function(value, index, arr){
                return value.title != songInfo.title; 
            }); */
        
            e.repetitions++;
            alreadyExisted = true; 
        }
    });

    //debug
    console.log("fileArray mid: ", fileArray);

    if(!alreadyExisted){
        fileArray.push({
            "title": songInfo.title,
            "repetitions": 1
        }); 
    }

    //debug
    console.log("fileArray after: ", fileArray);

    fs.writeFile(filePathAbsolute, JSON.stringify(fileArray), async function writeJSON(err) {
        if (err) throw err;
    })
}

// music.stop is a node module that deletes the current playing audio stream with the message interaction (short = msg)
async function stopMusic(msg){
    music.stop({interaction: msg});
    msg.channel.send('Ciao Kakao.');
}

async function pauseMusic(msg){
    music.pause({interaction: msg});
    msg.channel.send('Päuschen.');
}

async function resumeMusic(msg){
    music.resume({interaction: msg});
    msg.channel.send('Weiter gehts.')
}

async function skipTrack(msg){
    music.skip({interaction: msg});
    msg.channel.send('Lied übersprungen.')
}

async function loopTrack(msg){
    try{
        const value = msg.content.split(" ")[1];
        music.repeat({
            interaction: msg,
            value: value
        });

        let txt;
        if(value){
            txt = "an";
        }else{
            txt = "aus";
        }
        msg.channel.send('loop '+ txt)
    }catch(err){
        console.log('loop error: ', err);
    }
}

// post first 10 entries of playlist in botchat
async function getQueue(msg){
    const queue = await music.getQueue({interaction: msg});
    let entrieCount = 10; 

    if(queue.length < entrieCount){
        entrieCount = queue.length;
    }
    for(let i=0; i<entrieCount; i++){
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