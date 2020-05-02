const tap = require('tap')
const unicodify = require('../../utils/unicodify')

tap.test('unicodification', t => {
  t.matchSnapshot(
    ['fifteen', 'stitches', 'and', 'a', 'soft', 'parody'].map(word =>
      unicodify(word, word)
    )
  )

  t.end()
})
