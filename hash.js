var { blake2b } = require('blakejs')
var stringify = require('fast-json-stable-stringify')
var createLimitCache = require('./utils/createLimitCache')

const NUM_BITS = 24
const NUM_BYTES = Math.floor(NUM_BITS / 8)

var cache = createLimitCache(100)

var hash = cache.memoize(function hashFn(input) {
  var key = stringify(input) + hash.salt
  return uint8ArrayToNumber(blake2b(key, null, NUM_BYTES))
})

hash.salt = 'chino'

hash.hash2 = function hash2(a, b) {
  return hash(a) + hash(b)
}

hash.hash3 = function hash3(a, b, c) {
  return hash(a) + hash(b) + hash(c)
}

const uint8ArrayToNumber = bytes => {
  let result = 0
  let i = bytes.length

  while (i--) {
    result = (result << 8) + bytes[i]
  }

  return result
}

module.exports = hash
