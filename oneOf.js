var hash = require('./hash')

function oneOf(a, b) {
  return a != null && b != null ? oneOfMain(a, b) : oneOfCurried(a)
}

function oneOfMain(input, samples) {
  var id = hash(input)
  var result = samples[id % samples.length]
  return typeof result === 'function' ? result(hash([id, 'oneOf'])) : result
}

function oneOfCurried(samples) {
  return function oneOfCurriedFn(input) {
    return oneOf(input, samples)
  }
}

module.exports = oneOf
