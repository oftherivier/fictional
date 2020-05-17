var stringHash = require('string-hash')
var stringify = require('fast-json-stable-stringify')

hash.hash2 = function hash2(a, b) {
  return hash(hash(a) + hash(b))
}

hash.hash3 = function hash3(a, b, c) {
  return hash(hash(a) + hash(b) + hash(c))
}

function hash(input) {
  return stringHash(stringify(input))
}

module.exports = hash
