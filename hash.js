var md5 = require('md5')
var stringify = require('fast-json-stable-stringify')
var Decimal = require('decimal.js')

hash.salt = 'chino'

hash.hash2 = function hash2(a, b) {
  return hash(hash(a) + hash(b))
}

hash.hash3 = function hash3(a, b, c) {
  return hash(hash(a) + hash(b) + hash(c))
}

function hash(input) {
  return Decimal('0X' + md5(stringify(input) + hash.salt))
}

module.exports = hash
