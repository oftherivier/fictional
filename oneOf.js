var hash = require('./hash')

function oneOf(input, samples) {
  return input != null && samples != null
    ? samples[hash(input) % samples.length]
    : oneOfCurried(input)
}

function oneOfCurried(samples) {
  return function oneOfCurriedFn(input) {
    return oneOf(input, samples)
  }
}

module.exports = oneOf
