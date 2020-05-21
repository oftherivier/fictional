const test = require('ava')
const flatten = require('../../utils/flatten')

test('flatten', t => {
  t.deepEqual(flatten([[1, [2, [[3], [[[4]]]]]]]), [1, 2, 3, 4])
})

test('empty items', t => {
  t.deepEqual(flatten([2, [], 3]), [2, 3])
})
