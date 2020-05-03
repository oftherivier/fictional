var hash = require('../hash')

module.exports = function flip(id, p) {
  p = +p

  if (p === 0) {
    return false
  }

  if (p === 1) {
    return true
  }

  id = hash([id, 'flip'])
  return id % (1 / p) < 1
}
