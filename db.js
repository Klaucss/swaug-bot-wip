console.log("db.js fires");

//mongoose node u/p
const mongoDB = require('mongoose');

mongoDB.connect("mongodb+srv://"+process.env.DB_local_user+":"+process.env.DB_local_password+"@cluster0.djz7m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

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


// const testSchema = new mongoDB.Schema({
//     test1: String,
//     test2: Number
// });


//mongodb node u/p

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://"+process.env.DB_local_user+":"+process.env.DB_local_password+"@cluster0.djz7m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// function testdb() {
//     console.log("db runs");
// }

// module.exports = {
//     testdb
// }

//mongoose node ssl x509
// const mongoDB = require('mongoose');

// const username = 'local-user01'; 
// const url = 'mongodb+srv://cluster0.djz7m.mongodb.net/myFirstDatabase?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority';
// const url2 = `mongodb://${encodeURIComponent(username)}@cluster0.djz7m.mongodb.net/myFirstDatabase?authSource=%24external`;

// mongoDB.connect(url, {
//     ssl: true,
//     sslValidate: true,
//     sslCA: 'X509-cert-2710526325973614146.pem',
//     authMechanism: 'MONGODB-X509'
// });

//mongodb node ssl x509
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const fs = require('fs');
// const credentials = 'X509-cert-2710526325973614146.pem'
// const client = new MongoClient('mongodb+srv://cluster0.djz7m.mongodb.net/myFirstDatabase?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', {
//   sslKey: credentials,
//   sslCert: credentials,
//   serverApi: ServerApiVersion.v1
// });
// async function run() {
//   try {
//     await client.connect();
//     const database = client.db("testDB");
//     const collection = database.collection("testCol");
//     const docCount = await collection.countDocuments({});
//     console.log(docCount);
//     // perform actions using client
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);