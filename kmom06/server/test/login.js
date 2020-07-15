/* global it describe */

process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

chai.use(chaiHttp);

describe('Login', () => {
    describe('POST /login', () => {
        it('should get 200 HAPPY PATH correct details', (done) => {
            let person = {
                name: "doe",
                password: "doe"
            };

            chai.request(server)
                .post("/login")
                .send(person)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.should.have.property("data");

                    done();
                });
        });
    });

    describe('POST /login', () => {
        it('should get 200 HAPPY PATH but wrong name', (done) => {
            let person = {
                name: "does",
                password: "doe"
            };

            chai.request(server)
                .post("/login")
                .send(person)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.should.have.property("data");
                    res.body.data.result.should.be.equal(false);

                    done();
                });
        });
    });

    describe('POST /login', () => {
        it('should get 200 HAPPY PATH but wrong password', (done) => {
            let person = {
                name: "doe",
                password: "does"
            };

            chai.request(server)
                .post("/login")
                .send(person)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.should.have.property("data");
                    res.body.data.result.should.be.equal(false);

                    done();
                });
        });
    });
});
