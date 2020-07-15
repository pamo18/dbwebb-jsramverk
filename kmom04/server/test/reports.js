/* global it describe */

process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

chai.use(chaiHttp);

describe('reports', () => {
    describe('GET /reports/week/1', () => {
        it('200 HAPPY PATH valid report', (done) => {
            chai.request(server)
                .get("/reports/week/1")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");

                    done();
                });
        });
    });

    describe('GET /reports/week/2', () => {
        it('200 HAPPY PATH valid report', (done) => {
            chai.request(server)
                .get("/reports/week/2")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");

                    done();
                });
        });
    });

    describe('GET /reports/week/10', () => {
        it('200 HAPPY PATH valid report', (done) => {
            chai.request(server)
                .get("/reports/week/10")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");

                    done();
                });
        });
    });

    describe('GET /reports/week/20', () => {
        it('200 HAPPY PATH but invalid report', (done) => {
            chai.request(server)
                .get("/reports/week/20")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.report.title.should.be.equal("Report comming soon");

                    done();
                });
        });
    });
});
