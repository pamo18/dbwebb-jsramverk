var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');

router.get("/", (req, res) => {
    let sql = "SELECT * FROM common WHERE name = 'countries'";
    db.get(sql, (err, row) => {
        if (err) {
            console.log(err)
        } else {
            res.json({
                data: {
                    common: row
                }
            })
        }
    });
});

router.post("/", (req, res) => {
    let sql = "UPDATE common SET item = ? WHERE name = 'countries'";
    let params = [req.body.countries]
    db.run(sql, params, (err) => {
        if (err) {
            console.log(err)
        } else {
            res.status(201).json({
                data: {
                    msg: `Updated common countries`
                }
            });
        }
    });
})

module.exports = router;
