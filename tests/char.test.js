const test = require('ava')
const { char } = require('..')

test('char.inRanges: tuple ranges', t => {
  let i = -1
  const fn = char.inRanges([
    [0x61, 0x62],
    [0x63, 0x64]
  ])
  const results = new Set()

  while (++i < 100) {
    results.add(fn(i))
  }

  t.deepEqual([...results].sort(), ['a', 'b', 'c', 'd'])
})

test('char.inRanges: composition', t => {
  let i = -1
  const ab = char.inRanges([[0x61, 0x62]])
  const cd = char.inRanges([[0x63, 0x64]])
  const fn = char.inRanges([ab, cd])
  const results = new Set()

  while (++i < 100) {
    results.add(fn(i))
  }

  t.deepEqual([...results].sort(), ['a', 'b', 'c', 'd'])
})
