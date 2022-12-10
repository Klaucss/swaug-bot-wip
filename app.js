const express = require('express');
const app = express();

const bot1 = require('./bot1/bot1.js');

app.get("/", (req, res) => {
    res.send("Hello World");
});







const port = 3000;

app.listen(port, () => {
    console.log("server starting on port", port);
});
