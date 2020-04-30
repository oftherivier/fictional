const tap = require('tap')
const fit = require('../../internal/fit')

tap.test('lo != nil && hi != nil', t => {
  t.equals(fit(23, 2, 21), 5)
  t.equals(fit(4, 2, 3), 2)
  t.equals(fit(5, 2, 3), 3)
  t.end()
})

tap.test('hi == nil', t => {
  t.equals(fit(23, 2), 23)
  t.end()
})

tap.test('lo > hi', t => {
  t.equals(fit(23, 3, 2), 3)
  t.end()
})

tap.test('lo == hi', t => {
  t.equals(fit(23, 2, 2), 2)
  t.end()
})

tap.test('lo == nil', t => {
  t.equals(fit(21, undefined, 21), 21)
  t.equals(fit(22, undefined, 21), 0)
  t.equals(fit(23, undefined, 21), 1)
  t.end()
})

tap.test('floats', t => {
  t.equals(fit(23.32, 3, 5), 4.32)
  t.equals(fit(23.32, 0, 23), 0.32)
  t.end()
})
