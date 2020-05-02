var hash = require('./hash')
var conj = require('./utils/conj')
var fit = require('./utils/fit')
var defaults = require('./utils/defaults')

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

var DEFAULT_MIN_SYLLABLES = 2
var DEFAULT_MAX_SYLLABLES = 4
var DEFAULT_CAPITALIZE = true

function word(input, opts) {
  opts = opts || 0
  var shouldCapitalize = defaults(opts.capitalize, DEFAULT_CAPITALIZE)
  var minSyllables = defaults(opts.minSyllables, DEFAULT_MIN_SYLLABLES)
  var maxSyllables = defaults(opts.maxSyllables, DEFAULT_MAX_SYLLABLES)
  var id = hash(input)
  var n = fit(id, minSyllables, maxSyllables)

  var result = ''
  var i = -1

  while (++i < n) {
    id = hash([id, 'word', i])
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
