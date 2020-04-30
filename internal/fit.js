module.exports = function fit(v, lo, hi) {
  lo = lo || 0

  if (hi == null) {
    return v + lo
  }

  hi = Math.max(hi, lo)
  return (v % (hi + 1 - lo)) + lo
}
