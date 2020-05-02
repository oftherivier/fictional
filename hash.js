var stringHash = require('string-hash')
var stringify = require('fast-json-stable-stringify')

module.exports = function hash(input) {
  // todo: cache `input` using a WeakMap
  return stringHash(stringify(input))
}
