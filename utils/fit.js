module.exports = function fit(v, min, max) {
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

  if (Math.floor(v) !== v) {
    max = max - 1
  }

  return (v % (max + 1 - min)) + min
}
