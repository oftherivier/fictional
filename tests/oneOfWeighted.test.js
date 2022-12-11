const test = require('ava')
const { oneOfWeighted } = require('..')
const { diffBetween } = require('./utils')

const DIFF_THRESHOLD = 0.05

test(`averages to within ${
  DIFF_THRESHOLD * 100
}% of the given probabilities`, t => {
  const n = 10000
  let i = -1

  const sums = {
    red: 0,
    green: 0,
    blue: 0
  }

  const fn = oneOfWeighted([
    [0.6, 'red'],
    [0.1, 'green'],
    [0.3, 'blue']
  ])

  while (++i < n) sums[fn(i)]++

  t.assert(diffBetween(sums.red / n, 0.6) <= DIFF_THRESHOLD)
  t.assert(diffBetween(sums.green / n, 0.1) <= DIFF_THRESHOLD)
  t.assert(diffBetween(sums.blue / n, 0.3) <= DIFF_THRESHOLD)
})

test(`unassigned probabilities`, t => {
  const n = 10000
  let i = -1

  const sums = {
    a: 0,
    b: 0,
    c: 0,
    d: 0
  }

  const fn = oneOfWeighted([
    [0.2, 'a'],
    [true, 'b'],
    [0.3, 'c']
  ])

  while (++i < n) sums[fn(i)]++

  t.assert(diffBetween(sums.b / n, 0.5) <= DIFF_THRESHOLD)
})

test(`empty samples`, t => {
  t.throws(() => {
    oneOfWeighted(null, [])
  })
})

test(`probabilities add up to < 1`, t => {
  t.throws(() =>
    oneOfWeighted(null, [
      [0.2, 'a'],
      [0.3, 'b']
    ])
  )
})

test(`probabilities add up to > 1`, t => {
  t.throws(() =>
    oneOfWeighted(null, [
      [0.2, 'a'],
      [0.9, 'b']
    ])
  )
})

test(`omitted probabilities`, t => {
  t.throws(() =>
    oneOfWeighted(null, [
      [0.2, 'a'],
      [0.9, 'b']
    ])
  )
})
