const test = require('ava')
const { float } = require('..')

test('min and max', t => {
  let i = -1

  while (++i < 50) {
    const result = float('foo', { min: 3, max: 5 })
    t.assert(3 <= result && result <= 5)
  }

})
