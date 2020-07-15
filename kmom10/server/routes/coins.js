var express = require('express');
var router = express.Router();
const error = require("../models/error.js");
const db = require("../db/database.js");

router.get("/", (req, res) => {
    let sql = "SELECT * FROM coins";

    db.all(sql, (err, row) => {
        if (err) {
            return error.database(res, "/coins", err);
        } else {
            res.json({
                data: row
            });
        }
    });
});

module.exports = router;
