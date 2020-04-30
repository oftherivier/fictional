var tuple = require('./tuple')

function join(a, b, c) {
  return a != null && b != null && c == null
    ? joinCurried(a, b)
    : joinMain(a, b, c)
}

function joinMain(id, joiner, makerFns) {
  var result = tuple(id, makerFns)
  return typeof joiner === 'function' ? joiner(result) : result.join(joiner)
}

function joinCurried(joiner, makerFns) {
  return function joinFn(id) {
    return joinMain(id, joiner, makerFns)
  }
}

module.exports = join
