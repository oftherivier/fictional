exports.isCapitalized = s =>
  s[0].toUpperCase() === s[0] && s.slice(1).toLowerCase() === s.slice(1)

exports.diffBetween = function diffBetween(a, b) {
  if (a === b) {
    return 0
  }

  if (a > b) {
    return diffBetween(b, a)
  }

  return (b - a) / (b || 1)
}
