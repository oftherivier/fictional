const test = require('ava')
const { dateString } = require('..')

test('minYear and maxYear', t => {
  let i = -1

  while (++i < 50) {
    const result = dateString('foo', {
      minYear: 2030,
      maxYear: 2089
    })

    const year = new Date(result).getFullYear()
    t.assert(2030 <= year && year <= 2089)
  }

})
