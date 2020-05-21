const test = require('ava')
const { join } = require('..')

test('function as joiner', t => {
  const result = join(23, vals => vals.join(' '), [() => 'a', () => 'b'])
  t.is(result, 'a b')
})

test('flattening results', t => {
  const result = join(23, ' ', [() => 'a', () => ['b', ['c']]])
  t.is(result, 'a b c')
})
