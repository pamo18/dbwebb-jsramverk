var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

router.post("/", (req, res) => {
    let sql = "INSERT INTO users VALUES (?, ?, ?, ?, ?)";
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        if (err) {
            res.status(400).json({"error":err.message});
            console.log(err.message);
            return;
        }
        console.log(hash);
        let params = [
            req.body.name,
            req.body.birthday,
            req.body.country,
            req.body.email,
            hash
        ];
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
    });

});
module.exports = router;
