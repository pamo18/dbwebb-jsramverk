var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');

router.get("/", (req, res) => {
    let sql = "SELECT * FROM countries";
    db.all(sql, (err, row) => {
        if (err) {
            console.log(err)
        } else {
            res.json({
                data: {
                    countries: row
                }
            })
        }
    });
});

module.exports = router;
