const tap = require('tap')
const { tuple } = require('..')

tap.test('currying', t => {
  const fn = v => `${v}!`
  t.deepEquals(tuple(23, [fn]), tuple([fn])(23))
  t.end()
})
