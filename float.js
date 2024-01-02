var hash = require('./hash')
var conj = require('./utils/conj')
var defaults = require('./utils/defaults')

function float(input, opts) {
  var min = defaults(opts.min, 0)
  var max = defaults(opts.max, Number.MAX_SAFE_INTEGER)
  return (hash(input) / Number.MAX_SAFE_INTEGER) * (max - min) + min
}

float.options = function floatOptions(opts) {
  var base = this
  floatFn.options = float.options
  return floatFn

  function floatFn(input, overrides) {
    return base(input, conj(opts, overrides))
  }
}

module.exports = float
