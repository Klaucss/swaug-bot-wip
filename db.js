console.log("script db fires");

//connection
const mongoDB = require('mongoose');

mongoDB.connect('mongodb+srv://cluster0.y1sqvoc.mongodb.net/swaug_bot_v1?authMechanism=MONGODB-X509&authSource=%24external&tls=true&tlsCertificateKeyFile=%2FUsers%2Foliverpieper%2FDownloads%2FX509-cert-6231547445369354583.pem')

//collections
const testModel = mongoDB.model('user', new mongoDB.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}));
testModel.createCollection();

const memberModel = mongoDB.model('member', new mongoDB.Schema({
    discord_id: {
        type: String, 
        required: true
    },
    id: {
        type: String, 
        required: true
    },
}));
memberModel.createCollection();

const ytmusicModel = mongoDB.model('ytmusic', new mongoDB.Schema({
    name: {
        type: String,
        required: true
    },
    requester: [{
        member_id: String,
        requestCount: Number
    }],
    id: {
        type: String, 
        required: true
    },
}));
ytmusicModel.createCollection();