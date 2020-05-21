var hash = require('./hash')
var hash2 = hash.hash2
var resolve = require('./utils/resolve')

function oneOf(a, b) {
  return b != null ? oneOfMain(a, b) : oneOfCurried(a)
}

function oneOfMain(input, samples) {
  var id = hash2(input, 'oneOf')
  return resolve(id, samples[id % samples.length])
}

function oneOfCurried(samples) {
  return function oneOfCurriedFn(input) {
    return oneOf(input, samples)
  }
}

module.exports = oneOf
