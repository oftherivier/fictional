const tap = require('tap')
const { int } = require('..')

tap.test('min and max', t => {
  const result = int('foo', { min: 3, max: 5 })
  t.assert(result >= 3)
  t.assert(result <= 5)
  t.end()
})

tap.test('.options()', t => {
  t.equals(
    int
      .options({
        min: 2,
        max: 2
      })
      .options({ min: 1 })('foo'),
    int('foo', {
      min: 1,
      max: 2
    })
  )
  t.end()
})
