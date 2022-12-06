function createLimitCache(limit) {
  var valuesByKey = new Map()

  return {
    set: set,
    get: get,
    memoize: memoize
  }

  function set(k, v) {
    valuesByKey.delete(k)
    valuesByKey.set(k, v)

    if (valuesByKey.size > limit) {
      valuesByKey.delete(valuesByKey.keys().next().value)
    }
  }

  function get(k) {
    var v = valuesByKey.get(k)
    if (v !== undefined) {
      valuesByKey.delete(k)
      valuesByKey.set(k, v)
    }
    return v
  }

  function memoize(fn) {
    return function memoizedFn(input) {
      var result = get(input)

      if (result !== undefined) {
        return result
      }

      result = fn(input)
      set(input, result)

      return result
    }
  }
}

module.exports = createLimitCache
