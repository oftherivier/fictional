var hash = require('./hash')
var conj = require('./internal/conj')
var fit = require('./internal/fit')
var defaults = require('./internal/defaults')
var words = require('./words')

var DEFAULT_MIN_CLAUSES = 1
var DEFAULT_MAX_CLAUSES = 2
var DEFAULT_MIN_SYLLABLES = 1
var DEFAULT_MIN_WORDS = 5
var DEFAULT_MAX_WORDS = 8

function sentence(input, opts) {
  opts = opts || 0
  var minSyllables = defaults(opts.minSyllables, DEFAULT_MIN_SYLLABLES)
  var minWords = defaults(opts.minWords, DEFAULT_MIN_WORDS)
  var maxWords = defaults(opts.minWords, DEFAULT_MAX_WORDS)
  var minClauses = defaults(opts.minClauses, DEFAULT_MIN_CLAUSES)
  var maxClauses = defaults(opts.maxClauses, DEFAULT_MAX_CLAUSES)

  var id = hash(input)
  var n = fit(id, minClauses, maxClauses)
  var i = 0
  id = hash([id, 'sentence', i])

  var firstOpts = conj(opts, {
    capitalize: true,
    min: minWords,
    max: maxWords,
    minSyllables: minSyllables
  })

  var restOpts = conj(firstOpts, { capitalize: false })

  var result = words(id, firstOpts)

  while (++i < n) {
    id = hash([id, 'sentence', i])
    result += ', ' + words(id, restOpts)
  }

  return result + '.'
}

sentence.options = function sentenceOptions(opts) {
  var base = this
  sentenceFn.options = sentence.options
  return sentenceFn

  function sentenceFn(input, overrides) {
    return base(input, conj(opts, overrides))
  }
}

module.exports = sentence
