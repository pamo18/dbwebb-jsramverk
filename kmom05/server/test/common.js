/* global it describe */

process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

chai.use(chaiHttp);

describe('common', () => {
    describe('GET /common/countries', () => {
        it('200 HAPPY PATH getting common countries', (done) => {
            chai.request(server)
                .get("/common/countries")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");

                    done();
                });
        });
    });

    describe('POST /common/countries', () => {
        it('should get 201 HAPPY PATH', (done) => {
            let common = {
                "countries": "Germany,Poland,Belgium"
            };

            chai.request(server)
                .post("/common/countries")
                .send(common)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    res.body.should.have.property("data");

                    done();
                });
        });
    });

    describe('POST /common/countries', () => {
        it('should get 500 nothing posted', (done) => {
            chai.request(server)
                .post("/common/countries")
                .send(null)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.an("object");

                    done();
                });
        });
    });
});
