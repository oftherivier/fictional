var hash = require('./hash')
var conj = require('./utils/conj')
var defaults = require('./utils/defaults')
var fit = require('./utils/fit')
var fromCodePoint = require('./utils/fromCodePoint')

var DEFAULT_RANGES = [
  // ascii lower
  [0x61, 0x7a],

  // ascii upper
  [0x41, 0x5a],

  // latin-1 supplement lower
  [0xdf, 0xf6],
  [0xf8, 0xff],

  // latin-1 supplement upper
  [0xc0, 0xd6],
  [0xd8, 0xde],

  // digits
  [0x30, 0x39]
]

function char(input, opts) {
  opts = opts || 0
  var ranges = defaults(opts.ranges, DEFAULT_RANGES)

  var id = hash([input, 'char', 0])
  var range = ranges[id % ranges.length]

  id = hash([id, 'char', 1])
  return fromCodePoint(fit(id, range[0], range[1]))
}

char.options = function charOptions(opts) {
  var base = this
  charFn.options = char.options
  return charFn

  function charFn(input, overrides) {
    return base(input, conj(opts, overrides))
  }
}

module.exports = char
