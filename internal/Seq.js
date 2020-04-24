function Seq(seed) {
  this.current = seed
  this.i = null
  this.digits = null
  this.reset()
}

Seq.prototype.reset = function reset() {
  var digits = (this.digits = this.current.toString())
  this.i = digits.length
}

Seq.prototype.next = function next() {
  var incr
  if (this.i < 1) this.reset()
  incr = +this.digits[--this.i]
  incr += incr % 2 ? 3 : 23
  return (this.current += incr)
}

module.exports = Seq
