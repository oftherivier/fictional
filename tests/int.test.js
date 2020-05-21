const test = require('ava')
const { int } = require('..')

test('min and max', t => {
  let i = -1

  while (++i < 50) {
    const result = int('foo', { min: 3, max: 5 })
    t.assert(3 <= result && result <= 5)
  }

})
