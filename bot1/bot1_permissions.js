console.log("script permissions runs");

//check if message author is guild owner
async function isOwner(msg){
    if(msg.author.id === msg.guild.ownerId) return true;
    return false;
}

//check if user is connected to a voice channel
function isInVoiceChannel(user_id, guild_id, client){
    let res = false; 

    const guild = client.guilds.cache.get(guild_id);
    guild.channels.cache.each(channel => {
        //console.log("guild-channels: ", channel.id, " - type: ", channel.type);
        if(channel.type === "GUILD_VOICE"){
            channel.members.each(member => {
                if(member.id === user_id) res = true; 
            });
        }
    });

    return res; 
}

//check if user is connected to guild
function isConnected(user_id){
    let res = false; 

    const guild = client.guilds.cache.get(guild_id);
    guild.members.cache.each(member => {
        console.log("guild-member: ", member.user.id);
        if(member.user.id === user_id) res = true; 
    });

    return res; 
}

module.exports = {
    isOwner,
    isInVoiceChannel
}