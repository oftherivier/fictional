module.exports = function fit(v, lo, hi) {
  lo = lo || 0
  return hi == null ? v + lo : (v % (hi - lo)) + lo
}
