const test = require('ava')
const { oneOf } = require('..')

test('makers as items', t => {
  const mod2 = id => id % 2

  let i = -1

  while (++i < 50) {
    const result = oneOf(i, [mod2])
    t.assert(0 <= result && result <= 1)
  }

})
