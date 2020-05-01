const tap = require('tap')
const { someOf } = require('..')

tap.test('no repeats', t => {
  let i = -1

  while (++i < 50) {
    const result = someOf(
      i,
      [5, 5],
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
    )

    t.equals(result.length, new Set(result.slice().sort()).size)
  }

  t.end()
})

tap.test('constant count', t => {
  let i = -1

  while (++i < 50) {
    t.equals(someOf(i, 2, ['a', 'b', 'c', 'd']).length, 2)
  }

  t.end()
})

tap.test('samples exhausted before count', t => {
  const result = someOf(null, [5, 5], ['i', 'think'])
  t.equals(result.length, 2)
  t.end()
})
