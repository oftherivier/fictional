var unsafeFastHash = require('fnv-plus').fast1a52
var siphash = require('siphash')
var stringify = require('fast-json-stable-stringify')

var generateKey = siphash.string16_to_key.bind(siphash)

var hashKey = generateKey('chinochinochino!')

function hash(input) {
  return siphash.hash_uint(hashKey, stringify(input))
}

function setKey(key) {
  hashKey = key
}

function hash2(a, b) {
  return combine(hash(a), hash(b))
}

function hash3(a, b, c) {
  return combine(combine(hash(a), hash(b)), hash(c))
}

hash.hash2 = hash2
hash.hash3 = hash3

hash.setKey = setKey
hash.generateKey = generateKey

hash.sequence = sequence
hash.sequence2 = sequence2
hash.sequence3 = sequence3
hash.sequenceHash = sequenceHash

hash.unsafeFastHash = unsafeFastHash
hash.combine = combine

function combine(a, b) {
  return unsafeFastHash(a.toString() + b.toString())
}

// eslint-disable-next-line es5/no-generators
function* sequenceHash(initial) {
  var current = initial
  yield initial

  while (true) {
    current = unsafeFastHash(current.toString())
    yield current
  }
}

function sequence3(a, b) {
  return sequenceHash(hash3(a, b))
}

function sequence2(a, b) {
  return sequenceHash(hash2(a, b))
}

function sequence(input) {
  return sequenceHash(hash(input))
}

module.exports = hash
