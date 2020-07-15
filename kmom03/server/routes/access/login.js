var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const fs = require('fs');
const bcrypt = require('bcryptjs');
dotenv.config();

router.post("/", (req, res) => {
    let sql = "SELECT * FROM users WHERE name = ?";
    let params = [req.body.name];
    db.get(sql, params, function (err, row) {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }

        if (row) {
            let password = req.body.password;
            let hash = row.password;
            bcrypt.compare(password, hash, function(err, match) {
                if (match) {
                    const randomKey1 = Math.random().toString(36).slice(-8);
                    const randomKey2 = Math.random().toString(36).slice(-8);
                    const randomKey3 = Math.random().toString(36).slice(-8);
                    const randomKey4 = Math.random().toString(36).slice(-8);
                    const newKey = "JWT_SECRET=" + randomKey1 + randomKey2 + randomKey3 + randomKey4 + randomKey2 + randomKey3 + randomKey1 + randomKey2 + randomKey3 + randomKey4 + randomKey2;
                    fs.writeFile("./.env", newKey, (err) => {
                        if (err) console.log(err);
                            console.log("Successfully Written to File.");
                    });
                    const payload = { email: row.email };
                    const secret = process.env.JWT_SECRET;
                    const token = jwt.sign(payload, secret, { expiresIn: '1h'});
                    res.json({
                        data: {
                            result: true,
                            user: row,
                            token: token
                        }
                    })
                } else {
                    res.json({
                        data: {
                            result: false,
                            user: "Password is incorrect!",
                            token: null
                        }
                    })
                }
            });
        } else {
            res.json({
                data: {
                    result: false,
                    user: "Username is incorrect!"
                }
            })
        }
    })
});

module.exports = router;
