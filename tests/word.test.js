const tap = require('tap')
const { word } = require('..')
const { isCapitalized } = require('./utils')

tap.test('capitalize', t => {
  t.assert(isCapitalized(word(21, { capitalize: true })))
  t.assert(!isCapitalized(word(21, { capitalize: false })))
  t.end()
})
