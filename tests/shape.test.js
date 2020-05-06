const tap = require('tap')
const { shape } = require('..')

tap.test('non-fn makers', t => {
  t.deepEquals(
    shape(null, {
      a: () => 2,
      b: 3
    }),
    {
      a: 2,
      b: 3
    }
  )
  t.end()
})
