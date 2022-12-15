console.log("script utils runs");

const permissions = require('../bot1_permissions');

//delete message from 1 to 99
async function deleteMessage(msg){
    let insertedNumber = msg.content.substr(7,8);
    if (!(await permissions.isOwner(msg))) return msg.reply('Ne ist nicht, Kollege Schnürschuh.');
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

module.exports = {
    deleteMessage
}