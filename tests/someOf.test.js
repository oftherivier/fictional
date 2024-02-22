const test = require('ava')
const { someOf } = require('..')

test('no repeats', t => {
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

    t.is(result.length, new Set(result.slice().sort()).size)
  }
})

test('constant count', t => {
  let i = -1

  while (++i < 50) {
    t.is(someOf(i, 2, ['a', 'b', 'c', 'd']).length, 2)
  }
})

test('samples exhausted before count', t => {
  const result = someOf(null, [5, 5], ['i', 'think'])
  t.is(result.length, 2)
})

test('ranges', t => {
  let i = -1

  while (++i < 50) {
    const result = someOf(
      i,
      [2, 5],
      ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k']
    )

    t.truthy(
      2 <= result.length && result.length <= 5,
      `${result.length} is not between 2 and 5`
    )
  }
})
