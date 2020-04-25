import { expectType } from 'tsd'
import { Input, int, word, tuple, oneOf } from '.'

// ## tuple
// ### function items
expectType<[number]>(tuple(23, [int]))
expectType<[number, string]>(tuple(23, [int, word]))
expectType<[number, string, number]>(tuple(23, [int, word, int]))

// ## currying
expectType<(input: Input) => [number]>(tuple([int]))
expectType<(input: Input) => number>(oneOf([2, 3]))
