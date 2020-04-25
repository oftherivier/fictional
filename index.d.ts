export type JSONPrimitive = null | number | string | boolean

export type PlainNested<V> = V | { [s: string]: V } | Array<V>

export type JSONSerializable = PlainNested<JSONPrimitive>

export type Input = JSONSerializable

export function hash(input: Input): number

export function int(input: Input): number
export function float(input: Input): number
export function word(input: Input): string
export function bool(input: Input): boolean
export function datestr(input: Input): Date

declare function oneOf<Sample>(samples: Sample[]): (input: Input) => Sample

declare function oneOf<Sample>(input: Input, samples: Sample[]): Sample

export { oneOf }

declare function tuple<Fns extends TupleFns>(
  fns: Fns
): (input: Input) => TupleReturnType<Fns>

declare function tuple<Fns extends TupleFns>(
  input: Input,
  fns: Fns
): TupleReturnType<Fns>

export { tuple }

// TODO support the array/tuple form for items
export type TupleFn<R = unknown> = (input: Input) => R

export type TupleReturnType<Fns extends TupleFns> = Fns extends TupleFns1<
  infer V1
>
  ? [V1]
  : Fns extends TupleFns2<infer V1, infer V2>
  ? [V1, V2]
  : Fns extends TupleFns3<infer V1, infer V2, infer V3>
  ? [V1, V2, V3]
  : Fns extends TupleFns4<infer V1, infer V2, infer V3, infer V4>
  ? [V1, V2, V3, V4]
  : Fns extends TupleFns5<infer V1, infer V2, infer V3, infer V4, infer V5>
  ? [V1, V2, V3, V4, V5]
  : Fns extends TupleFns6<
      infer V1,
      infer V2,
      infer V3,
      infer V4,
      infer V5,
      infer V6
    >
  ? [V1, V2, V3, V4, V5, V6]
  : Fns extends TupleFns7<
      infer V1,
      infer V2,
      infer V3,
      infer V4,
      infer V5,
      infer V6,
      infer V7
    >
  ? [V1, V2, V3, V4, V5, V6, V7]
  : Fns extends TupleFns8<
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
  : Fns extends TupleFns9<
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
  : Fns extends TupleFns10<
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
  : Fns extends TupleFns11<
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
  : Fns extends TupleFns12<
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
  : Fns extends TupleFns13<
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
  ? [V1, V2, V3, V4, V5, V6, V7, V8, V9, V10, V11, V12, V13]
  : Fns extends TupleFns14<
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
  ? [V1, V2, V3, V4, V5, V6, V7, V8, V9, V10, V11, V12, V13, V14]
  : Fns extends TupleFns15<
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
  ? [V1, V2, V3, V4, V5, V6, V7, V8, V9, V10, V11, V12, V13, V14, V15]
  : Fns extends TupleFns16<
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
  ? [V1, V2, V3, V4, V5, V6, V7, V8, V9, V10, V11, V12, V13, V14, V15, V16]
  : never

type TupleFns =
  | TupleFns1
  | TupleFns2
  | TupleFns3
  | TupleFns4
  | TupleFns5
  | TupleFns6
  | TupleFns7
  | TupleFns8
  | TupleFns9
  | TupleFns10
  | TupleFns11
  | TupleFns12
  | TupleFns13
  | TupleFns14
  | TupleFns15
  | TupleFns16

type TupleFns1<V1 = any> = [TupleFn<V1>]
type TupleFns2<V1 = any, V2 = any> = [TupleFn<V1>, TupleFn<V2>]
type TupleFns3<V1 = any, V2 = any, V3 = any> = [
  TupleFn<V1>,
  TupleFn<V2>,
  TupleFn<V3>
]
type TupleFns4<V1 = any, V2 = any, V3 = any, V4 = any> = [
  TupleFn<V1>,
  TupleFn<V2>,
  TupleFn<V3>,
  TupleFn<V4>
]
type TupleFns5<V1 = any, V2 = any, V3 = any, V4 = any, V5 = any> = [
  TupleFn<V1>,
  TupleFn<V2>,
  TupleFn<V3>,
  TupleFn<V4>,
  TupleFn<V5>
]
type TupleFns6<V1 = any, V2 = any, V3 = any, V4 = any, V5 = any, V6 = any> = [
  TupleFn<V1>,
  TupleFn<V2>,
  TupleFn<V3>,
  TupleFn<V4>,
  TupleFn<V5>,
  TupleFn<V6>
]
type TupleFns7<
  V1 = any,
  V2 = any,
  V3 = any,
  V4 = any,
  V5 = any,
  V6 = any,
  V7 = any
