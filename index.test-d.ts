import { expectType } from 'tsd'
import {
  Input,
  Int,
  Float,
  int,
  float,
  word,
  tuple,
  oneOf,
  someOf,
  times,
  join
} from '.'

// ## function items
expectType<[number, string]>(tuple(null, [int, word]))
expectType<string>(join(null, ' ', [int, word]))
expectType<number | string>(oneOf(null, [int, word]))
expectType<(number | string)[]>(someOf(null, [2, 3], [int, word]))
expectType<number[]>(times(null, [2, 3], int))

// ## constant items
expectType<[number, string]>(tuple(null, [2, '!']))
expectType<string>(join(null, ' ', [2, '!']))
expectType<number | string>(oneOf(null, [2, '!']))
expectType<(number | string)[]>(someOf(null, [3, 3], [2, '!']))
expectType<number[]>(times(null, [2, 3], 23))

// ## currying
expectType<(input: Input) => [number]>(tuple([int]))
expectType<(input: Input) => string>(join(' ', [int, word]))
expectType<(input: Input) => number>(oneOf([2, 3]))
expectType<(input: Input) => string[]>(someOf([3, 3], ['a', 'b']))
expectType<(input: Input) => string[]>(times([2, 3], word))

// ## join: joiner types
declare function numJoiner(v: (number | string)[]): number
expectType<string>(join(null, ' ', [2, '!']))
expectType<number>(join(null, numJoiner, [2, '!']))

// ## options chaining
expectType<Int>(int.options({ min: 2 }).options({ max: 3 }))
expectType<Float>(float.options({ min: 2 }).options({ max: 3 }))

// ## range values
expectType<string[]>(times(null, 2, word))
expectType<string[]>(times(null, [2, 3], word))

expectType<string[]>(someOf(null, 2, ['a', 'b', 'c']))
expectType<string[]>(someOf(null, [2, 3], ['a', 'b', 'c']))
