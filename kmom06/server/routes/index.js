var express = require('express');
var router = express.Router();
const json = require('../assets/json/me.json');

// eslint-disable-next-line no-unused-vars
router.get('/', function(req, res, next) {
    const data = {
        data: {
            me: json
        }
    };

    res.json(data);
});

module.exports = router;
