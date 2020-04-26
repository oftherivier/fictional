var hash = require('./hash')
var defaults = require('./internal/defaults')

var VOWELS = 'aeiou'
var CONSONANT = 'bcdfghjklmnpqrstvwxyz'
var VOWELS_LEN = VOWELS.length
var CONSONANT_LEN = CONSONANT.length

var MAX_SYLLABLES = 10
var MIN_SYLLABLES = 4

function word(input, opts) {
  opts = opts || 0
  var shouldCapitalize = defaults(opts.capitalize, true)
  var id = hash(input)
  var n = Math.max(id % MAX_SYLLABLES, MIN_SYLLABLES)

  var i = -1
  var result = ''

  while (++i < n) {
    id = hash(id)
    result += i % 2 ? vowel(id) : constant(id)
  }

  if (shouldCapitalize) {
    result = capitalize(result)
  }

  return result
}

word.options = function wordOptions(opts) {
  return function wordOptionsFn(input) {
    return word(input, opts)
  }
}

module.exports = word

function vowel(id) {
  return VOWELS[id % VOWELS_LEN]
}

function constant(id) {
  return CONSONANT[id % CONSONANT_LEN]
}

function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1)
}
