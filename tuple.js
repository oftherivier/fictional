var hash = require('./hash')
var hash2 = hash.hash2
var resolve = require('./utils/resolve')

function tuple(a, b) {
  return b != null ? tupleMain(a, b) : tupleCurried(a)
}

function tupleMain(input, fns) {
  var id = hash2(input, 'tuple')
  var n = fns.length
  var i = -1
  var results = []

  while (++i < n) {
    id = hash(id)
    results.push(resolve(id, fns[i]))
  }

  return results
}

function tupleCurried(fns) {
  return function tupleCurriedFn(input) {
    return tupleMain(input, fns)
  }
}

module.exports = tuple
