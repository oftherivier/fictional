var hash = require('./hash')
var fit = require('./utils/fit')
var conj = require('./utils/conj')
var defaults = require('./utils/defaults')

function int(input, opts) {
  opts = opts || 0
  var min = defaults(opts.min, 0)
  var max = defaults(opts.max, Number.MAX_SAFE_INTEGER)
  var id = hash(input)
  return fit(id, min, max)
}

int.options = function intOptions(opts) {
  var base = this
  intFn.options = int.options
  return intFn

  function intFn(input, overrides) {
    return base(input, conj(opts, overrides))
  }
}

module.exports = int
