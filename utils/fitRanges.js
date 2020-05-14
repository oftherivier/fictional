var hash = require('../hash')

module.exports = function fitRanges(ranges) {
  if (!ranges.length) {
    throw new Error('Empty range set given to fitRanges()')
  }

  var meta = computeRangeMetadata(ranges.slice().sort(compareRanges))
  var offsets = meta.offsets
  var size = meta.size

  fitRangesFn.meta = meta
  return fitRangesFn

  function fitRangesFn(input) {
    var key = hash([input, 'fitRanges']) % size

    var l = 0
    var r = offsets.length - 1
    var m
    var d
    var min
    var max

    while (l <= r) {
      m = Math.floor((l + r) / 2)
      d = offsets[m]
      min = d.min
      max = d.max

      if (key > max) l = m + 1
      else if (key < min) r = m - 1
      else return key + d.offset
    }

    throw new Error('Unexpectedly reached end of fitRanges()')
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

function computeRangeMetadata(ranges) {
  var offsets = []
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

      offsets.push({
        min: modMin,
        max: modMax,
        offset: currentMin - modMin
      })

      modMin = modMax + 1
      size += currentMax + 1 - currentMin
      currentMin = nextMin
    }

    currentMax = Math.max(currentMax, nextMax)
  }

  offsets.push({
    ranges: ranges,
    min: modMin,
    max: modMin + (currentMax - currentMin),
    offset: currentMin - modMin
  })

  size += currentMax + 1 - currentMin

  return {
    ranges: ranges,
    offsets: offsets,
    size: size
  }
}
