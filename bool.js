var hash = require('./hash')

module.exports = function bool(input) {
  return !!(hash([input, 'bool']) % 2)
}
