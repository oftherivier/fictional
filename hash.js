var fnv = require('fnv-plus')
var siphash = require('siphash')
var stringify = require('fast-json-stable-stringify')

var unsafeFastHash = fnv.fast1a52

var generateKey = siphash.string16_to_key.bind(siphash)

var hashKey = generateKey('chinochinochino!')

function hash(input) {
  return siphash.hash_uint(hashKey, stringify(input))
}

function setKey(key) {
  var key16bytes

  if (typeof key === 'string') {
    key16bytes = key.length === 16 ? key : fnv.fast1a64(key)
    hashKey = generateKey(key16bytes)
  } else {
    hashKey = key
  }
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
hash.sequenceNext = splitmix32

hash.unsafeFastHash = unsafeFastHash
hash.combine = combine

function combine(a, b) {
  return unsafeFastHash(a.toString() + b.toString())
}

// Adapted from https:github.com/bryc/code/blob/master/jshash/PRNGs.md#splitmix32
function splitmix32(a) {
  a |= 0
  a = (a + 0x9e3779b9) | 0
  var t = a ^ (a >>> 16)
  t = Math.imul(t, 0x21f0aaad)
  t = t ^ (t >>> 15)
  t = Math.imul(t, 0x735a2d97)
  return (t = t ^ (t >>> 15)) >>> 0
}

// eslint-disable-next-line es5/no-generators
function* sequenceHash(initial) {
  var current = initial
  yield initial

  while (true) {
    current = splitmix32(current)
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
