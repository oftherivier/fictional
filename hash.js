var hash = require('string-hash')
var stringify = require('fast-json-stable-stringify')

module.exports = function int (input) {
  // todo: cache `input` using a WeakMap
  return hash(stringify(input))
}
