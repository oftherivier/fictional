const Seq = require('../../internal/Seq')
const tap = require('tap')

tap.test('Seq', t => {
  const s = new Seq(23)
  t.matchSnapshot(Array(100).fill().map(s.next.bind(s)))
  t.end()
})
