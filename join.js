var tuple = require('./tuple')

function join(a, b, c) {
  return a != null && b != null && c == null
    ? joinCurried(a, b)
    : joinMain(a, b, c)
}

function joinMain(id, joinerFn, makerFns) {
  return joinerFn(tuple(id, makerFns))
}

function joinCurried(joinerFn, makerFns) {
  return function joinFn(id) {
    return joinMain(id, joinerFn, makerFns)
  }
}

module.exports = join
