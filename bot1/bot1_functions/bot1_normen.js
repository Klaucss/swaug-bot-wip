console.log("script normen runs");

const permissions = require('../bot1_permissions');

async function disconnect(msg){
    if(permissions.checkOwner(msg)){
        try {
            let userID = '322085600570245121'
            let user = await msg.guild.members.fetch(userID);
            user.voice.disconnect();
            msg.channel.send('Hau rein.')
        } catch(err) {
            console.error(err);
        }
    }
}

module.exports = {
    disconnect
}