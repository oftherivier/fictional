var unsafeFastHash = require('fnv-plus').fast1a52
var siphash = require('siphash/lib/siphash13')
var stringify = require('fast-json-stable-stringify')

var generateKey = siphash.string16_to_key.bind(siphash)

var hashKey = generateKey('chinochinochino!')

var hash = function hashFn(input) {
  return siphash.hash_uint(hashKey, stringify(input))
}

hash.generateKey = hash.generateKey

hash.setKey = function setKey(key) {
  hashKey = key
}

hash.hash2 = function hash2(a, b) {
  return combine(hash(a), hash(b))
}

hash.hash3 = function hash3(a, b, c) {
  return combine(combine(hash(a), hash(b)), hash(c))
}

hash.sequence = sequence

hash.unsafeFastHash = unsafeFastHash

hash.combine = combine

// context(justinvdm, 13 Dec 2022): Adapted from a snippet
// from the boost c library:
// https://stackoverflow.com/questions/5889238/why-is-xor-the-default-way-to-combine-hashes
function combine(a, b) {
  return (a ^ (b + 0x9e3779b9 + (a << 6) + (b >> 2))) >>> 0
}

function* sequence(input) {
  var current = hash(input)

  while (true) {
    current = unsafeFastHash(current)
    yield current
  }
}

module.exports = hash
