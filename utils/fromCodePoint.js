var fromCharCode = String.fromCharCode

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint
module.exports =
  String.fromCodePoint ||
  function fromCodePointPolyfill() {
    var codeUnits = [],
      codeLen = 0,
      result = ''
    for (var index = 0, len = arguments.length; index !== len; ++index) {
      var codePoint = +arguments[index]
      if (!(codePoint < 0x10ffff && codePoint >>> 0 === codePoint))
        throw RangeError('Invalid code point: ' + codePoint)
      if (codePoint <= 0xffff) {
        codeLen = codeUnits.push(codePoint)
      } else {
        codePoint -= 0x10000
        codeLen = codeUnits.push(
          (codePoint >> 10) + 0xd800, // highSurrogate
          (codePoint % 0x400) + 0xdc00 // lowSurrogate
        )
      }
      if (codeLen >= 0x3fff) {
        result += fromCharCode.apply(null, codeUnits)
        codeUnits.length = 0
      }
    }

    return result + fromCharCode.apply(null, codeUnits)
  }
