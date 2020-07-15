var express = require('express');
var router = express.Router();
const error = require("../../models/error.js");
const db = require("../../db/database.js");

router.post("/", (req, res) => {
    let sql = "UPDATE report SET content = ? WHERE title = ?";
    let params = [req.body.content, req.body.title];

    db.run(sql, params, (err) => {
        if (err) {
            return error.database(res, "/reports/edit", err);
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
