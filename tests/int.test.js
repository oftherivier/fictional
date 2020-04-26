const tap = require('tap')
const { int } = require('..')

tap.test('min and max', t => {
  const result = int('foo', { min: 3, max: 5 })
  t.assert(result >= 3)
  t.assert(result <= 5)
  t.end()
})

tap.test('.options()', t => {
  t.equals(int.options({ max: 2 })('foo'), int('foo', { max: 2 }))
  t.end()
})
