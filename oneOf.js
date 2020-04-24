var hash = require('./hash')

function oneOf(inputs, samples) {
  return inputs != null && samples != null
    ? samples[hash(inputs) % samples.length]
    : oneOfCurried(inputs)
}

function oneOfCurried(samples) {
  return function oneOfCurriedFn(inputs) {
    return oneOf(inputs, samples)
  }
}

module.exports = oneOf
