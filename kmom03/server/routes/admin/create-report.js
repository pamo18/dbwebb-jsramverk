var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

router.post("/",
    (req, res, next) => checkToken(req, res, next),
    (req, res) => addReport(req.body, res));

function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];

    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) {
            console.log("Invalid token");
            return
        }

        console.log("valid token");
        next();
    });
}

function addReport(req, res) {
    console.log(req.title);
    let sql = "INSERT INTO report VALUES (?, ?)";
    let params = [req.title, req.content];
    db.run(sql, params, (err) => {
        if (err) {
            console.log(err)
        } else {
            res.status(201).json({
                data: {
                    msg: "Created"
                }
            });
        }
    });
}

module.exports = router;
