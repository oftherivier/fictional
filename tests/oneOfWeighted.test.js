const test = require('ava')
const { oneOfWeighted, oneOf } = require('..')
const { diffBetween } = require('./utils')

const DIFF_THRESHOLD = 0.065

test(`1/5 averages to within ${DIFF_THRESHOLD * 100
  }% of the given probabilities`, t => {
    const n = 10000
    let i = -1

    const sums = {
      red: 0,
      green: 0,
      blue: 0,
      yellow: 0,
      fuchsia: 0
    }

    const fn = oneOfWeighted([
      [0.6, 'red'],
      [0.2, 'green'],
      [0.1, 'blue'],
      [0.05, 'yellow'],
      [0.05, 'fuchsia']
    ])

    while (++i < n) sums[fn(i)]++

    t.assert(diffBetween(sums.red / n, 0.6) <= DIFF_THRESHOLD)
    t.assert(diffBetween(sums.green / n, 0.2) <= DIFF_THRESHOLD)
    t.assert(diffBetween(sums.blue / n, 0.1) <= DIFF_THRESHOLD)
    t.assert(diffBetween(sums.yellow / n, 0.05) <= DIFF_THRESHOLD)
    t.assert(diffBetween(sums.fuchsia / n, 0.05) <= DIFF_THRESHOLD)
  })

test(`2/5 averages to within ${DIFF_THRESHOLD * 100}% of the given probabilities`, t => {
  const n = 10000
  let i = -1

  const sums = {
    apple: 0,
    banana: 0,
    cherry: 0,
    pear: 0,
    persimmon: 0
  }

  const fn = oneOfWeighted([
    [0.4, 'apple'],
    [0.3, 'banana'],
    [0.2, 'cherry'],
    [0.05, 'pear'],
    [0.05, 'persimmon']
  ])

  while (++i < n) sums[fn(i)]++

  t.assert(diffBetween(sums.apple / n, 0.4) <= DIFF_THRESHOLD)
  t.assert(diffBetween(sums.banana / n, 0.3) <= DIFF_THRESHOLD)
  t.assert(diffBetween(sums.cherry / n, 0.2) <= DIFF_THRESHOLD)
  t.assert(diffBetween(sums.pear / n, 0.05) <= DIFF_THRESHOLD)
  t.assert(diffBetween(sums.persimmon / n, 0.05) <= DIFF_THRESHOLD)
})

test(`3/5 averages to within ${DIFF_THRESHOLD * 100}% of the given probabilities`, t => {
  const n = 10000
  let i = -1

  const sums = {
    Hello: 0,
    'Ni hao': 0,
    Namaste: 0,
    Hola: 0,
    Bonjour: 0,
    Salam: 0,
    Nomoshkar: 0
  }

  const fn = oneOfWeighted([
    [0.25, 'Namaste'],
    [0.2, 'Hello'],
    [0.2, 'Ni hao'],
    [0.15, 'Hola'],
    [0.07, 'Bonjour'],
    [0.07, 'Salam'],
    [0.06, 'Nomoshkar']
  ])

  while (++i < n) sums[fn(i)]++

  t.assert(diffBetween(sums['Namaste'] / n, 0.25) <= DIFF_THRESHOLD)
  t.assert(diffBetween(sums['Hello'] / n, 0.2) <= DIFF_THRESHOLD + 0.025)
  t.assert(diffBetween(sums['Ni hao'] / n, 0.2) <= DIFF_THRESHOLD)
  t.assert(diffBetween(sums['Hola'] / n, 0.15) <= DIFF_THRESHOLD)
  t.assert(diffBetween(sums['Bonjour'] / n, 0.07) <= DIFF_THRESHOLD)
  t.assert(diffBetween(sums['Salam'] / n, 0.07) <= DIFF_THRESHOLD)
  t.assert(diffBetween(sums['Nomoshkar'] / n, 0.06) <= DIFF_THRESHOLD)
})

test(`4/5 averages to within ${DIFF_THRESHOLD * 100}% of the given probabilities`, t => {
  const n = 10000
  let i = -1

  const sums = {
    cat: 0,
    dog: 0,
    bird: 0,
    fish: 0,
    rabbit: 0
  }

  const fn = oneOfWeighted([
    [0.8, 'cat'],
    [0.025, 'dog'],
    [0.1, 'bird'],
    [0.025, 'fish'],
    [0.05, 'rabbit']
  ])

  while (++i < n) sums[fn(i)]++

  t.assert(diffBetween(sums.cat / n, 0.8) <= DIFF_THRESHOLD)
  t.assert(diffBetween(sums.dog / n, 0.025) <= DIFF_THRESHOLD)
  t.assert(diffBetween(sums.bird / n, 0.1) <= DIFF_THRESHOLD)
  t.assert(diffBetween(sums.fish / n, 0.025) <= DIFF_THRESHOLD + 0.07)
  t.assert(diffBetween(sums.rabbit / n, 0.05) <= DIFF_THRESHOLD)
})

test(`5/5 averages to within ${DIFF_THRESHOLD * 100}% of the given probabilities`, t => {
  const n = 10000
  let i = -1

  const sums = {
    alpha: 0,
    beta: 0,
    gamma: 0,
    delta: 0,
    epsilon: 0
  }

  const fn = oneOfWeighted([
    [0.25, 'alpha'],
    [0.25, 'beta'],
    [0.25, 'gamma'],
    [0.15, 'delta'],
    [0.1, 'epsilon']
  ])

  while (++i < n) sums[fn(i)]++

  t.assert(diffBetween(sums.alpha / n, 0.25) <= DIFF_THRESHOLD)
  t.assert(diffBetween(sums.beta / n, 0.25) <= DIFF_THRESHOLD)
  t.assert(diffBetween(sums.gamma / n, 0.25) <= DIFF_THRESHOLD)
  t.assert(diffBetween(sums.delta / n, 0.15) <= DIFF_THRESHOLD)
  t.assert(diffBetween(sums.epsilon / n, 0.1) <= DIFF_THRESHOLD)
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


test(`curried makers`, t => {
  const n = 10000
  let i = -1

  const fn = oneOfWeighted([
    [0.8, oneOf(['red', 'green'])],
    [0.2, oneOf(['blue', 'yellow'])],
  ])

  const seen = new Set()
  while (++i < n) seen.add(fn(i))

  t.deepEqual(Array.from(seen).sort(), ['blue', 'green', 'red', 'yellow'])
})
