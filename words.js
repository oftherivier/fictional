var hash = require('./hash')
var conj = require('./internal/conj')
var fit = require('./internal/fit')
var defaults = require('./internal/defaults')
var word = require('./word')

var DEFAULT_MIN_SYLLABLES = 1
var DEFAULT_MIN_WORDS = 2
var DEFAULT_MAX_WORDS = 3
var DEFAULT_CAPITALIZE = true

function words(input, opts) {
  opts = opts || 0
  var minSyllables = defaults(opts.minSyllables, DEFAULT_MIN_SYLLABLES)
  var capitalize = defaults(opts.capitalize, DEFAULT_CAPITALIZE)
  var shouldCapitalizeFirst = capitalize || capitalize === 'first'
  var shouldCapitalizeAll = capitalize === 'all'
  var min = defaults(opts.min, DEFAULT_MIN_WORDS)
  var max = defaults(opts.max, DEFAULT_MAX_WORDS)

  var id = hash(input)
  var n = fit(id, min, max)
  var i = 0

  id = hash([id, 'words', i])

  var firstOpts = conj(opts, {
    minSyllables: minSyllables,
    capitalize: shouldCapitalizeFirst
  })

  var restOpts = conj(opts, {
    minSyllables: minSyllables,
    capitalize: shouldCapitalizeAll
  })

  var result = word(id, firstOpts)

  while (++i < n) {
    id = hash([id, 'words', i])
    result += ' ' + word(id, restOpts)
  }

  return result
}

words.options = function wordsOptions(opts) {
  var base = this
  wordsFn.options = words.options
  return wordsFn

  function wordsFn(input, overrides) {
    return base(input, conj(opts, overrides))
  }
}

module.exports = words
