var hash = require('./hash')
var conj = require('./utils/conj')
var fit = require('./utils/fit')
var defaults = require('./utils/defaults')
var sentence = require('./sentence')

var DEFAULT_MIN_SENTENCES = 3
var DEFAULT_MAX_SENTENCES = 7

function paragraph(input, opts) {
  opts = opts || 0
  var minSentences = defaults(opts.minSentences, DEFAULT_MIN_SENTENCES)
  var maxSentences = defaults(opts.maxSentences, DEFAULT_MAX_SENTENCES)

  var ids = hash.sequence2(input, 'paragraph')
  var n = fit(ids.next().value, minSentences, maxSentences)
  var i = 0

  var result = sentence(ids.next().value, opts)

  while (++i < n) {
    result += ' ' + sentence(ids.next().value, opts)
  }

  return result
}

paragraph.options = function paragraphOptions(opts) {
  var base = this
  paragraphFn.options = paragraph.options
  return paragraphFn

  function paragraphFn(input, overrides) {
    return base(input, conj(opts, overrides))
  }
}

module.exports = paragraph
