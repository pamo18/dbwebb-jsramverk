var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');

router.post("/", (req, res) => {
    console.log(req.body);
    let sql = "UPDATE report SET content = ? WHERE title = ?";
    let params = [req.body.content, req.body.title];
    db.run(sql, params, (err) => {
        if (err) {
            console.log(err)
        } else {
            res.status(201).json({
                data: {
                    msg: "Saved"
                }
            });
        }
    });
});

module.exports = router;
