var Decimal = require('decimal.js')

module.exports = function decimalFit(v, min, max) {
  v = Decimal(v)
  min = Decimal(min || 0)

  if (max == null) {
    return v.gt(min) ? v : v.add(min)
  }

  max = Decimal.max(max, min)

  if (min.eq(max)) {
    return min
  }

  if (min.lte(v) && v.lte(max)) {
    return v
  }

  if (v.dp() !== 0) {
    max = max.minus(1)
  }

  return v.mod(max.add(1).minus(min)).add(min)
}
