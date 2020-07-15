var express = require('express');
var router = express.Router();
const error = require("../../models/error.js");
const db = require("../../db/database.js");
const bcrypt = require('bcryptjs');
const saltRounds = 10;

router.post("/", (req, res) => {
    let sql = "INSERT INTO users(name, birthday, country, email, password) VALUES (?, ?, ?, ?, ?)";

    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        if (err) {
            return error.hash(res, "/register", err);
        }
        let params = [
            req.body.name,
            req.body.birthday,
            req.body.country,
            req.body.email,
            hash
        ];

        db.run(sql, params, (err) => {
            if (err) {
                return error.database(res, "/register", err);
            } else {
                res.json({
                    data: {
                        msg: "Created"
                    }
                });
            }
        });
    });
});
module.exports = router;
