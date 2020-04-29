const tap = require('tap')
const fit = require('../../internal/fit')

tap.test('lo!=nil && hi!=nil', t => {
  t.equals(fit(23, 2, 21), 5)
  t.end()
})

tap.test('hi=nil', t => {
  t.equals(fit(23, 2), 25)
  t.end()
})

tap.test('lo=nil', t => {
  t.equals(fit(21, undefined, 21), 21)
  t.equals(fit(22, undefined, 21), 0)
  t.equals(fit(23, undefined, 21), 1)
  t.end()
})
