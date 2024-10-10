const test = require('ava')
const hash = require('../../hash')
const unicodify = require('../../utils/unicodify')

test('unicodification', t => {
  t.snapshot(
    ['fifteen', 'stitches', 'and', 'a', 'soft', 'parody'].map(word =>
      unicodify(hash(word), word)
    )
  )
})
