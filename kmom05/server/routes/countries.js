var express = require('express');
var router = express.Router();
const error = require("../models/error.js");
const db = require("../db/database.js");

router.get("/", (req, res) => {
    let sql = "SELECT * FROM countries";

    db.all(sql, (err, row) => {
        if (err) {
            return error.database(res, "/countries", err);
        } else {
            res.json({
                data: {
                    countries: row
                }
            });
        }
    });
});

module.exports = router;
