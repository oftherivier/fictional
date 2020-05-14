module.exports = function fit(v, min, max) {
  var whole
  var decimals

  min = min || 0

  if (max == null) {
    return v > min ? v : v + min
  }

  max = Math.max(max, min)

  if (min === max) {
    return min
  }

  if (min <= v && v <= max) {
    return v
  }

  whole = Math.floor(v)
  decimals = 0

  if (whole !== v) {
    // avoid rounding errors via intermediate string
    decimals = decimalsOf(v)
    max = max - 1
  }

  return (whole % (max + 1 - min)) + min + decimals
}

function decimalsOf(v) {
  var s = v.toString()
  return +('0' + s.slice(s.indexOf('.')))
}
