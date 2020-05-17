var hash = require('./hash')
var fitRanges = require('./utils/fitRanges')
var fromCodePoint = require('./utils/fromCodePoint')

var VALUES_THRESHOLD = 256

var char = charInRanges([
  // ascii
  [0x61, 0x7a],

  // latin1
  [0x0020, 0x007e],
  [0x00a0, 0x00ff]
])

char.inRanges = charInRanges

char.unicode = char
char.ascii = charInRanges([[0x61, 0x7a]])
char.latin1 = charInRanges([
  [0x0020, 0x007e],
  [0x00a0, 0x00ff]
])
char.asciiLower = charInRanges([[0x61, 0x7a]])
char.asciiUpper = charInRanges([[0x41, 0x5a]])
char.digit = charInRanges([[0x30, 0x39]])
char.latin1Upper = charInRanges([
  [0xdf, 0xf6],
  [0xf8, 0xff]
])
char.latin1Lower = charInRanges([
  [0xc0, 0xd6],
  [0xd8, 0xde]
])

char.asciiLetter = charInRanges([char.asciiLower, char.asciiUpper])
char.latin1Letter = charInRanges([char.latin1Lower, char.latin1Upper])
char.alphanumeric = charInRanges([char.asciiLetter, char.digit])
char.lower = charInRanges([char.asciiLower, char.latin1Lower])
char.upper = charInRanges([char.latin1Upper, char.latin1Upper])
char.letter = charInRanges([char.asciiLetter, char.latin1Letter])

function charInRanges(ranges) {
  ranges = normalizeRanges(ranges)
  var fitFn = fitRanges(ranges, VALUES_THRESHOLD)

  charFn.__fictional_char = {
    ranges: ranges
  }

  return charFn

  function charFn(input) {
    return fromCodePoint(fitFn(hash([input, 'char'])))
  }
}

function normalizeRanges(ranges) {
  ranges = [].concat(ranges)
  var results = []
  var i = -1
  var n = ranges.length
  var range

  while (++i < n) {
    range = ranges[i]

    if (range.__fictional_char) {
      results.push.apply(results, range.__fictional_char.ranges)
    } else {
      results.push(range)
    }
  }

  return results
}

module.exports = char
