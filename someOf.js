var hash = require('./hash')
var fit = require('./internal/fit')
var resolve = require('./internal/resolve')

function someOf(a, b, c) {
  return b != null && c != null ? someOfMain(a, b, c) : someOfCurried(a, b)
}

function someOfMain(input, range, samples) {
  var id = hash(input)
  var n = typeof range === 'number' ? range : fit(id, range[0], range[1])
  var i = -1
  var results = []
  var remaining = samples.slice()
  var remainingLen
  var chosenIndex
  var chosen

  while (++i < n && (remainingLen = remaining.length)) {
    id = hash([id, 'someOf', i])
    chosenIndex = id % remainingLen
    chosen = remaining[chosenIndex]
    remaining.splice(chosenIndex, 1)
    results.push(resolve(chosen))
  }

  return results
}

function someOfCurried(range, samples) {
  return function someOfCurriedFn(input) {
    return someOf(input, range, samples)
  }
}

module.exports = someOf
