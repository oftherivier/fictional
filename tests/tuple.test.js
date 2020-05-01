const tap = require('tap')
const { tuple } = require('..')

tap.test('non-fn makers', t => {
  t.deepEquals(tuple(null, [() => 2, 3]), [2, 3])
  t.end()
})
