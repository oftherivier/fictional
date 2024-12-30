export type JSONPrimitive = null | number | string | boolean

export type PlainNested<V> =
  | V
  | { [s: string]: PlainNested<V> }
  | Array<PlainNested<V>>

export type JSONSerializable = PlainNested<JSONPrimitive>

export type Input = JSONSerializable

export type Range = number | [number, number]

export type Maker<V = unknown> = ((input: Input) => V) | V
export type WeightedMaker<V = unknown> = [number | null, Maker<V>]

export const hash: Hash

export type HashKey = [number, number, number, number]

export interface Hash {
  (input: Input): number
  hash2(a: Input, b: Input): number
  hash3(a: Input, b: Input, c: Input): number
  unsafeFastHash(input: Input): number
  sequence(input: Input): Generator<number>
  sequence2(a: Input, b: Input): Generator<number>
  sequence3(a: Input, b: Input, c: Input): Generator<number>
  sequenceHash(initial: number): Generator<number>
  sequenceNext(current: number): number
  combine(a: number, b: number): number
  setKey(key: string | HashKey): void
  generateKey(secret: string): HashKey
}

export function bool(input: Input): boolean

export interface IntOptions {
  min: number
  max: number
}

export interface Int {
  (input: Input, options?: Partial<IntOptions>): number
  options(overrides?: Partial<IntOptions>): this
}

declare const int: Int

export { int }

export interface FloatOptions {
  min: number
  max: number
}

export interface Float {
  (input: Input, options?: Partial<FloatOptions>): number
  options(overrides?: Partial<FloatOptions>): this
}

declare const float: Float

export { float }

export interface DateStringOptions {
  minYear: number
  maxYear: number
  min: Date | string
  max: Date | string
}

export interface DateString {
  (input: Input, options?: Partial<DateStringOptions>): string
  options(overrides?: Partial<DateStringOptions>): this
}

declare const dateString: DateString

export { dateString }

export interface CharFn {
  __fictional_char: unknown
  (input: Input): string
}

export type CharRange = [number, number] | CharFn

export interface Char extends CharFn {
  inRanges(ranges: CharRange[]): Char

  ascii: CharFn
  latin1: CharFn

  digit: CharFn
  asciiLower: CharFn
  asciiUpper: CharFn
  latin1Upper: CharFn
  latin1Lower: CharFn

  asciiLetter: CharFn
  latin1Letter: CharFn
  alphanumeric: CharFn
  lower: CharFn
  upper: CharFn
  letter: CharFn
}

declare const char: Char

export { char }

export interface WordOptions {
  capitalize: boolean
  minSyllables: number
  maxSyllables: number
  unicode: boolean | number
}

export interface Word {
  (input: Input, options?: Partial<WordOptions>): string
  options(overrides?: Partial<WordOptions>): this
}

declare const word: Word

export { word }

export interface WordsOptions {
  min: number
  max: number
  minSyllables: number
  maxSyllables: number
  capitalize: boolean | 'first' | 'all'
  unicode: boolean | number
}

export interface Words {
  (input: Input, options?: Partial<WordsOptions>): string
  options(overrides?: Partial<WordsOptions>): this
}

declare const words: Words

export { words }

export interface SentenceOptions extends WordsOptions {
  minClauses: number
  maxClauses: number
  minWords: number
  maxWords: number
}

export interface Sentence {
  (input: Input, options?: Partial<SentenceOptions>): string
  options(overrides?: Partial<SentenceOptions>): this
}

declare const sentence: Sentence

export { sentence }

export interface ParagraphOptions extends WordsOptions {
  minSentences: number
  maxSentences: number
}

export interface Paragraph {
  (input: Input, options?: Partial<ParagraphOptions>): string
  options(overrides?: Partial<ParagraphOptions>): this
}

declare const paragraph: Paragraph

export { paragraph }

export interface OneOf {
  <M extends Maker>(samples: M[]): (input: Input) => MakerResult<M>
  <M extends Maker>(input: Input, samples: M[]): MakerResult<M>
}

declare const oneOf: OneOf

export { oneOf }

export interface OneOfWeighted {
  <M extends WeightedMaker>(
    samples: M[]
  ): (input: Input) => WeightedMakerResult<M>
  <M extends WeightedMaker>(input: Input, samples: M[]): WeightedMakerResult<M>
}

declare const oneOfWeighted: OneOfWeighted

export { oneOfWeighted }

