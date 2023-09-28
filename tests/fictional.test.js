const fictional = require('..')
const test = require('ava')

const { oneOf, oneOfWeighted, someOf, tuple, shape, join, times, word } =
  fictional

const curriedMakerDefs = [
  [oneOf, ['red', 'green', 'blue']],
  [
    oneOfWeighted,
    [
      [0.6, 'red'],
      [0.1, 'green'],
      [0.3, 'blue']
    ]
  ],
  [
    someOf,
    [3, 5],
    [
      'i',
      'think',
      'it',
      'is',
      'beautiful',
      'that',
      'you',
      'are',
      '256',
      'colors',
      'too'
    ]
  ],
  [
    tuple,
    [oneOf(['Privet', 'Parkway', 'Cherry']), oneOf(['Drive', 'Street', 'Road'])]
  ],
  [
    shape,
    {
      a: word,
      b: word
    }
  ],
  [times, [2, 5], word],
  [
    join,
    ' ',
    [oneOf(['Privet', 'Parkway', 'Cherry']), oneOf(['Drive', 'Street', 'Road'])]
  ]
]

const nonMakerSet = new Set(['expandRange', 'fromCodePoint'])

const curriedMakers = {}

curriedMakerDefs.forEach(
  ([fn, ...args]) => (curriedMakers[fn.name] = fn(...args))
)

const makers = {
  ...Object.fromEntries(
    Object.entries(fictional).filter(([name]) => !nonMakerSet.has(name))
  ),
  ...curriedMakers
}

test('generated values', t => {
  let i = -1
  const results = []

  while (++i < 50) {
    results.push(callMakers(i))
  }

  t.snapshot(results)
})

test('consistency', t => {
  let i = -1
  const firstResult = callMakers(23)

  while (++i < 100) {
    t.deepEqual(callMakers(23), firstResult)
  }
})

test('curried makers', t => {
  for (const [fn, ...args] of curriedMakerDefs) {
    t.deepEqual(fn(23, ...args), fn(...args)(23))
    t.deepEqual(fn(null, ...args), fn(...args)(null))
  }
})

test('.options() chaining', t => {
  for (const fn of Object.values(makers)) {
    if (fn.options) {
      t.assert(typeof fn.options({}).options({}).options === 'function')
    }
  }
})

function callMakers(input) {
  const result = {}

  for (const name of Object.keys(makers)) {
    result[name] = makers[name](input)
  }

  return result
}
