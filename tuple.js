var hash = require('./hash')
var displayType = require('./internal/displayType')

module.exports = function tuple(a, b) {
  return a != null && b != null ? tupleMain(a, b) : tupleCurried(a)
}

function tupleMain(inputs, items) {
  var id = hash(inputs)
  var n = items.length
  var i = -1
  var results = []

  while (++i < n) {
    id = hash(id)
    results.push(callItem(items[i], id))
  }

  return results
}

function callItem(item, id) {
  var fn

  if (typeof item === 'function') {
    return item(id)
  }

  if (Array.isArray(item)) {
    fn = item[0]

    if (typeof fn === 'function') {
      return item[0].apply(null, [id].concat(item.slice(1)))
    }
  }

  throw new Error(
    'tuple() was given an array item of type ' +
      displayType(item) +
      '. Each item in the array given to tuple() must either be a function, or an array with a function as its first item.'
  )
}

function tupleCurried(items) {
  return function tupleCurriedFn(inputs) {
    return tupleMain(inputs, items)
  }
}
