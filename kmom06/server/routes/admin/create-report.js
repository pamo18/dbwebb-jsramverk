var express = require('express');
var router = express.Router();
const error = require("../../models/error.js");
const db = require("../../db/database.js");
const jwt = require('jsonwebtoken');

router.post("/",
    (req, res, next) => checkToken(req, res, next),
    (req, res) => addReport(req.body, res));

function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];
    const secret = process.env.JWT_SECRET;

    // eslint-disable-next-line no-unused-vars
    jwt.verify(token, secret, function(err, decoded) {
        if (err) {
            return error.token(res, "/reports", err);
        }

        console.log("valid token");
        next();
    });
}

function addReport(req, res) {
    let sql = "INSERT INTO report VALUES (?, ?)";
    let params = [req.title, req.content];

    db.run(sql, params, (err) => {
        if (err) {
            return error.database(res, "/reports", err);
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
