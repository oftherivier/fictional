const test = require('ava')
const { times } = require('..')

test('non-fn makers', t => {
  t.deepEqual(times(null, [2, 2], 23), [23, 23])
})

test('constant count', t => {
  t.deepEqual(
    times(null, 2, () => 23),
    [23, 23]
  )
})
