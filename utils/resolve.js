var hash = require('../hash')

module.exports = function resolve(id, v) {
  return typeof v === 'function' ? v(hash([id, 'resolve'])) : v
}
