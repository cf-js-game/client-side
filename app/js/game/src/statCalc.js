'use strict';

/**
 * This function does NOT handle:
 * - xp / leveling
 * - currentHP / currentMP
 */

/**
 * statCalc takes in a character object calculating and updating all core stats
 * @param  {[Character]} char [the current player]
 * @return {[undefined]} undefined [function only has side effects]
 */
var statCalc = function(char) {
  /**
   * Parse Char
   */
  var stat = {
    level: char.level,
    range: 0,
    damage: 0,
    armor: 0,
    speed: 1.5,
    str: char.level,
    dex: char.level,
    vit: Math.floor(char.level / 2.5),
    ene: Math.floor(char.level / 2.5),
    maxHP: 0,
    maxMP: 0,
    regenHP: 0,
    regenMP: 0
  };

  // Item Stat Calculations
  for (var key in char.paperDoll) {
    if (char.paperDoll[key]) {
      var itemJSON = JSON.parse(char.paperDoll[key]);
      for (var atribute in itemJSON.stats){
        stat[atribute] += parseInt(itemJSON.stats[atribute], 10);
      }
    }
  }

  // (no weapon equipped) For when you just need to hit something!
  if (stat.damage === 0) { stat.damage = 1; }
  if (stat.range === 0) { stat.range = 1; }

  /**
   * Derivative Calculations
   */
  // armor: Damage formula should use armor like so:
  // (damage formula: damageTaken = damage - (damage * ((armor / 3) / 100)))
  stat.armor += Math.floor(stat.str / 3);

  // speed: lvl 1-100 possible range: 1.5 - 5.5
  stat.speed += stat.dex / 50;

  // maxHP (@lvl100: Min: 296, Probable: 376, Max: 536)
  stat.maxHP += Math.floor(stat.level / 1.3) + 4 * stat.vit + 20;

  // maxMP
  stat.maxMP += Math.floor(stat.level / 1.3) + Math.floor(4.2 * stat.ene) + 20;

  // regenHP (Should tick once per second)
  stat.regenHP += stat.maxHP / 30;

  // regenMP (Should tick once per second)
  stat.regenMP += stat.maxMP / 20;

  /**
   * Update Char
   */
  for (key in stat) {
    char[key] = stat[key];
  }
};

module.exports = statCalc;
