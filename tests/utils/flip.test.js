const test = require('ava')
const flip = require('../../utils/flip')
const { diffBetween } = require('../utils')

const DIFF_THRESHOLD = 0.05

const INPUT_PROBABILITIES = [
  0,
  1,
  0.5,
  0.75,
  0.382,
  0.618,
  1 / 4,
  3 / 4,
  0.1,
  0.2,
  0.3,
  0.4,
  0.5,
  0.6,
  0.7,
  0.8,
  0.9
]

test(
  `averages to within ${DIFF_THRESHOLD * 100}% of the given probability`,
  t => {
    for (const p of INPUT_PROBABILITIES) {
      let i = -1
      const results = []
      while (++i < 10000) results.push(+flip(i, p))

      const mean = results.reduce((a, b) => a + b) / results.length
      const diff = diffBetween(mean, p)

      t.assert(diff <= DIFF_THRESHOLD)
    }

  }
)
