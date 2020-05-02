var isArray = Array.isArray

module.exports = function flatten(vals) {
  var result = []
  var n = vals.length
  var i = -1
  var val

  while (++i < n) {
    val = vals[i]

    if (isArray(val)) {
      result.push.apply(result, flatten(val))
    } else {
      result.push(val)
    }
  }

  return result
}
