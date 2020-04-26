var hash = require('./hash')
var fit = require('./internal/fit')

var MIN_YEAR = 1980
var MAX_YEAR = 2019

module.exports = function datestr(input) {
  var id = hash(input)
  // for simplicity, use 28d as max regardless of month/year
  var year = fit(id, MIN_YEAR, MAX_YEAR)
  var monthIndex = fit(id, 0, 11)
  var day = fit(id, 1, 28)
  var hour = fit(id, 0, 23)
  var min = fit(id, 0, 59)
  var millisec = fit(id, 0, 1000)
  return new Date(
    Date.UTC(year, monthIndex, day, hour, min, millisec)
  ).toISOString()
}
