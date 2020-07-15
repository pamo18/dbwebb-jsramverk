var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');

router.get("/", (req, res) => {
    res.json({
        data: {
            msg: "Got a GET request, sending back default 200"
        }
    });
});

router.post("/", (req, res) => {
    db.run("INSERT INTO users (email, password) VALUES (?, ?)",
        "user@example.com",
        "superlonghashedpasswordthatwewillseehowtohashinthenextsection", (err) => {
        if (err) {
            console.log(err)
        }

        res.status(201).json({
            data: {
                msg: "Success!"
            }
        });
        console.log("success!")
    });
});

router.put("/", (req, res) => {
    // PUT requests should return 204 No Content
    res.status(204).send();
});

router.delete("/", (req, res) => {
    // DELETE requests should return 204 No Content
    res.status(204).send();
});

module.exports = router;
