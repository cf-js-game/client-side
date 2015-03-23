'use strict';

var mongoose = require('mongoose');

/**
 * Item Slot:
 * - helmet
 * - pauldrons
 * - cuirass
 * - greaves
 * - boots
 * - amulet
 * - ring
 * - mainHand
 * - offHand
 * - twoHand
 *
 * Item Stats:
 * - {
 *     hp: '10',
 *     mp: '5',
 *     str: '5',
 *     dex: '5',
 *     vit: '5',
 *     ene: '5'
 *   }
 *
 * Weapon Exclusive Stats:
 *  // range of 1 should indicate melee
 *  - {
 *      damage: '3',
 *      range: '1'
 *    }
 *
 * Armor Exclusive Stats:
 *  - {
 *      armor: '5'
 *    }
 */

var itemSchema = new mongoose.Schema({
  slot: {type: String, required: true},
  name: {type: String, required: true},
  stats: {type: String, required: true}
});

module.exports = mongoose.model('Item', itemSchema);