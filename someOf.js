var hash = require('./hash')
var fit = require('./utils/fit')
var resolve = require('./utils/resolve')

function someOf(a, b, c) {
  return b != null && c != null ? someOfMain(a, b, c) : someOfCurried(a, b)
}

function someOfMain(input, range, samples) {
  var ids = hash.sequence2(input, 'someOf')
  var n =
    typeof range === 'number'
      ? range
      : fit(ids.next().value, range[0], range[1])
  var i = -1
  var results = []
  var remaining = samples.slice()
  var remainingLen
  var chosenIndex
  var chosen
  var id

  while (++i < n && (remainingLen = remaining.length)) {
    id = ids.next().value
    chosenIndex = id % remainingLen
    chosen = remaining[chosenIndex]
    remaining.splice(chosenIndex, 1)
    results.push(resolve(id, chosen))
  }

  return results
}

function someOfCurried(range, samples) {
  return function someOfCurriedFn(input) {
    return someOf(input, range, samples)
  }
}

module.exports = someOf
