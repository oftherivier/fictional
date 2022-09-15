var Decimal = require('decimal.js')

module.exports = function flip(id, p) {
  p = typeof p === 'boolean' ? +p : p
  p = Decimal(p)

  if (p.eq(0)) {
    return false
  }

  if (p.eq(1)) {
    return true
  }

  return Decimal(id).mod(Decimal(1).div(p)).lt(1)
}
