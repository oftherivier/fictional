var hash = require('./hash')
var hash2 = hash.hash2
var resolve = require('./utils/resolve')

function oneOf(a, b, c) {
  return b != null ? oneOfMain(a, b, c) : oneOfCurried(a)
}

function oneOfMain(input, samples, options) {
  var id = hash2(input, 'oneOf')
  return resolve(id, samples[id.mod(samples.length)], options)
}

function oneOfCurried(samples) {
  return function oneOfCurriedFn(input, options) {
    return oneOf(input, samples, options)
  }
}

module.exports = oneOf
