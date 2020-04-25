module.exports = function displayType(v) {
  var type = typeof v
  if (v === null) {
    return 'null'
  }

  if (type === 'undefined') {
    return 'undefined'
  }

  if (Array.isArray(v)) {
    return 'array'
  }

  if (type !== 'object') {
    return type
  }

  if (typeof v.constructor === 'function') {
    return 'class(' + v.constructor.name + ')'
  }

  return 'object'
}
