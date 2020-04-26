const tap = require('tap')
const { word } = require('..')

tap.test('capitalize', t => {
  t.assert(isCapitalized(word(21, { capitalize: true })))
  t.assert(!isCapitalized(word(21, { capitalize: false })))
  t.end()
})

tap.test('.options()', t => {
  t.equals(
    word.options({ capitalize: false })(23),
    word(23, { capitalize: false })
  )

  t.end()
})

function isCapitalized(s) {
  return s[0].toUpperCase() === s[0] && s.slice(1).toLowerCase() === s.slice(1)
}
