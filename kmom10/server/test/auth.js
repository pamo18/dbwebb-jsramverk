/* global it describe */
/*eslint max-len: ["error", { "code": 200 }]*/

process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

chai.use(chaiHttp);

const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJpYXQiOjE1Njk1MDM4NjMsImV4cCI6MTYwMTAzOTg2M30.y82iLLmIFP-ngMpls3mz4labtNLnaSOmXEQgoJWtoWI";

describe('Auth', () => {
    describe('POST /auth', () => {
        it('should get 200 HAPPY PATH but wrong name', (done) => {
            chai.request(server)
                .post("/auth")
                .set('x-access-token', apiKey)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");

                    done();
                });
        });
    });

    describe('POST /auth', () => {
        it('should get 200 HAPPY PATH but wrong token', (done) => {
            chai.request(server)
                .post("/auth")
                .set('x-access-token', "wwe")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");

                    done();
                });
        });
    });
});
