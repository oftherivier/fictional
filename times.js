var hash = require('./hash')
var hash2 = hash.hash2
var fit = require('./utils/fit')

function times(a, b, c) {
  return b != null && c != null ? timesMain(a, b, c) : timesCurried(a, b)
}

function timesMain(input, range, maker) {
  var ids = hash.sequence2(input, 'times')
  var n =
    typeof range === 'number'
      ? range
      : fit(ids.next().value, range[0], range[1])
  var i = -1
  var results = []

  if (typeof maker === 'function')
    while (++i < n) {
      results.push(maker(ids.next().value))
    }
  else while (++i < n) results.push(maker)

  return results
}

function timesCurried(range, maker) {
  return function timesCurriedFn(input) {
    return timesMain(input, range, maker)
  }
}

module.exports = times
