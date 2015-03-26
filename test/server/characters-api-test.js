'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/jsgame_test';
require('../../server.js');
var chai = require('chai');
var chaihttp = require('chai-http');
var mongoose = require('mongoose');
var User = require('../../models/User');
var Character = require('../../models/Character.js');

chai.use(chaihttp);

var expect = chai.expect;

var testEmail = 'test@example.com';
var testPassword = 'your cats name';
var testUserName = 'dragon84217';
var routesBase = 'localhost:3000/api/v1';

describe('character endpoints', function () {
  var tempOwner;
  var tempToken;
  var tempCharId;

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
          tempOwner = user._id;
          done();
        });
    });
  });

  before(function (done) {
    var newCharacter = new Character();
    newCharacter.name = 'PkTeamKilla';
    newCharacter.owner = tempOwner;
    newCharacter.save(function (err, character) {
    if (err) return console.error('could not create character');
    chai.request(routesBase)
      .get('/character_list')
      .send({"token": tempToken})
      .end(function (err, res) {
        tempCharId = character._id;
        done();
      });
    });
  });

  after(function (done) {
    mongoose.connection.db.dropDatabase(function () {
      done();
    });
  });

  it('should make a character', function (done) {
    chai.request(routesBase)
      .post('/character_list')
      .send({"name": "bob", "token": tempToken})
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('bob');
        done();
      });
  });

  it('should update a character', function (done) {
    chai.request(routesBase)
      .put('/character_list/' + tempCharId)
      .send({"name": "Lerch", "baseHP": 99, "token": tempToken})
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('Lerch');
        done();
    });
  });

  it('should get the character list', function (done) {
    chai.request(routesBase)
      .get('/character_list')
      .send({"token": tempToken})
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.body.length).to.eql(2);
        done();
      });
  });

  it('should be able to delete a character', function (done) {
    chai.request(routesBase)
      .delete('/character_list/' + tempCharId)
      .send({"token": tempToken})
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.msg).to.eql('Character with id: ' + tempCharId + ' deleted');
        done();
      });
  });
});
