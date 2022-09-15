const decimalFit = require('./decimalFit')

module.exports = function fit(v, min, max) {
  return +decimalFit(v, min, max)
}
