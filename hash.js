var hash = require('string-hash')
var stringify = require('fast-json-stable-stringify')

module.exports = function int (inputs) {
  // todo: cache `inputs` using a WeakMap
  return hash(stringify(inputs))
}
