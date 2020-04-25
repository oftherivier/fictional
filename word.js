var hash = require('./hash')

var VOWELS = 'aeiou'
var CONSONANT = 'bcdfghjklmnpqrstvwxyz'
var VOWELS_LEN = VOWELS.length
var CONSONANT_LEN = CONSONANT.length

var MAX_SYLLABLES = 10
var MIN_SYLLABLES = 4

module.exports = function word(inputs) {
  var id = hash(inputs)
  var n = Math.max(id % MAX_SYLLABLES, MIN_SYLLABLES)

  var i = -1
  var result = ''

  while (++i < n) {
    id = hash(id)
    result += i % 2 ? vowel(id) : constant(id)
  }

  return result
}

function vowel(id) {
  return VOWELS[id % VOWELS_LEN]
}

function constant(id) {
  return CONSONANT[id % CONSONANT_LEN]
}
