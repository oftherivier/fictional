const tap = require('tap')
const { join } = require('..')

tap.test('function as joiner', t => {
  const result = join(23, vals => vals.join(' '), [() => 'a', () => 'b'])
  t.equals(result, 'a b')
  t.end()
})
