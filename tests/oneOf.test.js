const tap = require('tap')
const { oneOf } = require('..')

tap.test('makers as items', t => {
  const mod2 = id => id % 2

  let i = -1

  while (++i < 50) {
    const result = oneOf(i, [mod2])
    t.ok(0 <= result && result <= 1)
  }

  t.end()
})
