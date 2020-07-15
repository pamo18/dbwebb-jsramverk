var express = require('express');
var router = express.Router();
const error = require("../models/error.js");
const db = require("../db/database.js");
const jwt = require('jsonwebtoken');

router.post("/",
    (req, res, next) => checkToken(req, res, next),
    (req, res) => getWallet(req.body, res));

function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];
    const secret = process.env.JWT_SECRET;

    // eslint-disable-next-line no-unused-vars
    jwt.verify(token, secret, function(err, decoded) {
        if (err) {
            return error.token(res, "/wallet", err);
        }

        console.log("valid token");
        next();
    });
}

function getWallet(req, res) {
    let user = req.username;
    let sql = "SELECT * FROM users WHERE name = ?";
    let params = [user];

    db.get(sql, params, function (err, row) {
        if (err) {
            return error.database(res, "/wallet", err);
        }

        if (row) {
            res.json({
                data: {
                    pamocoin: row.pamocoin.toFixed(2),
                    bthcoin: row.bthcoin.toFixed(2),
                    krona: row.krona.toFixed(2)
                }
            });
        }
    });
}

module.exports = router;
