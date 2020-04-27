var hasOwnProperty = Object.prototype.hasOwnProperty

module.exports = function conj(a, b) {
  var result = {}
  var k

  if (a) {
    for (k in a) {
      if (hasOwnProperty.call(a, k)) {
        result[k] = a[k]
      }
    }
  }

  if (b) {
    for (k in b) {
      if (hasOwnProperty.call(b, k)) {
        result[k] = b[k]
      }
    }
  }

  return result
}
