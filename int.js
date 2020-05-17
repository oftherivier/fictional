var hash = require('./hash')
var fit = require('./utils/fit')
var conj = require('./utils/conj')

function int(input, opts) {
  opts = opts || 0
  var min = opts.min
  var max = opts.max
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
