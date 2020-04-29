module.exports = function fit(v, lo, hi) {
  lo = lo || 0
  return hi == null ? v + lo : (v % (hi + 1 - lo)) + lo
}
