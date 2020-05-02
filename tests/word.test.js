const tap = require('tap')
const { word } = require('..')
const { isCapitalized } = require('./utils')

tap.test('capitalize', t => {
  t.assert(isCapitalized(word(21, { capitalize: true })))
  t.assert(!isCapitalized(word(21, { capitalize: false })))
  t.end()
})

tap.only('unicode', t => {
  t.assert(!hasUnicode(word(null, { unicode: false })))
  t.assert(hasUnicode(word(null, { unicode: true })))
  t.assert(!hasUnicode(word(null, { unicode: 0 })))
  t.assert(hasUnicode(word(null, { unicode: 1 })))
  t.assert(hasUnicode(word(23, { unicode: 0.99 })))
  t.assert(!hasUnicode(word(23, { unicode: 0.01 })))
  t.end()
})

function hasUnicode(s) {
  return !!s.split('').find(c => c.charCodeAt(0) > 122)
}
