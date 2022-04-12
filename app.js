require('dotenv').config();

const express = require('express');
const app = express();

//const bot1 = require('./bot.js');
const db = require('./db.js');


app.get("/", (req, res) => {
    db.testdb();
    res.send("Hello World");
});







const port = 3000;

app.listen(port, () => {
    console.log("server starting on port", port);
});
