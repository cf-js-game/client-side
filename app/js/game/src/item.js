'use strict';

/**
 * Instantiate this as: var Item = require('<path to this file>');
 * Call it like so: Item.spawn(charLvl, mod); // mod is optional
 * ex: Item.spawn(10, 10);
 * ex: Item.spawn(20);
 */

var slots = {
  armor: ['helmet', 'pauldrons', 'cuirass', 'greaves', 'boots'],
  jewelry: ['amulet', 'ring'],
  weapon: ['mainHand', 'offHand', 'twoHand']
};

var subType = {
  "mainHand": ["sword", "axe", "maul"],
  "offHand": ["shield", "dagger", "scimitar"],
  "twoHand": ["staff", "bow", "great sword", "great axe", "great maul"]
};

var str = [{"name": " of dust", "str": "1"},
           {"name": " of lumps", "str": "2"},
           {"name": " of grit", "str": "3"},
           {"name": " of rage", "str": "4"},
           {"name": " of the brawler", "str": "5"},
           {"name": " of the hero", "str": "6"},
           {"name": " of the champion", "str": "7"},
           {"name": " of the giant", "str": "8"},
           {"name": " of the juggernaut", "str": "9"},
           {"name": " of the titan", "str": "10"}];

var dex = [{"name": " of tripping", "dex": "1"},
           {"name": " of folly", "dex": "2"},
           {"name": " of stealth", "dex": "3"},
           {"name": " of guile", "dex": "4"},
           {"name": " of the rogue", "dex": "5"},
           {"name": " of the rapscallion", "dex": "6"},
           {"name": " of the shadow", "dex": "7"},
           {"name": " of the unknown", "dex": "8"},
           {"name": " of the serpent", "dex": "9"},
           {"name": " of the dragon", "dex": "10"}];

var vit = [{"name": " of grool", "vit": "1"},
           {"name": " of slop", "vit": "2"},
           {"name": " of fodder", "vit": "3"},
           {"name": " of substance", "vit": "4"},
           {"name": " of the larder", "vit": "5"},
           {"name": " of the oak", "vit": "6"},
           {"name": " of the tiger", "vit": "7"},
           {"name": " of the bear", "vit": "8"},
           {"name": " of the mammoth", "vit": "9"},
           {"name": " of the behemoth", "vit": "10"}];

var ene = [{"name": " of prestidigitation", "ene": "1"},
           {"name": " of knowledge", "ene": "2"},
           {"name": " of sorcery", "ene": "3"},
           {"name": " of wizardry", "ene": "4"},
           {"name": " of the mage", "ene": "5"},
           {"name": " of the summoner", "ene": "6"},
           {"name": " of the thaumaturge", "ene": "7"},
           {"name": " of the darkness", "ene": "8"},
           {"name": " of the whispers", "ene": "9"},
           {"name": " of the arcane", "ene": "10"}];

var armor = [{"name": "Tattered ", "armor": "1"},
            {"name": "Ragged ", "armor": "2"},
            {"name": "Leather ", "armor": "3"},
            {"name": "Heard Leather ", "armor": "4"},
            {"name": "Rusty ", "armor": "5"},
            {"name": "Iron ", "armor": "6"},
            {"name": "Steel ", "armor": "7"},
            {"name": "Onyx ", "armor": "8"},
            {"name": "Ornate ", "armor": "9"},
            {"name": "Infernal ", "armor": "10"}];

var jewelry = [{"name": "Mundane ", "armor": "1", "damage": "1"},
               {"name": "Inconsequential ", "armor": "2", "damage": "2"},
               {"name": "Petulant ", "armor": "3", "damage": "3"},
               {"name": "Common ", "armor": "4", "damage": "4"},
               {"name": "Thrumming ", "armor": "5", "damage": "5"},
               {"name": "Ruby ", "armor": "6", "damage": "6"},
               {"name": "Emerald ", "armor": "7", "damage": "7"},
               {"name": "Onyx ", "armor": "8", "damage": "8"},
               {"name": "Ornate ", "armor": "9", "damage": "9"},
               {"name": "Infernal ", "armor": "10", "damage": "10"}];

var weapon = [{"name": "Dilapidated ", "damage": "3"},
              {"name": "Crude ", "damage": "6"},
              {"name": "Plain ", "damage": "9"},
              {"name": "Quality ", "damage": "12"},
              {"name": "Superior ", "damage": "15"},
              {"name": "Elite ", "damage": "18"},
              {"name": "Gleaming ", "damage": "21"},
              {"name": "Onyx ", "damage": "24"},
              {"name": "Dreaded ", "damage": "27"},
              {"name": "Infernal ", "damage": "30"}];

var weapon2h = [{"name": "Dilapidated ", "damage": "5"},
                {"name": "Crude ", "damage": "8"},
                {"name": "Plain ", "damage": "12"},
                {"name": "Quality ", "damage": "15"},
                {"name": "Superior ", "damage": "19"},
                {"name": "Elite ", "damage": "23"},
                {"name": "Gleaming ", "damage": "28"},
                {"name": "Onyx ", "damage": "33"},
                {"name": "Dreaded ", "damage": "39"},
                {"name": "Infernal ", "damage": "45"}];

