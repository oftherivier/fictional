var expandRange = require('./expandRange')

module.exports = function fitRanges(ranges, valuesThreshold) {
  if (!ranges.length) {
    throw new Error('Empty range set given to fitRanges()')
  }

  var meta = computeRangeMetadata(
    ranges.slice().sort(compareRanges),
    valuesThreshold
  )
  var values = meta.values
  var segments = meta.segments
  var size = meta.size

  var fn = values
    ? fitRangesByValues(values)
    : fitRangesByOffsets(segments, size)

  fn.meta = meta
  return fn
}

function fitRangesByOffsets(segments, size) {
  return function fitRangesByOffsetsFn(id) {
    var key = id % size

    var l = 0
    var r = segments.length - 1
    var m
    var d
    var min
    var max

    while (l <= r) {
      m = Math.floor((l + r) / 2)
      d = segments[m]
      min = d.modMin
      max = d.modMax

      if (key > max) l = m + 1
      else if (key < min) r = m - 1
      else return key + d.offset
    }

    throw new Error('Unexpectedly reached end of fitRanges()')
  }
}

function fitRangesByValues(values) {
  var n = values.length

  return function fitRangesByValuesFn(id) {
    return values[id % n]
  }
}

function compareRanges(a, b) {
  var aMin = a[0]
  var bMin = b[0]
  var diff = aMin - bMin

  if (diff === 0) {
    return a[1] - b[0]
  }

  return diff
}

function computeRangeMetadata(ranges, valuesThreshold) {
  var segments = []
  var n = ranges.length
  var i = 0

  var range = ranges[0]
  var currentMin = range[0]
  var currentMax = range[1]
  var modMin = 0
  var size = 0
  var modMax
  var nextMin
  var nextMax

  while (++i < n) {
    range = ranges[i]
    nextMin = range[0]
    nextMax = range[1]

    if (nextMin > currentMax + 1) {
      modMax = modMin + (currentMax - currentMin)

      segments.push({
        modMin: modMin,
        modMax: modMax,
        min: currentMin,
        max: currentMax,
        offset: currentMin - modMin
      })

      modMin = modMax + 1
      size += currentMax + 1 - currentMin
      currentMin = nextMin
    }

    currentMax = Math.max(currentMax, nextMax)
  }

  segments.push({
    modMin: modMin,
    modMax: modMin + (currentMax - currentMin),
    min: currentMin,
    max: currentMax,
    offset: currentMin - modMin
  })

  size += currentMax + 1 - currentMin

  return {
    ranges: ranges,
    segments: segments,
    size: size,
    values: size <= valuesThreshold ? computeRangeValues(segments) : null
  }
}

function computeRangeValues(segments) {
  var i = -1
  var n = segments.length
  var d
  var results = []

  while (++i < n) {
    d = segments[i]
    results.push.apply(results, expandRange(d.min, d.max))
  }

  return results
}
