console.log("script maik runs");

const fs = require('fs');

const filePath = '../bot1_data/maik.json';
const filePathAbsolute = './bot1/bot1_data/maik.json';

let maikCounter = preloadMaikCounter();

//Add +1 Maik to the Maikcounter
function addMaikToCounter(){
    maikCounter++
    const file = require(filePath);
    file.maikCount = maikCounter;
        
    fs.writeFile(filePathAbsolute, JSON.stringify(file), function writeJSON(err) {
        if (err) return console.log(err);
    })
}

//Display how often maik has been said on the server
function getMaikCounter(msg){
    //if (msg.author.id === '630041615683026974') return
    const file = require(filePath);


    msg.channel.send('Es wurde schon ' + file.maikCount + ' mal Maik gesagt.')
}

//Preload the Maikcounter
function preloadMaikCounter(){
    const file = require(filePath);
    return file.maikCount
}



module.exports = {
    addMaikToCounter,
    getMaikCounter
}
