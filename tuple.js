var hash = require('./hash')

module.exports = function tuple(a, b) {
  return a != null && b != null ? tupleMain(a, b) : tupleCurried(a)
}

function tupleMain(inputs, fns) {
  var id = hash(inputs)
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
  return function tupleCurriedFn(inputs) {
    return tupleMain(inputs, fns)
  }
}
