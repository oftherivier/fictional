module.exports = function (a, b) {
  var results = []
  var i = a - 1
  var n = b + 1
  while (++i < n) results.push(i)
  return results
}