export interface SomeOf {
  <M extends Maker>(
    range: Range,
    samples: M[]
  ): (input: Input) => MakerResult<M>[]
  <M extends Maker>(input: Input, range: Range, samples: M[]): MakerResult<M>[]
}

declare const someOf: SomeOf

export { someOf }

export interface Times {
  <R>(range: Range, maker: Maker<R>): (input: Input) => R[]
  <R>(input: Input, range: Range, maker: Maker<R>): R[]
}

declare const times: Times

export { times }

export interface Join {
  (input: Input, joiner: string, makers: Maker[]): string
  <M extends Maker, R>(
    input: Input,
    joiner: (results: MakerResult<M>[]) => R,
    makers: M[]
  ): R
  <R>(joiner: string, makers: Maker[]): (input: Input) => string
  <M extends Maker, R>(
    joiner: (results: MakerResult<M>[]) => R,
    makers: M[]
  ): (input: Input) => R
}

declare const join: Join

export { join }

export interface Tuple {
  <Makers extends AnyMakers>(
    makers: Makers
  ): (input: Input) => TupleReturnType<Makers>
  <Makers extends AnyMakers>(
    input: Input,
    makers: Makers
  ): TupleReturnType<Makers>
}

declare const tuple: Tuple

export { tuple }

export interface Shape {
  <Makers extends { [s: string]: Maker<unknown> }>(
    makers: Makers
  ): (input: Input) => ShapeReturnType<Makers>
  <Makers extends { [s: string]: Maker<unknown> }>(
    input: Input,
    makers: Makers
  ): ShapeReturnType<Makers>
}

declare const shape: Shape

export { shape }

type MakerResult<M> = M extends Maker<infer R> ? R : never

type WeightedMakerResult<M> = M extends WeightedMaker<infer R> ? R : never

type ShapeReturnType<Makers extends { [s: string]: Maker<unknown> }> = {
  [K in keyof Makers]: MakerResult<Makers[K]>
}

export type TupleReturnType<Makers extends AnyMakers> =
  Makers extends Makers1<infer V1>
  ? [V1]
  : Makers extends Makers2<infer V1, infer V2>
  ? [V1, V2]
  : Makers extends Makers3<infer V1, infer V2, infer V3>
  ? [V1, V2, V3]
  : Makers extends Makers4<infer V1, infer V2, infer V3, infer V4>
  ? [V1, V2, V3, V4]
  : Makers extends Makers5<
    infer V1,
    infer V2,
    infer V3,
    infer V4,
    infer V5
  >
  ? [V1, V2, V3, V4, V5]
  : Makers extends Makers6<
    infer V1,
    infer V2,
    infer V3,
    infer V4,
    infer V5,
    infer V6
  >
  ? [V1, V2, V3, V4, V5, V6]
  : Makers extends Makers7<
    infer V1,
    infer V2,
    infer V3,
    infer V4,
    infer V5,
    infer V6,
    infer V7
  >
  ? [V1, V2, V3, V4, V5, V6, V7]
  : Makers extends Makers8<
    infer V1,
    infer V2,
    infer V3,
    infer V4,
    infer V5,
    infer V6,
    infer V7,
    infer V8
  >
  ? [V1, V2, V3, V4, V5, V6, V7, V8]
  : Makers extends Makers9<
    infer V1,
    infer V2,
    infer V3,
    infer V4,
    infer V5,
    infer V6,
    infer V7,
    infer V8,
    infer V9
  >
  ? [V1, V2, V3, V4, V5, V6, V7, V8, V9]
  : Makers extends Makers10<
    infer V1,
    infer V2,
    infer V3,
    infer V4,
    infer V5,
    infer V6,
    infer V7,
    infer V8,
    infer V9,
    infer V10
  >
  ? [V1, V2, V3, V4, V5, V6, V7, V8, V9, V10]
  : Makers extends Makers11<
    infer V1,
    infer V2,
    infer V3,
    infer V4,
    infer V5,
    infer V6,
    infer V7,
    infer V8,
    infer V9,
    infer V10,
    infer V11
  >
  ? [V1, V2, V3, V4, V5, V6, V7, V8, V9, V10, V11]
  : Makers extends Makers12<
    infer V1,
    infer V2,
    infer V3,
    infer V4,
    infer V5,
    infer V6,
    infer V7,
    infer V8,
    infer V9,
    infer V10,
    infer V11,
    infer V12
  >
  ? [V1, V2, V3, V4, V5, V6, V7, V8, V9, V10, V11, V12]
  : Makers extends Makers13<
    infer V1,
    infer V2,
    infer V3,
    infer V4,
    infer V5,
    infer V6,
    infer V7,
    infer V8,
    infer V9,
    infer V10,
    infer V11,
    infer V12,
    infer V13
  >
  ? [
    V1,
    V2,
    V3,
    V4,
    V5,
    V6,
    V7,
    V8,
    V9,
    V10,
    V11,
    V12,
    V13
  ]
  : Makers extends Makers14<
    infer V1,
    infer V2,
    infer V3,
    infer V4,
    infer V5,
    infer V6,
    infer V7,
    infer V8,
    infer V9,
    infer V10,
    infer V11,
    infer V12,
    infer V13,
    infer V14
  >
  ? [
    V1,
    V2,
    V3,
    V4,
    V5,
    V6,
    V7,
    V8,
    V9,
    V10,
    V11,
    V12,
    V13,
    V14
  ]
  : Makers extends Makers15<
    infer V1,
    infer V2,
    infer V3,
    infer V4,
    infer V5,
    infer V6,
    infer V7,
    infer V8,
    infer V9,
    infer V10,
    infer V11,
    infer V12,
    infer V13,
    infer V14,
    infer V15
  >
  ? [
    V1,
    V2,
    V3,
    V4,
    V5,
    V6,
    V7,
    V8,
    V9,
    V10,
    V11,
    V12,
    V13,
    V14,
    V15
  ]
  : Makers extends Makers16<
    infer V1,
    infer V2,
    infer V3,
    infer V4,
    infer V5,
    infer V6,
    infer V7,
    infer V8,
    infer V9,
    infer V10,
    infer V11,
    infer V12,
    infer V13,
    infer V14,
    infer V15,
    infer V16
  >
  ? [
    V1,
    V2,
    V3,
    V4,
    V5,
    V6,
    V7,
    V8,
    V9,
    V10,
    V11,
    V12,
    V13,
    V14,
    V15,
    V16
  ]
  : never

