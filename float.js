var hash = require('./hash')
var conj = require('./utils/conj')
var fit = require('./utils/fit')
var defaults = require('./utils/defaults')

function float(input, opts) {
  opts = opts || 0

  var min = defaults(opts.min, 0)
  var max = defaults(opts.max, Number.MAX_SAFE_INTEGER)

  // rehash to differentiate from `int`
  var whole = hash(hash(input))

  var decimalPlaces = fit(hash(whole), 2, 5)
  var decimalDivisor = Math.pow(10, decimalPlaces)

  var v = fit(whole, min, max) / decimalDivisor

  return fit(v, min, max)
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
