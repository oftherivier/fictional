var hash = require('../hash')

var KNOWN_DENOMINATORS = {
  0.382: 1 / 0.382,
  0.618: 1 / 0.618,
  0.5: 2
}

module.exports = function flip(id, p) {
  p = +p

  if (p === 0) {
    return false
  }

  if (p === 1) {
    return true
  }

  id = hash([id, 'flip'])
  return id % denominatorOf(p) < 1
}

function denominatorOf(p) {
  return KNOWN_DENOMINATORS[p] || 1 / p
}