> = [
  TupleFn<V1>,
  TupleFn<V2>,
  TupleFn<V3>,
  TupleFn<V4>,
  TupleFn<V5>,
  TupleFn<V6>,
  TupleFn<V7>
]
type TupleFns8<
  V1 = any,
  V2 = any,
  V3 = any,
  V4 = any,
  V5 = any,
  V6 = any,
  V7 = any,
  V8 = any
> = [
  TupleFn<V1>,
  TupleFn<V2>,
  TupleFn<V3>,
  TupleFn<V4>,
  TupleFn<V5>,
  TupleFn<V6>,
  TupleFn<V7>,
  TupleFn<V8>
]
type TupleFns9<
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
  TupleFn<V1>,
  TupleFn<V2>,
  TupleFn<V3>,
  TupleFn<V4>,
  TupleFn<V5>,
  TupleFn<V6>,
  TupleFn<V7>,
  TupleFn<V8>,
  TupleFn<V9>
]
type TupleFns10<
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
  TupleFn<V1>,
  TupleFn<V2>,
  TupleFn<V3>,
  TupleFn<V4>,
  TupleFn<V5>,
  TupleFn<V6>,
  TupleFn<V7>,
  TupleFn<V8>,
  TupleFn<V9>,
  TupleFn<V10>
]
type TupleFns11<
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
  TupleFn<V1>,
  TupleFn<V2>,
  TupleFn<V3>,
  TupleFn<V4>,
  TupleFn<V5>,
  TupleFn<V6>,
  TupleFn<V7>,
  TupleFn<V8>,
  TupleFn<V9>,
  TupleFn<V10>,
  TupleFn<V11>
]
type TupleFns12<
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
  TupleFn<V1>,
  TupleFn<V2>,
  TupleFn<V3>,
  TupleFn<V4>,
  TupleFn<V5>,
  TupleFn<V6>,
  TupleFn<V7>,
  TupleFn<V8>,
  TupleFn<V9>,
  TupleFn<V10>,
  TupleFn<V11>,
  TupleFn<V12>
]
type TupleFns13<
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
  TupleFn<V1>,
  TupleFn<V2>,
  TupleFn<V3>,
  TupleFn<V4>,
  TupleFn<V5>,
  TupleFn<V6>,
  TupleFn<V7>,
  TupleFn<V8>,
  TupleFn<V9>,
  TupleFn<V10>,
  TupleFn<V11>,
  TupleFn<V12>,
  TupleFn<V13>
]
type TupleFns14<
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
  TupleFn<V1>,
  TupleFn<V2>,
  TupleFn<V3>,
  TupleFn<V4>,
  TupleFn<V5>,
  TupleFn<V6>,
  TupleFn<V7>,
  TupleFn<V8>,
  TupleFn<V9>,
  TupleFn<V10>,
  TupleFn<V11>,
  TupleFn<V12>,
  TupleFn<V13>,
  TupleFn<V14>
]
type TupleFns15<
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
  TupleFn<V1>,
  TupleFn<V2>,
  TupleFn<V3>,
  TupleFn<V4>,
  TupleFn<V5>,
  TupleFn<V6>,
  TupleFn<V7>,
  TupleFn<V8>,
  TupleFn<V9>,
  TupleFn<V10>,
  TupleFn<V11>,
  TupleFn<V12>,
  TupleFn<V13>,
  TupleFn<V14>,
  TupleFn<V15>
]
type TupleFns16<
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
  TupleFn<V1>,
  TupleFn<V2>,
  TupleFn<V3>,
  TupleFn<V4>,
  TupleFn<V5>,
  TupleFn<V6>,
  TupleFn<V7>,
  TupleFn<V8>,
  TupleFn<V9>,
  TupleFn<V10>,
  TupleFn<V11>,
  TupleFn<V12>,
  TupleFn<V13>,
  TupleFn<V14>,
  TupleFn<V15>,
  TupleFn<V16>
]
