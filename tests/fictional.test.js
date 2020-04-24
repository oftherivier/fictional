const fictional = require('..')
const tap = require('tap')

const types = getTypes()

tap.test('generated values', t => {
  let i = -1
  const results = []

  while (++i < 50) {
    results.push(callTypes(i))
  }

  t.matchSnapshot(results)
  t.end()
})

tap.test('consistency', t => {
  let i = -1
  const firstResult = callTypes(23)

  while (++i < 100) {
    t.deepEquals(callTypes(23), firstResult)
  }

  t.end()
})

function callTypes(input) {
  const result = {}

  for (const name of Object.keys(types)) {
    result[name] = types[name](input)
  }

  return result
}

function getTypes() {
  return fictional
}
