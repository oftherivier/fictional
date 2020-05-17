var hash = require('./hash')
var fitRanges = require('./utils/fitRanges')
var fromCodePoint = require('./utils/fromCodePoint')

var VALUES_THRESHOLD = 256

var ascii = charInRanges([[0x20, 0x7e]])
var latin1 = charInRanges([
  [0x20, 0x7e],
  [0xa0, 0xff]
])

var digit = charInRanges([[0x30, 0x39]])
var asciiLower = charInRanges([[0x61, 0x7a]])
var asciiUpper = charInRanges([[0x41, 0x5a]])
var latin1Lower = charInRanges([
  [0xc0, 0xd6],
  [0xd8, 0xde]
])
var latin1Upper = charInRanges([
  [0xdf, 0xf6],
  [0xf8, 0xff]
])

var char = charInRanges([asciiLower, asciiUpper, digit])
char.inRanges = charInRanges

char.alphanumeric = charInRanges([char])
char.ascii = ascii
char.latin1 = latin1
char.unicode = charInRanges([ascii, latin1])
char.digit = digit
char.lower = char.asciiLower = asciiLower
char.upper = char.asciiUpper = asciiUpper
char.latin1Lower = latin1Lower
char.latin1Upper = latin1Upper
char.letter = char.asciiLetter = charInRanges([asciiLower, asciiUpper])
char.latin1Letter = charInRanges([latin1Lower, latin1Upper])
char.alphanumeric = charInRanges([asciiLower, asciiUpper, digit])
char.unicodeLower = charInRanges([asciiLower, latin1Lower])
char.unicodeUpper = charInRanges([asciiUpper, latin1Upper])

function charInRanges(ranges) {
  ranges = normalizeRanges(ranges)
  var fitFn = fitRanges(ranges, VALUES_THRESHOLD)

  charFn.__fictional_char = {
    ranges: ranges
  }

  return charFn

  function charFn(input) {
    return fromCodePoint(fitFn(hash(input)))
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
