var express = require('express');
var router = express.Router();
const error = require("../models/error.js");
const db = require("../db/database.js");

router.get("/:name", (req, res) => {
    let sql = "SELECT * FROM common WHERE name = ?";
    let params = [req.params.name];

    db.get(sql, params, (err, row) => {
        if (err) {
            return error.database(res, "/common/" + req.params.name, err);
        } else {
            res.json({
                data: {
                    common: row
                }
            });
        }
    });
});

router.post("/:name", (req, res) => {
    let sql = "UPDATE common SET item = ? WHERE name = ?";
    let params = [req.body.countries, req.params.name];

    db.run(sql, params, (err) => {
        if (err) {
            return error.database(res, "/common/" + req.params.name, err);
        } else {
            res.json({
                data: {
                    msg: "Updated common countries"
                }
            });
        }
    });
});

module.exports = router;