type AnyMakers =
  | Makers1
  | Makers2
  | Makers3
  | Makers4
  | Makers5
  | Makers6
  | Makers7
  | Makers8
  | Makers9
  | Makers10
  | Makers11
  | Makers12
  | Makers13
  | Makers14
  | Makers15
  | Makers16

type Makers1<V1 = any> = [Maker<V1>]
type Makers2<V1 = any, V2 = any> = [Maker<V1>, Maker<V2>]
type Makers3<V1 = any, V2 = any, V3 = any> = [Maker<V1>, Maker<V2>, Maker<V3>]
type Makers4<V1 = any, V2 = any, V3 = any, V4 = any> = [
  Maker<V1>,
  Maker<V2>,
  Maker<V3>,
  Maker<V4>
]
type Makers5<V1 = any, V2 = any, V3 = any, V4 = any, V5 = any> = [
  Maker<V1>,
  Maker<V2>,
  Maker<V3>,
  Maker<V4>,
  Maker<V5>
]
type Makers6<V1 = any, V2 = any, V3 = any, V4 = any, V5 = any, V6 = any> = [
  Maker<V1>,
  Maker<V2>,
  Maker<V3>,
  Maker<V4>,
  Maker<V5>,
  Maker<V6>
]
type Makers7<
  V1 = any,
  V2 = any,
  V3 = any,
  V4 = any,
  V5 = any,
  V6 = any,
  V7 = any
> = [
    Maker<V1>,
    Maker<V2>,
    Maker<V3>,
    Maker<V4>,
    Maker<V5>,
    Maker<V6>,
    Maker<V7>
  ]
type Makers8<
  V1 = any,
  V2 = any,
  V3 = any,
  V4 = any,
  V5 = any,
  V6 = any,
  V7 = any,
  V8 = any
> = [
    Maker<V1>,
    Maker<V2>,
    Maker<V3>,
    Maker<V4>,
    Maker<V5>,
    Maker<V6>,
    Maker<V7>,
    Maker<V8>
  ]
type Makers9<
  V1 = any,
  V2 = any,
  V3 = any,
  V4 = any,
  V5 = any,
  V6 = any,
  V7 = any,
  V8 = any,
  V9 = any
> = [
    Maker<V1>,
    Maker<V2>,
    Maker<V3>,
    Maker<V4>,
    Maker<V5>,
    Maker<V6>,
    Maker<V7>,
    Maker<V8>,
    Maker<V9>
  ]
