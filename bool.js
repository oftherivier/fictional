var hash = require('./internal/hash')

module.exports = function bool(inputs) {
  return !!(hash(inputs) % 2)
}
