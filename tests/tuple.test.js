const tap = require('tap')
const { tuple } = require('..')

tap.test('array items', t => {
  const result = tuple(23, [[(v, suffix) => [v, suffix].join(''), '!']])

  t.match(result, [/^\d+!$/])
  t.end()
})

tap.test('invalid items', t => {
  t.throws(() => tuple(23, [2]))
  t.throws(() => tuple(23, [[3]]))
  t.end()
})

tap.test('currying', t => {
  const fn = v => `${v}!`
  t.deepEquals(tuple(23, [fn]), tuple([fn])(23))
  t.end()
})
