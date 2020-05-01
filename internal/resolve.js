module.exports = function resolve(v, id) {
  return typeof v === 'function'
    ? v(id)
    : v
}
