const tap = require('tap')
const hash = require('../../hash')
const unicodify = require('../../utils/unicodify')

tap.test('unicodification', t => {
  t.matchSnapshot(
    ['fifteen', 'stitches', 'and', 'a', 'soft', 'parody'].map(word =>
      unicodify(hash(word), word)
    )
  )

  t.end()
})
