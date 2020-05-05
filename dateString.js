var hash = require('./hash')
var defaults = require('./utils/defaults')
var conj = require('./utils/conj')
var fit = require('./utils/fit')

var MIN_YEAR = 1980
var MAX_YEAR = 2019

function dateString(input, opts) {
  var id = hash(input)

  opts = opts || 0
  var minYear = defaults(opts.minYear, MIN_YEAR)
  var maxYear = defaults(opts.maxYear, MAX_YEAR)

  // for simplicity, use 28d as max regardless of month/year
  var year = fit(id, minYear, maxYear)
  var monthIndex = fit(id, 0, 11)
  var day = fit(id, 1, 28)
  var hour = fit(id, 0, 23)
  var min = fit(id, 0, 59)
  var millisec = fit(id, 0, 1000)

  return new Date(
    Date.UTC(year, monthIndex, day, hour, min, millisec)
  ).toISOString()
}

dateString.options = function dateStringOptions(opts) {
  var base = this
  dateStringFn.options = dateString.options
  return dateStringFn

  function dateStringFn(input, overrides) {
    return base(input, conj(opts, overrides))
  }
}

module.exports = dateString
