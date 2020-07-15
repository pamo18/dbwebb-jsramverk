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
            return error.token(res, "/orders", err);
        }

        console.log("valid token");
        next();
    });
}

function getWallet(req, res) {
    let user = req.username;
    let sql = "SELECT * FROM orders WHERE user = ?";
    let params = [user];

    db.all(sql, params, function (err, row) {
        if (err) {
            return error.database(res, "/orders", err);
        }

        if (row) {
            res.json({
                data: row
            });
        }
    });
}

module.exports = router;
