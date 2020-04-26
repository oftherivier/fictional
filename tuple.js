var hash = require('./hash')

module.exports = function tuple(a, b) {
  return a != null && b != null ? tupleMain(a, b) : tupleCurried(a)
}

function tupleMain(input, fns) {
  var id = hash(input)
  var n = fns.length
  var i = -1
  var results = []

  while (++i < n) {
    id = hash(id)
    results.push(fns[i](id))
  }

  return results
}

function tupleCurried(fns) {
  return function tupleCurriedFn(input) {
    return tupleMain(input, fns)
  }
}
