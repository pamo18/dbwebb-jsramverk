/**
 * An Express server.
 */

 "use strict";

const port = 8333;
const express = require("express");
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require("body-parser");
const index = require('./routes/index.js');
const reports = require('./routes/reports.js');
const login = require('./routes/access/login.js');
const register = require('./routes/access/register.js');
const countries = require('./routes/countries.js');
const common = require('./routes/common.js');
const create = require('./routes/admin/create-report.js');
const edit = require('./routes/admin/edit-report.js');
const hello = require('./routes/hello.js');
const user = require('./routes/user.js');

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

// This is middleware called for all routes.
// Middleware takes three parameters.
app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});

app.use(cors()); //Cross-Origin Resource Sharing (CORS)

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/", index);
app.use("/reports/week", reports);
app.use("/login", login);
app.use("/register", register);
app.use("/countries", countries);
app.use("/common", common);
app.use("/reports", create);
app.use("/reports/edit", edit);
app.use("/hello", hello);
app.use("/user", user);

// Add routes for 404 and error handling
// Catch 404 and forward to error handler
// Put this last
app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
});

// Start up server
app.listen(port, () => console.log(`Example API listening on port ${port}!`));
