module.exports = function flip(id, p) {
  p = typeof p === 'boolean' ? +p : p

  if (p === 0) {
    return false
  }

  if (p === 1) {
    return true
  }

  return id % (1 / p) < 1
}
