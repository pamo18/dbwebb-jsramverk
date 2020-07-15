var express = require('express');
var router = express.Router();
const error = require("../models/error.js");
const db = require("../db/database.js");
const jwt = require('jsonwebtoken');

router.post("/",
    (req, res, next) => checkToken(req, res, next),
    (req, res) => makeDeposit(req.body, res));

function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];
    const secret = process.env.JWT_SECRET;

    // eslint-disable-next-line no-unused-vars
    jwt.verify(token, secret, function(err, decoded) {
        if (err) {
            return error.token(res, "/deposit", err);
        }

        console.log("valid token");
        next();
    });
}

function makeDeposit(req, res) {
    let user = req.username;
    let deposit = parseFloat(req.deposit);
    let sql = "UPDATE users SET krona = (krona + ?) WHERE name = ?";
    let params = [deposit, user];

    db.run(sql, params, (err) => {
        if (err) {
            return error.database(res, "/deposit", err);
        } else {
            let success = "Deposit complete";

            console.log(success);

            res.json({
                data: {
                    msg: success
                }
            });
        }
    });
}

module.exports = router;
