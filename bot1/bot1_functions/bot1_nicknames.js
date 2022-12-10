console.log("script nicknames runs");

const permissions = require('../bot1_permissions');

//reset users nickname on the server to its default
async function resetUserNick(msg){
    const mentionedUser = msg.mentions
    let person;
    if (mentionedUser.users.size < 1) {
        if (!(await permissions.checkOwner(msg))) return msg.reply('Geht nicht Chef.');
        person = msg.guild.members.cache.get(msg.author.id.toString())
        msg.channel.send('Deine Name is nun wieder schmierig.');
    }else{
        if (await permissions.checkOwner(msg)) {
            person = msg.mentions.members.first()
            msg.channel.send(`Deine Name wurde zurückgesetzt. ${person}`);
        }else if(msg.author.id != msg.mentions.members.first().id){
            return msg.channel.send('Abgelehnt.');
        }else{
            if (await permissions.checkOwner(msg)) return msg.reply('Geht nicht Chef.');
            person = msg.mentions.members.first()
            msg.channel.send('Deine Name war [REDACTED].');
        }
    }
    person.setNickname("");
}

//reset all nicknames on the server to their default
async function resetAllNicks(msg){
    if (!(await permissions.checkOwner(msg))) return msg.reply('Ne ist nicht, Kollege Schnürschuh.');
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

//Change nickname by random user on the server
async function changeRandomNick(msg){
    let memberList = [];
    let usedMember = [];

    try {
        if (!(await permissions.checkOwner)) return msg.reply('Ne ist nicht, Kollege Schnürschuh.');
        if (!msg.guild.me.permissions.has('MANAGE_NICKNAMES')) return msg.reply('Hab keine Berechtigung für "MANAGE_NICKNAMES"');
        const guild = client.guilds.resolve("390614129552916480");
        guild.members.fetch().then(members =>
            {
                members.forEach(member =>
                {
                    memberList.push(member.user.username)
                });
            });
        guild.members.fetch().then(members => {
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
};

//set permission for user to change its nickname
async function allowUserChangeNick(msg){
    try {
        let insertedName = msg.content.substring(6);
        return msg.reply('Sowas willste machen obwohl ein Mottomonat stattfindet?');
        if (!msg.guild.me.permissions.has('MANAGE_NICKNAMES')) return msg.reply('I\'m missing permissions.');
        if (await permissions.checkOwner) return msg.reply('I can\'t change your nickname.');
        console.log(insertedName);
            msg.member.setNickname(insertedName);
    } catch(err) {
        console.error(err);
    }
}

module.exports = {
    resetUserNick,
    resetAllNicks,
    changeRandomNick,
    allowUserChangeNick
}
