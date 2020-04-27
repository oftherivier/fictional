# `fictional`

Generate fake data deterministically from a given input

_not yet released, coming soon, and with docs_

```js
import { word } from 'fictional'

word('some-identifier')
// =>
'Zawuw'

word('some-other-identifier')
// =>
'Fido'

word('some-identifier')
// =>
'Zawuw'
```

* [API](#api)
  * [API Overview](#api-overview)
  * [API Reference](#api-ref)
* [Installation](#installation)

## <a name="why" href="#why">#</a> Why? How is this different to faker, chance, or similar
Libraries like [faker](https://github.com/marak/Faker.js/) or [chance](https://chancejs.com/) allow you to seed a psuedo-random number generator (PRNG), such that the same sequence of values will be generated every time. If that is all you need, those libraries are for you.

Sometimes though, instead of needing to obtain the same _sequence_ of generated values every time, from some set of identifiers, you need to obtain the same _mapping_ to generated values every time. This is where _fictional_ comes in.

For example, when generating api response data in tests, you need to rely on each field always mapping to the same generated value every test run. For illustration, you could use fictional to generate some user entity in a test:

```js
import { int, word } from 'fictional'

const user = {
  id: int('id'),
  name: word('name')
}
```

To some extent, there are ways of achieving similar results with libraries like faker, but I haven't found ways that do not have practical limitations:
* It is possible to simply seed the PRNG for every identifier, and then use it to generate only a single value. This seems to be a misuse of these libraries though: as far as I have seen, there is an up-front cost to seeding these PRNGs that can be expensive if done for each and every value to be generated. [Here are benchmarks](TODO) for comparison.
* You can generate a sequence of N values, hash identifiers to some integer smaller than N, then simply use that as an index to lookup a value in the sequence. This can even be done lazily. Still, you're now limiting the uniqueness of the values to N. The larger N is, the larger the cost of keeping these sequences in memory, or the more computationally expensive it is if you do not hold onto the sequences in memory. The smaller N is, the less unique your generated values are.

## <a name="api" href="#api">#</a> API

### <a name="api" href="#api-overview">#</a> API Overview

### <a name="api" href="#api-ref">#</a> API Reference

## <a name="installation" href="#installation">#</a> Installation
