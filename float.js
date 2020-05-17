var hash = require('./hash')
var conj = require('./utils/conj')
var fit = require('./utils/fit')

function float(input, opts) {
  opts = opts || 0

  var min = opts.min
  var max = opts.max

  // rehash to differentiate from `int`
  var whole = hash(hash(input))
  var v = +(whole + '.' + hash(whole))

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
