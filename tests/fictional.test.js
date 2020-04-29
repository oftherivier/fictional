const f = require('..')
const tap = require('tap')

const { oneOf, tuple, join } = f

const TYPE_EXCLUDES = new Set(['hash', 'oneOf', 'tuple'])

const makers = {
  ...getSimpleTyples(),
  oneOf: oneOf(['red', 'green', 'blue']),
  tuple: tuple([
    oneOf(['Privet', 'Parkway', 'Cherry']),
    oneOf(['Drive', 'Street', 'Road'])
  ]),
  join: join(vals => vals.join(' '), [
    oneOf(['Privet', 'Parkway', 'Cherry']),
    oneOf(['Drive', 'Street', 'Road'])
  ])
}

tap.test('generated values', t => {
  let i = -1
  const results = []

  while (++i < 50) {
    results.push(callMakers(i))
  }

  t.matchSnapshot(results)
  t.end()
})

tap.test('consistency', t => {
  let i = -1
  const firstResult = callMakers(23)

  while (++i < 100) {
    t.deepEquals(callMakers(23), firstResult)
  }

  t.end()
})

function callMakers(input) {
  const result = {}

  for (const name of Object.keys(makers)) {
    result[name] = makers[name](input)
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
