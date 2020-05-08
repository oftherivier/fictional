var tuple = require('./tuple')
var flatten = require('./utils/flatten')

function join(a, b, c) {
  return b != null && c == null ? joinCurried(a, b) : joinMain(a, b, c)
}

function joinMain(input, joiner, makerFns) {
  var result = flatten(tuple(input, makerFns))
  return typeof joiner === 'function' ? joiner(result) : result.join(joiner)
}

function joinCurried(joiner, makerFns) {
  return function joinFn(input) {
    return joinMain(input, joiner, makerFns)
  }
}

module.exports = join
