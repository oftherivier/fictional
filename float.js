var hash = require('./hash')

module.exports = function float(input) {
  var whole = hash(input)
  return +(whole + '.' + hash(whole))
}
