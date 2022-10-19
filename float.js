var hash = require('./hash')
var conj = require('./utils/conj')
var fit = require('./utils/fit')
var decimalFit = require('./utils/decimalFit')
var defaults = require('./utils/defaults')
var Decimal = require('decimal.js')

function float(input, opts) {
  opts = opts || 0

  var min = defaults(opts.min, 0)
  var max = defaults(opts.max, Number.MAX_SAFE_INTEGER)

  // rehash to differentiate from `int`
  var whole = hash(hash(input))

  var decimalPlaces = decimalFit(hash(whole), 2, 5)
  var decimalDivisor = Decimal.pow(10, decimalPlaces)

  var v = decimalFit(whole, min, max).div(decimalDivisor)

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
