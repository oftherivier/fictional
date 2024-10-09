var hash = require('./hash')
var defaults = require('./utils/defaults')
var conj = require('./utils/conj')
var fit = require('./utils/fit')

var MIN_YEAR = 1980
var MAX_YEAR = 2019

function dateString(input, opts) {
  var id = hash(input)

  opts = opts || 0
  var minDate, maxDate

  // keep older dateString function for backwards compatibility
  if (!opts || (opts.minYear && opts.maxYear)) {
    return dateStringLegacy(input, opts)
  }

  if (opts.min) {
    minDate = new Date(opts.min)
  } else {
    var minYear = defaults(opts.minYear, MIN_YEAR)
    minDate = new Date(Date.UTC(minYear, 0, 1))
  }

  if (opts.max) {
    maxDate = new Date(opts.max)
  } else {
    var maxYear = defaults(opts.maxYear, MAX_YEAR)
    maxDate = new Date(Date.UTC(maxYear, 11, 31, 23, 59, 59, 999))
  }

  var min = minDate.getTime()
  var max = maxDate.getTime()

  var time = fit(id, min, max)

  return new Date(time).toISOString()
}

function dateStringLegacy(input, opts) {
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
