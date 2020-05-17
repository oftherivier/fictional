var hash = require('./hash')
var hash2 = hash.hash2
var resolve = require('./utils/resolve')

var hasOwnProperty = Object.prototype.hasOwnProperty

function shape(a, b) {
  return b != null ? shapeMain(a, b) : shapeCurried(a)
}

function shapeMain(input, properties) {
  var id = hash(input)
  var results = {}

  for (var k in properties) {
    if (hasOwnProperty.call(properties, k)) {
      results[k] = resolve(hash2(id, k), properties[k])
    }
  }

  return results
}

function shapeCurried(properties) {
  return function shapeCurriedFn(input) {
    return shapeMain(input, properties)
  }
}

module.exports = shape
