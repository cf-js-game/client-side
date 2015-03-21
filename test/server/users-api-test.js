'use strict';

process.env.MONGO_URI = 'mongodb://localhost/jsgame_test';
require('../../server.js');
var chai = require('chai');
var chaihttp = require('chai-http');
var mongoose = require('mongoose');
var User = require('../../models/User');

chai.use(chaihttp);

var expect = chai.expect;

var testEmail = 'test@example.com';
var testPassword = 'your cats name';
var testUserName = 'dragon84217';
var routesBase = 'localhost:3000/api/v1';

describe('user endpoints', function () {
  var id;
  var tempToken;

  before(function (done) {
    var newUser = new User();
    newUser.basic.email = testEmail;
    newUser.basic.password = newUser.generateHash(testPassword);
    newUser.username = testUserName;
    newUser.save(function (err, user) {
      if (err) return console.error('could not create user');
      chai.request(routesBase)
        .get('/sign_in')
        .auth(testEmail, testPassword)
        .end(function (err, res) {
          tempToken = res.body.token;
          done();
        });
    });
  });

  after(function (done) {
    mongoose.connection.db.dropDatabase(function () {
      done();
    });
  });

  it('should create a user', function (done) {
    chai.request(routesBase)
      .post('/create_user')
      .send({"email": "t2@example.com", "password": testPassword, "username": "Tom Bombadil"})
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('should sign-in', function (done) {
      chai.request(routesBase)
        .get('/sign_in')
        .auth(testEmail, testPassword)
        .end(function (err, res) {
          expect(err).to.eql(null);
          expect(res.body).to.have.property('token');
          done();
        });
    });

    it('should fail to create a user', function (done) {
    chai.request(routesBase)
      .post('/create_user')
      .send({"email": testEmail, "password": testPassword, "username": testUserName})
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.eql({ msg: 'could not create user' });
        done();
      });
  });
});
