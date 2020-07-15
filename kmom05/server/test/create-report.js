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

describe('Create report', () => {
    describe('POST /reports', () => {
        it('should get 201 HAPPY PATH with valid token', (done) => {
            let report = {
                title: "test1",
                content: "text"
            };

            chai.request(server)
                .post("/reports")
                .set('x-access-token', apiKey)
                .send(report)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");

                    done();
                });
        });
    });

    describe('POST /reports', () => {
        it('should get 500 no content', (done) => {
            let report = {
                title: "test2",
                content: null
            };

            chai.request(server)
                .post("/reports")
                .set('x-access-token', apiKey)
                .send(report)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.an("object");

                    done();
                });
        });
    });

    describe('POST /reports', () => {
        it('should get 500 invalid token', (done) => {
            let report = {
                title: "test3",
                content: "text"
            };

            chai.request(server)
                .post("/reports")
                .set('x-access-token', "fail")
                .send(report)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.an("object");

                    done();
                });
        });
    });
});
