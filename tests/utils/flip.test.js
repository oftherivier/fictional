const tap = require('tap')
const flip = require('../../utils/flip')

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

tap.test(
  `averages to within ${DIFF_THRESHOLD * 100}% of the given probability`,
  t => {
    INPUT_PROBABILITIES.forEach(test)

    function test(p) {
      let j = -1
      const results = []

      while (++j < 10000) {
        results.push(+flip(j, p))
      }

      const mean = results.reduce((a, b) => a + b) / results.length
      const diff = diffOf(mean, p)
      t.assert(
        diff <= DIFF_THRESHOLD,
        `(p = ${p}) Diff ${diff} > ${DIFF_THRESHOLD}`
      )
    }

    t.end()
  }
)

function diffOf(a, b) {
  if (a === b) {
    return 0
  }

  if (a > b) {
    return diffOf(b, a)
  }

  return (b - a) / (b || 1)
}
