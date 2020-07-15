/* global it describe */

process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

chai.use(chaiHttp);

describe('Edit report', () => {
    describe('POST /reports/edit', () => {
        it('should get 201 HAPPY PATH valid report', (done) => {
            let report = {
                title: "Kmom03",
                content: "test"
            };

            chai.request(server)
                .post("/reports/edit")
                .send(report)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");

                    done();
                });
        });
    });

    describe('POST /reports/edit', () => {
        it('should get 500 empty content', (done) => {
            let report = {
                title: "Kmom03",
                content: null
            };

            chai.request(server)
                .post("/reports/edit")
                .send(report)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.an("object");

                    done();
                });
        });
    });
});
