var hash = require('./hash')
var fit = require('./internal/fit')

function times(a, b, c) {
  return b != null && c != null ? timesMain(a, b, c) : timesCurried(a, b)
}

function timesMain(input, range, maker) {
  var id = hash(input)
  var n = typeof range === 'number' ? range : fit(id, range[0], range[1])
  var i = -1
  var results = []

  if (typeof maker === 'function')
    while (++i < n) {
      id = hash([id, 'times', i])
      results.push(maker(id))
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