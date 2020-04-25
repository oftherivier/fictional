var hash = require('./hash')

module.exports = function float(inputs) {
  var whole = hash(inputs)
  return +(whole + '.' + hash(whole))
}