var affix = {
  pre: {
    armor: armor,
    jewelry: jewelry,
    weapon: weapon,
    weapon2h: weapon2h
  },
  suf: {
    armor: [str, dex, vit, ene],
    jewelry: [str, dex, vit, ene],
    melee: [str, vit],
    range: [dex, vit],
    magic: [ene, vit]
  }
};

var Item = function() {
  return {
    random: function(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },

    _getKind: function() {
      var rng = this.random(0, 99);
      var type; // armor, jewelry, weapon

      // armor: 0 to 49     | 50%
      // jewelry: 50 to 64  | 15%
      // weapon: 65 to 99   | 35%
      if (rng < 50) {type = 'armor';}
      else if (rng < 65) {type = 'jewelry';}
      else if (rng < 100) {type = 'weapon';}

      var slot = slots[type][this.random(0, slots[type].length - 1)];
      var subtype;

      if (type === 'weapon') {
        subtype = subType[slot][this.random(0,subType[slot].length - 1)];
      } else {
        subtype = slot;
      }

      var kind = {"type": type, "slot": slot, "subType": subtype};

      return kind;
    },

    _getAffixes: function(kind, charLvl, mod) {
      var prefix;
      var suffix;
      var suffixRNG;

      // min/max tier loot
      var op = Math.floor((charLvl + mod) / 10) > 9; // Over Powered
      var maxTier = op ? 9 : Math.floor((charLvl + mod) / 10);
      var minTier = Math.floor((maxTier / 1.5));

      // Don't refactor the 1-10 rng rolls, if they run concurrently node is so
      // fast you have a high chance of getting the same cpu seed for random
      if (kind.type === 'armor') {
        prefix = affix.pre.armor[this.random(minTier, maxTier)];

        suffixRNG = this.random(0, affix.suf.armor.length - 1);
        suffix = affix.suf.armor[suffixRNG][this.random(minTier, maxTier)];
      }
      if (kind.type === 'jewelry') {
        prefix = affix.pre.jewelry[this.random(minTier, maxTier)];

        suffixRNG = this.random(0, affix.suf.jewelry.length - 1);
        suffix = affix.suf.jewelry[suffixRNG][this.random(minTier, maxTier)];
      }
      if (kind.type === 'weapon') {
        if (kind.slot === 'mainHand') {
          prefix = affix.pre.weapon[this.random(minTier, maxTier)];

          suffixRNG = this.random(0, affix.suf.melee.length - 1);
          suffix = affix.suf.melee[suffixRNG][this.random(minTier, maxTier)];
        }
        if (kind.slot === 'offHand') {
          if (kind.subType === 'shield') {
            prefix = affix.pre.armor[this.random(minTier, maxTier)];

            suffixRNG = this.random(0, affix.suf.melee.length - 1);
            suffix = affix.suf.melee[suffixRNG][this.random(minTier, maxTier)];
          } else {
            prefix = affix.pre.weapon[this.random(minTier, maxTier)];

            suffixRNG = this.random(0, affix.suf.melee.length - 1);
            suffix = affix.suf.melee[suffixRNG][this.random(minTier, maxTier)];
          }
        }
        if (kind.slot === 'twoHand') {
          if (kind.subType === 'staff') {
            prefix = affix.pre.weapon2h[this.random(minTier, maxTier)];

            suffixRNG = this.random(0, affix.suf.magic.length - 1);
            suffix = affix.suf.magic[suffixRNG][this.random(minTier, maxTier)];
          }
          if (kind.subType === 'bow') {
            prefix = affix.pre.weapon2h[this.random(minTier, maxTier)];

            suffixRNG = this.random(0, affix.suf.range.length - 1);
            suffix = affix.suf.range[suffixRNG][this.random(minTier, maxTier)];
          } else {
            prefix = affix.pre.weapon2h[this.random(minTier, maxTier)];

            suffixRNG = this.random(0, affix.suf.melee.length - 1);
            suffix = affix.suf.melee[suffixRNG][this.random(minTier, maxTier)];
          }
        }
      }

      return {"prefix": prefix, "suffix": suffix};
    },

    // charLvl = character level
    // mod = integer modifier (1-100). mod is optional
    // every 10 will potential bump up the quality of the loot one tier
    spawn: function(charLvl, mod) {
      mod = mod || 0;
      var kind = this._getKind();
      var affixes = this._getAffixes(kind, charLvl, mod);

      var affixStats = {};

      var key;
      for (key in affixes.prefix) {
        if (key !== 'name') {
          affixStats[key] = affixes.prefix[key];
        }
      }

      for (key in affixes.suffix) {
        if (key !== 'name') {
          affixStats[key] = affixes.suffix[key];
        }
      }

      // weapon range
      switch (kind.subType) {
        case 'sword':
        case 'axe':
        case 'maul':
          affixStats.range = 1;
          break;
        case 'great sword':
        case 'great axe':
        case 'great maul':
          affixStats.range = 2;
          break;
        case 'staff':
          affixStats.range = 3;
          break;
        case 'bow':
          affixStats.range = 6;
          break;
      }

      var item = {
        slot: kind.slot,
        name: affixes.prefix.name + kind.subType + affixes.suffix.name,
        stats: affixStats
      };

      return item;
    }
  };
};

module.exports = Item;