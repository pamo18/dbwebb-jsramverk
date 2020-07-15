/* global it describe */

process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

chai.use(chaiHttp);

describe('Register', () => {
    describe('POST /register', () => {
        it('should get 200 HAPPY PATH correct details', (done) => {
            let person = {
                name: "test1",
                birthday: "04/10/1980",
                country: "uk",
                email: "testing@mail.com",
                password: "password"
            };

            chai.request(server)
                .post("/register")
                .send(person)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.should.have.property("data");

                    done();
                });
        });
    });

    describe('POST /register', () => {
        it('should get 500 as name already exists', (done) => {
            let person = {
                name: "doe",
                birthday: "04/10/1980",
                country: "uk",
                email: "testing@mail.com",
                password: "password"
            };

            chai.request(server)
                .post("/register")
                .send(person)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.an("object");

                    done();
                });
        });
    });

    describe('POST /register', () => {
        it('should get 500 as cannot hash empty password', (done) => {
            let person = {
                name: "test2",
                birthday: "04/10/1980",
                country: "uk",
                email: "testing@mail.com",
                password: null
            };

            chai.request(server)
                .post("/register")
                .send(person)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.an("object");

                    done();
                });
        });
    });
});
