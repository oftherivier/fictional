var hash = require('./hash')
var conj = require('./internal/conj')
var fit = require('./internal/fit')
var defaults = require('./internal/defaults')
var sentence = require('./sentence')

var DEFAULT_MIN_SENTENCES = 4
var DEFAULT_MAX_SENTENCES = 5

function paragraph(input, opts) {
  opts = opts || 0
  var minSentences = defaults(opts.minSentences, DEFAULT_MIN_SENTENCES)
  var maxSentences = defaults(opts.maxSentences, DEFAULT_MAX_SENTENCES)

  var id = hash(input)
  var n = fit(id, minSentences, maxSentences)
  var i = 0
  id = hash([id, 'paragraph', i])

  var result = sentence(id, opts)

  while (++i < n) {
    id = hash([id, 'paragraph', i])
    result += ' ' + sentence(id, opts)
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