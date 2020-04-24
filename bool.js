var hash = require('./hash')

module.exports = function bool(inputs) {
  return !!(hash(inputs) % 2)
}
