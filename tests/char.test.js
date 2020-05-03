const tap = require('tap')
const { times } = require('..')

tap.test('non-fn makers', t => {
  t.deepEquals(times(null, [2, 2], 23), [23, 23])
  t.end()
})

tap.test('constant count', t => {
  t.deepEquals(
    times(null, 2, () => 23),
    [23, 23]
  )
  t.end()
})
