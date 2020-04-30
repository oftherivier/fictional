module.exports = function fit(v, lo, hi) {
  var whole
  var decimals

  lo = lo || 0

  if (hi == null) {
    return v > lo ? v : v + lo
  }

  hi = Math.max(hi, lo)

  if (lo === hi) {
    return lo
  }

  if (lo <= v && v <= hi) {
    return v
  }

  whole = Math.floor(v)
  decimals = 0

  if (whole !== v) {
    // avoid rounding errors via intermediate string
    decimals = decimalsOf(v)
    hi = hi - 1
  }

  return (whole % (hi + 1 - lo)) + lo + decimals
}

function decimalsOf(v) {
  var s = v.toString()
  return +('0' + s.slice(s.indexOf('.')))
}
