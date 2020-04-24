const tap = require('tap')
const { oneOf } = require('..')

tap.test('currying', t => {
  const fn = oneOf(['red', 'green', 'blue'])
  t.equal(fn(23), oneOf(23, ['red', 'green', 'blue']))
  t.end()
})
