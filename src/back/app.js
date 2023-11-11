const express = require("express");
var cors = require('cors')
const app = express();
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors())
 
const db = new sqlite3.Database(__dirname + '/didula_db.db');

db.run('CREATE TABLE IF NOT EXISTS users(nic VARCHAR(20) PRIMARY KEY NOT NULL, name VARCHAR(100), mobile INT, account VARCHAR(50), address VARCHAR(500))');

app.get('/', function (req, res) {
    res.status(200).send({
        name: "HI"
    });
});

app.listen(3001);