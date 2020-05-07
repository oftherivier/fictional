var hash = require('./hash')
var conj = require('./utils/conj')
var fit = require('./utils/fit')
var defaults = require('./utils/defaults')
var word = require('./word')

var DEFAULT_MIN_SYLLABLES = 1
var DEFAULT_MIN_WORDS = 2
var DEFAULT_MAX_WORDS = 3
var DEFAULT_CAPITALIZE = 'first'

function words(input, opts) {
  opts = opts || 0
  var minSyllables = defaults(opts.minSyllables, DEFAULT_MIN_SYLLABLES)
  var capitalize = defaults(opts.capitalize, DEFAULT_CAPITALIZE)
  var shouldCapitalizeAll = capitalize === true || capitalize === 'all'
  var shouldCapitalizeFirst = shouldCapitalizeAll || capitalize === 'first'
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
  var next = result
  var prev

  while (++i < n) {
    prev = next

    do {
      id = hash([id, 'words', i])
      next = word(id, restOpts)
    } while (next.length === prev.length)

    result += ' ' + next
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
