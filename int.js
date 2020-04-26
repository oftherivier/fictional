var hash = require('./hash')
var fit = require('./internal/fit')

function int(input, opts) {
  opts = opts || 0
  var min = opts.min
  var max = opts.max
  var id = hash(input)
  return fit(id, min, max)
}

int.options = function intOptions(opts) {
  return function intOptionsFn(input) {
    return int(input, opts)
  }
}

module.exports = int
