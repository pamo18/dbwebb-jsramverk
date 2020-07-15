/*eslint max-len: ["error", { "code": 200 }]*/
var express = require('express');
var router = express.Router();
const error = require("../models/error.js");
const utils = require("../models/utils.js");
const db = require("../db/database.js");
const jwt = require('jsonwebtoken');

router.post("/",
    (req, res, next) => checkToken(req, res, next),
    (req, res, next) => trade(req.body, res, next),
    (req, res) => updateWallet(req.body, res));

function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];
    const secret = process.env.JWT_SECRET;

    // eslint-disable-next-line no-unused-vars
    jwt.verify(token, secret, function(err, decoded) {
        if (err) {
            return error.token(res, "/trade", err);
        }

        console.log("valid token");
        next();
    });
}

function trade(req, res, next) {
    let user = req.user;
    let coinIn = req.coinIn.toLowerCase();
    let coinOut = req.coinOut.toLowerCase();
    let coinInAmount = parseFloat(req.amount);
    let price = parseFloat(req.price);
    let coinOutAmount = parseFloat(req.total);
    let purchasedDate = utils.date();
    let sql1 = "INSERT INTO orders(user, coin, amount, currency, price, total, purchased) VALUES (?, ?, ?, ?, ?, ?, ?)";
    let params1 = [user, coinIn, coinInAmount, coinOut, price, coinOutAmount, purchasedDate];

    db.run(sql1, params1, (err) => {
        if (err) {
            return error.database(res, "/trade", err);
        }

        next();
    });
}

function updateWallet(req, res) {
    let user = req.user;
    let coinIn = req.coinIn.toLowerCase();
    let coinOut = req.coinOut.toLowerCase();
    let coinInAmount = parseFloat(req.amount);
    let coinOutAmount = parseFloat(req.total);
    let sql = "SELECT * FROM users WHERE name = ?";
    let params = (user);

    db.get(sql, params, function (err, row) {
        if (err) {
            return error.database(res, "/trade", err);
        }

        if (row) {
            let newCoinInAmount = row[coinIn] + coinInAmount;
            let newCoinOutAmount = row[coinOut] - coinOutAmount;
            let sql2 = "UPDATE users SET " + coinIn + " = ?, " + coinOut + " = ? WHERE name = ?";
            let params2 = [newCoinInAmount, newCoinOutAmount, user];

            db.run(sql2, params2, (err) => {
                if (err) {
                    return error.database(res, "/trade", err);
                } else {
                    let success = "Transaction complete";

                    console.log(success);

                    res.json({
                        data: {
                            msg: success
                        }
                    });
                }
            });
        }
    });
}

module.exports = router;
