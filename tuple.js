var hash = require('./hash')
var resolve = require('./internal/resolve')

function tuple(a, b) {
  return b != null ? tupleMain(a, b) : tupleCurried(a)
}

function tupleMain(input, fns) {
  var id = hash(input)
  var n = fns.length
  var i = -1
  var results = []

  while (++i < n) {
    id = hash([id, 'tuple', i])
    results.push(resolve(fns[i], id))
  }

  return results
}

function tupleCurried(fns) {
  return function tupleCurriedFn(input) {
    return tupleMain(input, fns)
  }
}

module.exports = tuple
