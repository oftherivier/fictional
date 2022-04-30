var md5 = require('md5')
var stringHash = require('string-hash')
var stringify = require('fast-json-stable-stringify')

var SALT = 'chino'

hash.hash2 = function hash2(a, b) {
  return hash(hash(a) + hash(b))
}

hash.hash3 = function hash3(a, b, c) {
  return hash(hash(a) + hash(b) + hash(c))
}

function hash(input) {
  return stringHash(md5(stringify(input) + SALT))
}

module.exports = hash
