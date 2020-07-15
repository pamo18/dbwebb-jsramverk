var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');

router.get('/:id', async function(req, res) {
    let sql = "SELECT * FROM report WHERE title = ?";
    let params;
    let id = req.params.id;

    if (req.params.id === "10") {
        params = [`Kmom${id}`]
    } else {
        params = [`Kmom0${id}`]
    }
    db.get(sql, params, function (err, row) {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        if (row) {
            res.json({
                data: {
                    report: row
                }
            })
        } else {
            res.json({
                data: {
                    report: {
                    title: "Report comming soon",
                    content: "Report comming soon!"
                    }
                }
            })
        }
    })
});

module.exports = router;
