const test = require('ava')
const { tuple } = require('..')

test('non-fn makers', t => {
  t.deepEqual(tuple(null, [() => 2, 3]), [2, 3])
})
