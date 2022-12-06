var { fast1a52 } = require('fnv-plus')
var stringify = require('fast-json-stable-stringify')

function hash(input) {
  return fast1a52(stringify(input) + hash.salt)
}

hash.salt = 'chino'

hash.hash2 = function hash2(a, b) {
  return hash(a) + hash(b)
}

hash.hash3 = function hash3(a, b, c) {
  return hash(a) + hash(b) + hash(c)
}

module.exports = hash
