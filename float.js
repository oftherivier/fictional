var hash = require('./hash')
var conj = require('./internal/conj')
var fit = require('./internal/fit')

function float(input, opts) {
  opts = opts || 0
  var min = opts.min
  var max = opts.max

  var whole = hash([input, 'float', 0])
  var v = +(whole + '.' + hash([whole, 'float', 1]))

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
