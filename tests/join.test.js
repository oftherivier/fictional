const tap = require('tap')
const { join } = require('..')

tap.test('function as joiner', t => {
  const result = join(23, vals => vals.join(' '), [() => 'a', () => 'b'])
  t.equals(result, 'a b')
  t.end()
})

tap.test('flattening results', t => {
  const result = join(23, ' ', [() => 'a', () => ['b', ['c']]])
  t.equals(result, 'a b c')
  t.end()
})
