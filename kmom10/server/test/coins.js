/* global it describe */

process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

chai.use(chaiHttp);

describe('Coins', () => {
    describe('GET /coins', () => {
        it('200 HAPPY PATH getting all coins', (done) => {
            chai.request(server)
                .get("/coins")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.should.have.property("data");

                    done();
                });
        });
    });
});
