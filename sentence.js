var hash = require('./hash')
var conj = require('./utils/conj')
var fit = require('./utils/fit')
var defaults = require('./utils/defaults')
var words = require('./words')

var DEFAULT_MIN_CLAUSES = 1
var DEFAULT_MAX_CLAUSES = 2
var DEFAULT_MIN_WORDS = 5
var DEFAULT_MAX_WORDS = 8
var DEFAULT_UNICODE = 0.382

function sentence(input, opts) {
  opts = opts || 0
  var minWords = defaults(opts.minWords, DEFAULT_MIN_WORDS)
  var maxWords = defaults(opts.maxWords, DEFAULT_MAX_WORDS)
  var minClauses = defaults(opts.minClauses, DEFAULT_MIN_CLAUSES)
  var maxClauses = defaults(opts.maxClauses, DEFAULT_MAX_CLAUSES)
  var unicode = defaults(opts.unicode, DEFAULT_UNICODE)

  var id = hash(input)
  var n = fit(id, minClauses, maxClauses)
  var i = 0
  id = hash([id, 'sentence', i])

  var firstOpts = conj(opts, {
    capitalize: true,
    min: minWords,
    max: maxWords,
    unicode: unicode
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
