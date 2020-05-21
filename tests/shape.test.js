const test = require('ava')
const { shape } = require('..')

test('non-fn makers', t => {
  t.deepEqual(
    shape(null, {
      a: () => 2,
      b: 3
    }),
    {
      a: 2,
      b: 3
    }
  )
})
