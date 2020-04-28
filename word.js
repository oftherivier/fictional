var hash = require('./hash')
var conj = require('./internal/conj')
var fit = require('./internal/fit')
var defaults = require('./internal/defaults')

var SYLLABLES = [
  'ka',
  'ki',
  'ku',
  'ke',
  'ko',
  'ta',
  'chi',
  'tsu',
  'te',
  'to',
  'sa',
  'shi',
  'su',
  'se',
  'so',
  'na',
  'ni',
  'nu',
  'ne',
  'no',
  'ha',
  'hi',
  'fu',
  'he',
  'ho',
  'ma',
  'mi',
  'mu',
  'me',
  'mo',
  'ya',
  'yu',
  'yo',
  'ra',
  'ri',
  'ru',
  're',
  'ro',
  'wa',
  'wo'
]

var SYLLABLES_LEN = SYLLABLES.length

var MAX_SYLLABLES = 5
var MIN_SYLLABLES = 2

function word(input, opts) {
  opts = opts || 0
  var shouldCapitalize = defaults(opts.capitalize, true)
  var id = hash(input)
  var n = fit(id, MIN_SYLLABLES, MAX_SYLLABLES)

  var result = ''
  var i = -1

  while (++i < n) {
    id = hash(id)
    result += SYLLABLES[id % SYLLABLES_LEN]
  }

  if (shouldCapitalize) {
    result = capitalize(result)
  }

  return result
}

word.options = function wordOptions(opts) {
  var base = this
  wordFn.options = word.options
  return wordFn

  function wordFn(input, overrides) {
    return base(input, conj(opts, overrides))
  }
}

module.exports = word

function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1)
}
