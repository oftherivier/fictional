const tap = require('tap')
const fit = require('../../internal/fit')

tap.test('lo!=nil && hi!=nil', t => {
  t.equals(fit(23, 2, 21), 6)
  t.end()
})

tap.test('hi=nil', t => {
  t.equals(fit(23, 2), 25)
  t.end()
})

tap.test('lo=nil', t => {
  t.equals(fit(23, undefined, 21), 2)
  t.end()
})
