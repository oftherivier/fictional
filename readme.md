# `fictional`

Generate fake data deterministically from a given input

_not yet released, coming soon, and with docs_

```js
import { word } from 'fictional'

word('some-identifier')
// =>
'Chiya'

word('some-other-identifier')
// =>
'Takure'

word('some-identifier')
// =>
'Chiya'
```

* [API](#api)
  * [API Overview](#api-overview)
  * [API Reference](#api-ref)
* [Install](#install)

## <a name="why" href="#why">#</a> Why? How is this different to faker?
Libraries like [faker](https://github.com/marak/Faker.js/) or [chance](https://chancejs.com/) allow you to seed a psuedo-random number generator (PRNG), such that the same sequence of values will be generated every time. If that is all you need, those libraries are for you.

Sometimes though, instead of needing to obtain the same _sequence_ of generated values every time, from some set of identifiers, you need to obtain the same _mapping_ to generated values every time. This is where _fictional_ comes in.

For example, when generating api response data in tests, you need to rely on each field always mapping to the same generated value every test run. To illustrate, you could use fictional to generate some user entity in a test:

```js
import { int, word } from 'fictional'

// every test run, these fields would have the same values
const user = {
  id: int('id'),
  name: word('name')
}
```

To some extent, there are ways of achieving similar results with libraries like faker, but we haven't found ways that do not have practical limitations:
* It is possible to simply seed the PRNG for every identifier, and then use it to generate only a single value. This seems to be a misuse of these libraries though: as far as I have seen, there is an up-front cost to seeding these PRNGs that can be expensive if done for each and every value to be generated. [Here are benchmarks](TODO) that point to this up-front cost.
* You can generate a sequence of N values, hash identifiers to some integer smaller than N, then simply use that as an index to lookup a value in the sequence. This can even be done lazily. Still, you're now limiting the uniqueness of the values to N. The larger N is, the larger the cost of keeping these sequences in memory, or the more computationally expensive it is if you do not hold onto the sequences in memory. The smaller N is, the less unique your generated values are.

## <a name="api" href="#api">#</a> API

### <a name="api-overview" href="#api-overview">#</a> API Overview

#### <a name="makers" href="#api-makers">#</a> Makers
Fictional exports functions that take in some identifying value as input, and generate a corresponding output value. These functions are called 'makers'.

```js
import { word } from 'fictional'

// `word` is a maker:
word('some-identifier')
// =>
'Chiya'
```

The given input can be any JSON-serializable value. For any two calls to the same maker function, provided the input given in each call serializes down to the same value, the same output will be returned. Makers work statelessly, so for the same input, the same value will be returned regardless of the enviornment, process, call ordering, or any other external factors.

Note that unlike `JSON.stringify()`, object property ordering is not considered.

```js
import { word } from 'fictional'

word({
  a: 21,
  b: 23
})
// =>
'Teno'

word({
  b: 23,
  a: 21
})
// =>
'Teno'
```

### <a name="api-ref" href="#api-ref">#</a> API Reference

#### <a name="int" href="#int">#</a> `int()`

## <a name="install" href="#install">#</a> Install

You can use fictional as the npm package `fictional`:

```
npm i -D fictional  # chances are you want it as a devDependency
# or
yarn add -D fictional
```

Fictional can be used in both es-module-aware and commonjs bundlers/environments.

```js
// es module
import { int } from 'fictional'

// commonjs
const { int } = require('fictional')
```

It can also be used a script:

```js
<script crossorigin src="https://unpkg.com/fictional/umd/fictional.js"></script>
```
