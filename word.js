var hash = require('./hash')
var conj = require('./utils/conj')
var fit = require('./utils/fit')
var flip = require('./utils/flip')
var unicodify = require('./utils/unicodify')
var defaults = require('./utils/defaults')

var LETTERS = require('./lorem.json')

var INT_RANGE = 4294967296

var DEFAULT_MIN_SYLLABLES = 2
var DEFAULT_MAX_SYLLABLES = 4
var DEFAULT_CAPITALIZE = true
var DEFAULT_UNICODE = 0

function word(input, opts) {
  opts = opts || 0
  var shouldCapitalize = defaults(opts.capitalize, DEFAULT_CAPITALIZE)
  var minSyllables = defaults(opts.minSyllables, DEFAULT_MIN_SYLLABLES)
  var maxSyllables = defaults(opts.maxSyllables, DEFAULT_MAX_SYLLABLES)
  var pUnicode = defaults(opts.unicode, DEFAULT_UNICODE)
  var id = hash.hash2(input, 'word')
  var syllableLimit = fit(id, minSyllables, maxSyllables)

  id = hash.sequenceNext(id)

  var result
  var prev
  var next
  var probability
  var candidates
  var candidate
  var candidatesLen
  var candidateLetter
  var candidateProbability
  var nextProbabilityMark
  var syllableCount
  var candidateIndex

  do {
    result = ''
    prev = ''
    syllableCount = 0

    do {
      id = hash.sequenceNext(id)
      probability = id / INT_RANGE

      nextProbabilityMark = 0
      candidates = LETTERS[prev]
      candidatesLen = candidates.length
      candidateIndex = -1
      next = null

      while (++candidateIndex < candidatesLen && next == null) {
        candidate = candidates[candidateIndex]
        candidateLetter = candidate[0]
        candidateProbability = candidate[1]

        nextProbabilityMark += candidateProbability

        if (probability <= nextProbabilityMark) {
          next = candidateLetter
        }
      }

      syllableCount++
      result += next
      prev = next
    } while (syllableCount < syllableLimit && next !== '')
  } while (syllableCount < syllableLimit)

  id = hash.sequenceNext(id)

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
