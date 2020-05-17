var hash = require('./hash')
var conj = require('./utils/conj')
var fit = require('./utils/fit')
var flip = require('./utils/flip')
var unicodify = require('./utils/unicodify')
var defaults = require('./utils/defaults')

var SYLLABLES = [
  'a',
  'ka',
  'ki',
  'ke',
  'ko',
  'ta',
  'chi',
  'shi',
  'so',
  'na',
  'ni',
  'no',
  'ra',
  'ha',
  'hy',
  'ma',
  'mi',
  'mu',
  'me',
  'mo',
  'yu',
  'yo',
  'kai',
  'va',
  'vi',
  'kin',
  'rae',
  'cea'
]

var SYLLABLES_LEN = SYLLABLES.length

var DEFAULT_MIN_SYLLABLES = 2
var DEFAULT_MAX_SYLLABLES = 4
var DEFAULT_CAPITALIZE = true
var DEFAULT_UNICODE = true

function word(input, opts) {
  opts = opts || 0
  var shouldCapitalize = defaults(opts.capitalize, DEFAULT_CAPITALIZE)
  var minSyllables = defaults(opts.minSyllables, DEFAULT_MIN_SYLLABLES)
  var maxSyllables = defaults(opts.maxSyllables, DEFAULT_MAX_SYLLABLES)
  var pUnicode = defaults(opts.unicode, DEFAULT_UNICODE)
  var id = hash(input)
  var n = fit(id, minSyllables, maxSyllables)

  var result = ''
  var next = ''
  var prev
  var i = -1

  while (++i < n) {
    prev = next

    do {
      id = hash(id)
      next = SYLLABLES[id % SYLLABLES_LEN]
    } while (!syllablesMatch(prev, next))

    result += next
  }

  if (flip(id, pUnicode)) {
    result = unicodify(id, result)
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

function syllablesMatch(prev, next) {
  var prevLen = prev.length
  var lastPrev = prev[prevLen - 1]
  return prev !== next && lastPrev !== next[0] && lastPrev !== next[1]
}
