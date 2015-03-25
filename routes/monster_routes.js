'use strict';
var bodyparser = require('body-parser');
var Monster = require('../models/Monster');
var MonsterQ = require('../models/MonsterQ');

module.exports = function(monster) {
  monster.use(bodyparser.json());

  monster.get('/monster_list', function(req, res) {
      if (err) return res.status(500).send({'msg': 'could not retrieve monster(s)'});
      res.json(data);
    });
  });
};