type Makers10<
  V1 = any,
  V2 = any,
  V3 = any,
  V4 = any,
  V5 = any,
  V6 = any,
  V7 = any,
  V8 = any,
  V9 = any,
  V10 = any
> = [
    Maker<V1>,
    Maker<V2>,
    Maker<V3>,
    Maker<V4>,
    Maker<V5>,
    Maker<V6>,
    Maker<V7>,
    Maker<V8>,
    Maker<V9>,
    Maker<V10>
  ]
type Makers11<
  V1 = any,
  V2 = any,
  V3 = any,
  V4 = any,
  V5 = any,
  V6 = any,
  V7 = any,
  V8 = any,
  V9 = any,
  V10 = any,
  V11 = any
> = [
    Maker<V1>,
    Maker<V2>,
    Maker<V3>,
    Maker<V4>,
    Maker<V5>,
    Maker<V6>,
    Maker<V7>,
    Maker<V8>,
    Maker<V9>,
    Maker<V10>,
    Maker<V11>
  ]
type Makers12<
  V1 = any,
  V2 = any,
  V3 = any,
  V4 = any,
  V5 = any,
  V6 = any,
  V7 = any,
  V8 = any,
  V9 = any,
  V10 = any,
  V11 = any,
  V12 = any
> = [
    Maker<V1>,
    Maker<V2>,
    Maker<V3>,
    Maker<V4>,
    Maker<V5>,
    Maker<V6>,
    Maker<V7>,
    Maker<V8>,
    Maker<V9>,
    Maker<V10>,
    Maker<V11>,
    Maker<V12>
  ]
type Makers13<
  V1 = any,
  V2 = any,
  V3 = any,
  V4 = any,
  V5 = any,
  V6 = any,
  V7 = any,
  V8 = any,
  V9 = any,
  V10 = any,
  V11 = any,
  V12 = any,
  V13 = any
> = [
    Maker<V1>,
    Maker<V2>,
    Maker<V3>,
    Maker<V4>,
    Maker<V5>,
    Maker<V6>,
    Maker<V7>,
    Maker<V8>,
    Maker<V9>,
    Maker<V10>,
    Maker<V11>,
    Maker<V12>,
    Maker<V13>
  ]
type Makers14<
  V1 = any,
  V2 = any,
  V3 = any,
  V4 = any,
  V5 = any,
  V6 = any,
  V7 = any,
  V8 = any,
  V9 = any,
  V10 = any,
  V11 = any,
  V12 = any,
  V13 = any,
  V14 = any
> = [
    Maker<V1>,
    Maker<V2>,
    Maker<V3>,
    Maker<V4>,
    Maker<V5>,
    Maker<V6>,
    Maker<V7>,
    Maker<V8>,
    Maker<V9>,
    Maker<V10>,
    Maker<V11>,
    Maker<V12>,
    Maker<V13>,
    Maker<V14>
  ]
type Makers15<
  V1 = any,
  V2 = any,
  V3 = any,
  V4 = any,
  V5 = any,
  V6 = any,
  V7 = any,
  V8 = any,
  V9 = any,
  V10 = any,
  V11 = any,
  V12 = any,
  V13 = any,
  V14 = any,
  V15 = any
> = [
    Maker<V1>,
    Maker<V2>,
    Maker<V3>,
    Maker<V4>,
    Maker<V5>,
    Maker<V6>,
    Maker<V7>,
    Maker<V8>,
    Maker<V9>,
    Maker<V10>,
    Maker<V11>,
    Maker<V12>,
    Maker<V13>,
    Maker<V14>,
    Maker<V15>
  ]
type Makers16<
  V1 = any,
  V2 = any,
  V3 = any,
  V4 = any,
  V5 = any,
  V6 = any,
  V7 = any,
  V8 = any,
  V9 = any,
  V10 = any,
  V11 = any,
  V12 = any,
  V13 = any,
  V14 = any,
  V15 = any,
  V16 = any
> = [
    Maker<V1>,
    Maker<V2>,
    Maker<V3>,
    Maker<V4>,
    Maker<V5>,
    Maker<V6>,
    Maker<V7>,
    Maker<V8>,
    Maker<V9>,
    Maker<V10>,
    Maker<V11>,
    Maker<V12>,
    Maker<V13>,
    Maker<V14>,
    Maker<V15>,
    Maker<V16>
  ]

declare const expandRange: (a: number, b: number) => number[]

export { expandRange }

declare const fromCodePoint: (codePoint: number) => string

export { fromCodePoint }
