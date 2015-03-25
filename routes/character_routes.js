'use strict';
var bodyparser = require('body-parser');
var eatAuth = require('../lib/eat-auth');
var Character = require('../models/Character.js');

module.exports = function(app, passport, appSecret) {
  app.use(bodyparser.json());

  app.get('/character_list', eatAuth(appSecret), function(req, res) {
    Character.find({"owner": req.user._id}, function(err, data) {
      if (err) return res.status(500).send({'msg': 'could not retrieve character(s)'});

      res.json(data);
    });
  });

  app.post('/character_list', eatAuth(appSecret), function(req, res) {
    var newCharacter = new Character(req.body);
    newCharacter.owner = req.user._id;
    newCharacter.save(function(err, character) {
      if (err) return res.status(500).send({'msg': 'could not save character'});

      res.json(character);
    });
  });

  app.put('/character_list/:id', eatAuth(appSecret), function(req, res) {
    var updatedCharacter = req.body;
    delete updatedCharacter._id;
    Character.update({_id: req.params.id}, updatedCharacter, function(err) {
      if (err) return res.status(500).send({'msg': 'could not update character'});

      res.json(req.body);
    });
  });

  app.delete('/character_list/:id', eatAuth(appSecret), function (req, res) {
    Character.remove({_id: req.params.id}, function (err) {
      if (err) {
        return res.status(500).send({'msg': 'could not delete character'});
      }

      res.json({msg: 'Character with id: ' + req.params.id + ' deleted'});
    });
  });
};
