/*eslint max-len: ["error", { "code": 200 }]*/
var express = require('express');
var router = express.Router();
const error = require("../../models/error.js");
const db = require("../../db/database.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post("/", (req, res) => {
    let sql = "SELECT * FROM users WHERE name = ?";
    let params = [req.body.name];

    db.get(sql, params, function (err, row) {
        if (err) {
            return error.database(res, "/login", err);
        }

        if (row) {
            let password = req.body.password;
            let hash = row.password;

            bcrypt.compare(password, hash, function(err, match) {
                if (match) {
                    const payload = { email: row.email };
                    const secret = process.env.JWT_SECRET;
                    const token = jwt.sign(payload, secret, { expiresIn: '48h'});

                    res.json({
                        data: {
                            result: true,
                            user: row,
                            token: token
                        }
                    });
                } else {
                    res.json({
                        data: {
                            result: false,
                            user: "Password is incorrect!",
                            token: null
                        }
                    });
                }
            });
        } else {
            res.json({
                data: {
                    result: false,
                    user: "Username is incorrect!"
                }
            });
        }
    });
});

module.exports = router;
