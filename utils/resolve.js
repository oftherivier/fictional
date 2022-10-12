var hash = require('../hash')

module.exports = function resolve(id, v, options) {
  return typeof v === 'function' ? v(hash(id), options) : v
}
