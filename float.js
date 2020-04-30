var hash = require('./hash')

module.exports = function float(input) {
  var whole = hash([input, 'float', 0])
  return +(whole + '.' + hash([whole, 'float', 1]))
}
