/* global it describe */

process.env.NODE_ENV = 'production';

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

chai.use(chaiHttp);

describe('Production', () => {
    describe('GET /', () => {
        it('200 HAPPY PATH getting base in production eviroment', (done) => {
            chai.request(server)
                .get("/")
                .end((err, res) => {
                    res.should.have.status(200);

                    done();
                });
        });
    });
});
