const express = require("express");
var cors = require('cors')
const app = express();
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors())

const db = new sqlite3.Database('./src/back/didula_db.db');

db.run('CREATE TABLE IF NOT EXISTS users (id INT PRIMARY KEY NOT NULL ON CONFLICT ROLLBACK, nic VARCHAR (20), name VARCHAR (100), mobile INT, bank INT, account VARCHAR (50), address VARCHAR (500))');
db.run(`CREATE TABLE IF NOT EXISTS transactions(
    "year"	INTEGER,
	"month"	INTEGER,
	"date"	INTEGER,
	"id"	INT,
	"username"	VARCHAR(100),
	"grossWeight"	INTEGER DEFAULT 0,
	"add0_amount"	INTEGER DEFAULT 0,
	"add1_units"	INTEGER DEFAULT 0,
	"add1_unit_price"	INTEGER DEFAULT 0,
	"add1_amount"	INTEGER DEFAULT 0,
	"add2_units"	INTEGER DEFAULT 0,
	"add2_unit_price"	INTEGER DEFAULT 0,
	"add2_amount"	INTEGER DEFAULT 0,
	"add3_units"	INTEGER DEFAULT 0,
	"add3_unit_price"	INTEGER DEFAULT 0,
	"add3_amount"	INTEGER DEFAULT 0,
	"add4_units"	INTEGER DEFAULT 0,
	"add4_unit_price"	INTEGER DEFAULT 0,
	"add4_amount"	INTEGER DEFAULT 0,
	"add5_amount"	INTEGER DEFAULT 0,
	"add5_comments"	TEXT DEFAULT NULL,
	"past"	REAL DEFAULT 0,
	PRIMARY KEY("id","date","year","month")
)`);
db.run('CREATE TABLE IF NOT EXISTS rates(year INT, month INT, price REAL, stamp REAL, transport REAL, PRIMARY KEY(year,month))');
db.run('CREATE TABLE IF NOT EXISTS summary(year INT, month INT, uid INT, name VARCHAR(100), kilos INT, amount REAL, PRIMARY KEY(year,month,uid))');

app.get('/', function (req, res) {
    res.status(200).send({
        name: "SatLabs Tea App"
    });
});

app.get('/users', function (req, res) {
    let sql = `SELECT * FROM users`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.status(200).send({
            message: "Users",
            data: rows
        });
    });
});

app.get('/daily_records/:date', function (req, res) {
    const date = req.params.date?.toString().split('-');
    if (date && date.length == 3) {
        let sql = `SELECT a.*, b.grossWeight FROM users a LEFT JOIN transactions b ON b.year = ? AND b.month = ? AND b.date = ? AND b.id = a.id`;
        console.log(date);
        db.all(sql, [date[0],date[1],date[2]], (err, rows) => {
            if (err) {
                throw err;
            }
            res.status(200).send({
                message: "Users",
                data: rows
            });
        });
    } else {
        res.status(500).send({
            message: "Users",
            data: null
        });
    }
});

app.listen(3001);