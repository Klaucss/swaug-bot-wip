console.log("script permissions runs");

async function checkOwner(msg){
    if(msg.author.id === msg.guild.ownerId) return true;
    return false;
}

module.exports = {
    checkOwner
}