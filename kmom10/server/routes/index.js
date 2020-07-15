var express = require('express');
var router = express.Router();

// eslint-disable-next-line no-unused-vars
router.get('/', function(req, res, next) {
    const data = {
        data: {
            status: "PamoCoin Pro Express server is running"
        }
    };

    res.json(data);
});

module.exports = router;
