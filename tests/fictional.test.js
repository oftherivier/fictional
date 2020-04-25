const f = require('..')
const tap = require('tap')

var TYPE_EXCLUDES = new Set(['hash', 'oneOf', 'tuple'])

const types = {
  ...getSimpleTyples(),
  oneOf: f.oneOf(['red', 'green', 'blue']),
  tuple: f.tuple([
    f.oneOf(['Privet', 'Parkway', 'Cherry']),
    f.oneOf(['Drive', 'Street', 'Road'])
  ])
}

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

function getSimpleTyples() {
  const result = {}

  for (const name of Object.keys(f)) {
    if (!TYPE_EXCLUDES.has(name)) {
      result[name] = f[name]
    }
  }

  return result
}
