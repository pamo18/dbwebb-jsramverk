/* global it describe */

process.env.NODE_ENV = 'test';

//Require the dev-dependencies
var assert = require("assert");
let db = require('../db/database.js');

describe("Get database based upon enviroment variable", function() {
    describe("Test enviroment", function() {
        it("test database", function() {
            assert.equal(db.filename, "./db/test.sqlite");
        });
    });
});
