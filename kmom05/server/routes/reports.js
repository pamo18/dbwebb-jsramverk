var express = require('express');
var router = express.Router();
const error = require("../models/error.js");
const db = require("../db/database.js");

router.get('/:id', function(req, res) {
    let sql = "SELECT * FROM report WHERE title = ?";
    let params;
    let id = req.params.id;

    if (req.params.id === "10") {
        params = ["Kmom" + id];
    } else {
        params = ["Kmom0" + id];
    }
    db.get(sql, params, function (err, row) {
        if (err) {
            return error.database(res, "/reports/week/" + id, err);
        }
        if (row) {
            res.json({
                data: {
                    report: row
                }
            });
        } else {
            res.json({
                data: {
                    report: {
                        title: "Report comming soon",
                        content: "Report comming soon!"
                    }
                }
            });
        }
    });
});

module.exports = router;
