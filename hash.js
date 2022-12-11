var siphash = require('siphash/lib/siphash13')
var stringify = require('fast-json-stable-stringify')
var createLimitCache = require('./utils/createLimitCache')

var cache = createLimitCache(100)

var hash = cache.memoize(function hashFn(input) {
  return siphash.hash_uint(hash.key, stringify(input))
})

hash.generateKey = siphash.string16_to_key.bind(siphash)

hash.key = hash.generateKey('chinochinochino!')

hash.hash2 = function hash2(a, b) {
  return hash(a) + hash(b)
}

hash.hash3 = function hash3(a, b, c) {
  return hash(a) + hash(b) + hash(c)
}

module.exports = hash
