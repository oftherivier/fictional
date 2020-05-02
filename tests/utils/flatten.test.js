const tap = require('tap')
const flatten = require('../../utils/flatten')

tap.test('flatten', t => {
  t.deepEquals(flatten([[1, [2, [[3], [[[4]]]]]]]), [1, 2, 3, 4])
  t.end()
})

tap.test('empty items', t => {
  t.deepEquals(flatten([2, [], 3]), [2, 3])
  t.end()
})
