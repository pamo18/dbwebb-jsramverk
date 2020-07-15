/* global it describe */

process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const utils = require("../models/utils.js");
const expect = require('chai').expect;

describe('Utils', () => {
    describe('date', () => {
        it('should return a date', function() {
            let purchasedDate = utils.date(false);

            expect(purchasedDate).to.be.a('date');
        });
    });
});
