var express = require('express');
var router = express.Router();
const json = require('../assets/json/me.json');

router.get('/', function(req, res, next) {
    const data = {
        data: {
            me: json
        }
    };

    res.json(data);
});

module.exports = router;
