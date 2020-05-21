const test = require('ava')
const fit = require('../../utils/fit')

test('lo != nil && hi != nil', t => {
  t.is(fit(23, 2, 21), 5)
  t.is(fit(4, 2, 3), 2)
  t.is(fit(5, 2, 3), 3)
})

test('hi == nil', t => {
  t.is(fit(23, 2), 23)
})

test('lo > hi', t => {
  t.is(fit(23, 3, 2), 3)
})

test('lo == hi', t => {
  t.is(fit(23, 2, 2), 2)
})

test('lo == nil', t => {
  t.is(fit(21, undefined, 21), 21)
  t.is(fit(22, undefined, 21), 0)
  t.is(fit(23, undefined, 21), 1)
})

test('floats', t => {
  t.is(fit(23.32, 3, 5), 4.32)
  t.is(fit(23.32, 0, 23), 0.32)
})
