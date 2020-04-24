var Seq = require('./internal/Seq')

var VOWELS = 'aeiou'
var CONSONANT = 'bcdfghjklmnpqrstvwxyz'
var VOWELS_LEN = VOWELS.length
var CONSONANT_LEN = CONSONANT.length

var MAX_SYLLABLES = 10
var MIN_SYLLABLES = 4

module.exports = function word(id) {
  var n = Math.max(id % MAX_SYLLABLES, MIN_SYLLABLES)

  var ids = new Seq(id)
  var i = -1
  var result = ''

  while (++i < n) result += i % 2 ? vowel(ids.next()) : constant(ids.next())

  return result
}

function vowel(id) {
  return VOWELS[id % VOWELS_LEN]
}

function constant(id) {
  return CONSONANT[id % CONSONANT_LEN]
}
