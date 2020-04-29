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
  var minWords = defaults(opts.minWords, DEFAULT_MIN_WORDS)
  var maxWords = defaults(opts.maxWords, DEFAULT_MAX_WORDS)

  var id = hash(input)
  var n = fit(id, minWords, maxWords)
  id = hash([id, 'words', i])

  var result = word(id, {
    minSyllables: minSyllables,
    capitalize: shouldCapitalizeFirst
  })

  var restOpts = {
    minSyllables: minSyllables,
    capitalize: shouldCapitalizeAll
  }

  var i = 0

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
