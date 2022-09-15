const test = require('ava')
const hash = require('../../hash')
const fitRanges = require('../../utils/fitRanges')

function oneOf(values) {
  return id => values[id.mod(values.length)]
}

function run(fn, max) {
  const n = 10
  let i = -1
  const results = Array(max + 1).fill(0)
  while (++i < n) results[fn(hash(i))]++
  return results
}

test('virtualizing', t => {
  const fn = fitRanges([
    [0, 5],
    [8, 10],
    [12, 13]
  ])

  const baselineFn = oneOf([0, 1, 2, 3, 4, 5, 8, 9, 10, 12, 13])

  t.deepEqual(run(fn, 13), run(baselineFn, 13))
})

test('min > 0', t => {
  const fn = fitRanges([
    [3, 5],
    [8, 10],
    [12, 13]
  ])

  const baselineFn = oneOf([3, 4, 5, 8, 9, 10, 12, 13])

  t.deepEqual(run(fn, 13), run(baselineFn, 13))
})

test('offset calculation: collisions', t => {
  const fn = fitRanges([
    [3, 10],
    [4, 7],
    [12, 13]
  ])

  const baselineFn = oneOf([3, 4, 5, 6, 7, 8, 9, 10, 12, 13])

  t.deepEqual(run(fn, 13), run(baselineFn, 13))
})

test('offset calculation: equal mins', t => {
  const fn = fitRanges([
    [3, 10],
    [3, 7],
    [12, 13]
  ])

  const baselineFn = oneOf([3, 4, 5, 6, 7, 8, 9, 10, 12, 13])

  t.deepEqual(run(fn, 13), run(baselineFn, 13))
})

test('offset calculation: equal maxs', t => {
  const fn = fitRanges([
    [4, 10],
    [3, 10],
    [12, 13]
  ])

  const baselineFn = oneOf([3, 4, 5, 6, 7, 8, 9, 10, 12, 13])

  t.deepEqual(run(fn, 13), run(baselineFn, 13))
})

test('offset calculation: adjacent ranges', t => {
  const fn = fitRanges([
    [0, 2],
    [3, 4]
  ])

  const baselineFn = oneOf([0, 1, 2, 3, 4])

  t.deepEqual(run(fn, 4), run(baselineFn, 4))
})

test('offset calculation: singleton ranges', t => {
  const fn = fitRanges([
    [0, 2],
    [5, 5]
  ])

  const baselineFn = oneOf([0, 1, 2, 5])

  t.deepEqual(run(fn, 5), run(baselineFn, 5))
})

test('ranges.length == 0', t => {
  t.throws(() => fitRanges([]))
})

test('ranges.length == 1', t => {
  const fn = fitRanges([[0, 2]])
  const baselineFn = oneOf([0, 1, 2])

  t.deepEqual(run(fn, 2), run(baselineFn, 2))
})

test('ranges.length == 2', t => {
  const fn = fitRanges([
    [0, 2],
    [4, 5]
  ])

  const baselineFn = oneOf([0, 1, 2, 4, 5])

  t.deepEqual(run(fn, 5), run(baselineFn, 5))
})
