var Decimal = require('decimal.js')
var { fast1a52 } = require('fnv-plus')
var stringify = require('fast-json-stable-stringify')

function hash(input) {
  return new Decimal(fast1a52(stringify(input) + hash.salt))
}

hash.salt = 'chino'

hash.hash2 = function hash2(a, b) {
  return hash(a).add(hash(b))
}

hash.hash3 = function hash3(a, b, c) {
  return hash(a).add(hash(b)).add(hash(c))
}

module.exports = hash
