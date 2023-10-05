# `fictional`

Generate fake data deterministically from a given input

```js
import { word } from 'fictional'

word('id-1')
// => 'um'

word('id-2')
// => 'poter'

word('id-1')
// => 'um'
```

```js
import { words, shape } from 'fictional'

const user = shape({
  name: words.options({ capitalize: 'all' })
})

user('id-1')
// => { name: 'Or Regione Ulit' }

user('id-2')
// => { name: 'Et Quam' }

user('id-1')
// => { name: 'Or Regione Ulit' }
```

- [Why](#why)
- [Overview](#overview)
  - [Makers](#overview-makers)
  - [Composition](#overview-makers)
  - [Options](#overview-options)
  - [Currying](#overview-currying)
  - [Security](#overview-security)
- [API Reference](#api)
  - [Primaries](#primaries)
    - [`int()`](#int)
    - [`bool()`](#bool)
    - [`float()`](#float)
    - [`dateString()`](#date-string)
    - [`char()`](#char)
    - [`word()`](#word)
    - [`words()`](#words)
    - [`sentence()`](#sentence)
    - [`paragraph()`](#paragraph)
  - [Composition](#composition)
    - [`join()`](#join)
    - [`oneOf()`](#oneOf)
    - [`someOf()`](#someOf)
    - [`times()`](#times)
    - [`tuple()`](#tuple)
    - [`shape()`](#shape)
    - [`oneOfWeighted()`](#oneOfWeighted)
- [Install & Use](#install-use)

## <a name="why" href="#why">#</a> Why? How is this different to faker?

Libraries like [faker](https://github.com/marak/Faker.js/) or
[chance](https://chancejs.com/) allow you to seed a psuedo-random number
generator (PRNG), such that the same sequence of values will be generated every
time. If that is all you need, those libraries are for you.

Sometimes though, instead of needing to obtain the same _sequence_ of generated
values every time, from some set of identifiers, you need to obtain the same
_mapping_ to generated values every time. This is where fictional comes in.

For example, when generating api response data in tests, you need to rely on
each field always mapping to the same generated value every test run. To
illustrate, you could use fictional to generate some user entity in a test:

```js
import { word, shape, int } from 'fictional'

const name = shape({
  first: word,
  last: word
})

const user = shape({
  id: int,
  name
})

user('id-1')
// => { id: 4641209466322491, name: { first: 'si', last: 'quaeren' } }
```

To some extent, there are ways of achieving similar results with libraries like
faker, but we haven't found ways that do not have practical limitations:

- It is possible to simply seed the PRNG for every identifier, and then use it
  to generate only a single value. This seems to be a misuse of these libraries
  though: there is an up-front cost to seeding these PRNGs that can be expensive
  if done for each and every value to be generated.
  [Here are benchmarks](https://gist.github.com/justinvdm/eaae3a59c1a1790704db9674e1785afa)
  that point to this up-front cost.
- You can generate a sequence of N values, hash identifiers to some integer
  smaller than N, then simply use that as an index to lookup a value in the
  sequence. This can even be done lazily. Still, you're now limiting the
  uniqueness of the values to N. The larger N is, the larger the cost of keeping
  these sequences in memory, or the more computationally expensive it is if you
  do not hold onto the sequences in memory. The smaller N is, the less unique
  your generated values are.

## <a name="overview" href="#overview">#</a> API Overview

### <a name="overview-makers" href="#overview-makers">#</a> Makers

Fictional provides functions that take in some identifying value as input, and
generate a corresponding output value. These functions are called _makers_.

```js
import { word } from 'fictional'

// `word` is a maker
word('id-1')
// => 'um'
```

The given input can be any JSON-serializable value. For any two calls to the
same maker function, provided the input given in each call serializes down to
the same value, the same output will be returned. Makers work statelessly, so
for the same input, the same value will be returned regardless of the
enviornment, process, call ordering, or any other external factors.

Note that unlike `JSON.stringify()`, object property ordering is not considered.

```js
import { word } from 'fictional'

word({
  a: 21,
  b: 23
})
// => 'quid'

word({
  b: 23,
  a: 21
})
// => 'quid'
```

### <a name="overview-composition" href="#overview-composition">#</a> Composition

```js
const streetAddress = join(' ', [
  int.options({
    min: 1,
    max: 200
  }),
  word,
  oneOf(['Drive', 'Street', 'Avenue'])
])

streetAddress('id-1')
// => '82 certa Drive'

streetAddress('id-2')
// => '132 puto Street'
```

Some makers take in identifying value as the only required argument and return.
These kinds of makers are described in the docs as
[_primary_ makers](#primaries). [`word()`](#word) is an example of such a maker.

However, sometimes the data you need generated requires a combination of
different makers. Fictional provides functions for doing this: they take in an
identifying value and makers as arguments, and compose these makers in some way
to produce a corresponding output. These kinds of makers are described in the
docs as [_composition_ makers](#composition). [`join()`](#join) (shown above) is
an example of a such a maker.

In the example above, a maker returning fictitious street addresses is formed by
using [`join()`](#join) to compose [`int`](#int), [`word()`](#word), and other
composing maker, [`oneOf`](#oneOf).

Under the hood, composition makers re-hash the identifying value each time a
maker is given as input is used. This ensures that a unique value is generated
for each maker provided, while still keeping the result deterministic. In the
example below, the [`tuple()`](#tuple) maker ensures that each word in the
returned array has a different value.

```js
tuple('id-1', [word, word])
// => [ 'et', 'certa' ]

// this is roughly the same as doing
word(hash('id-1')), word(hash(hash('id-1')))
```

### <a name="overview-options" href="#overview-options">#</a> Options

Many makers accept an options object as an argument for configuring how the
generated output looks:

```js
int('id-1')
// => 656963231996220

int('id-1', {
  min: 1,
  max: 99
})
// => 7
```

As a convenience, it is also possible to extend these makers to use specific
options by using the `.options()` api:

```js
const newInt = int.options({
  min: 1,
  max: 99
})

newInt('id-1')
// => 7

newInt('id-2')
// => 57
```

`.options()` returns a new function that will call the original maker function
with the given arguments. It is still possible to provide options when calling
the returned function. In this case, these options will override any options
given to `.options()`:

```js
const newInt = int.options({
  min: 1,
  max: 99
})

newInt('id-1', { max: 3 })
// => 1
```

`.options()` can also be called on the returned function, to further extend the
maker:

```js
const newInt = int.options({ min: 1 }).options({ max: 99 })

newInt('id-1')
// => 7

newInt('id-2')
// => 57
```

### <a name="overview-currying" href="#overview-currying">#</a> Currying

[Composition makers](#composition) take in more than one required argument. If
the identifying [`input`](#overview-makers) value is not given as an argument
(one less than the required arguments is provided), then a new function will be
returned. This function will take an identifying input value as its only
argument, and call the original composition maker with both this argument and
the other required arguments initially given. This limited form of
[currying](https://en.wikipedia.org/wiki/Currying) can be convienent for
composing makers:

```js
const companyName = join(' ', [word, oneOf(['Incorporated', 'Systems'])])

companyName('id-1')
// => 'et Incorporated'

companyName('id-2')
// => 'hac Incorporated'
```

### <a name="overview-security" href="#overview-security">#</a> Security

Under the hood, Fictional uses a
[keyed hash function called SipHash](https://en.wikipedia.org/wiki/SipHash) in
order to map input values to output values deterministically.

Out of the box, fictional uses a **hardcoded key**. If it is important that no
information about the input values can be inferred, then you'll need to generate
and use your own key instead:

```js
const key = hash.setKey('aSY3k#uf^dHlj12@')
```

## <a name="api-ref" href="#api-ref">#</a> API Reference

### <a name="primaries" href="#primaries">#</a> Primaries

#### <a name="int" href="#int">#</a> `int(input[, options])`

Takes in an identifying [`input`](#overview-makers) value and returns an
integer.

```js
int('id-23')
// => 2211849950287729
```

##### `options`

- **`min=1` and `max=Number.MAX_SAFE_INTEGER`:** the minimum and maximum
  possible values for returned numbers

```js
int('id-2', {
  min: 2,
  max: 99
})
// => 15
```

#### <a name="bool" href="#int">#</a> `bool(id)`

Takes in an identifying [`input`](#overview-makers) value and returns a boolean.

```js
bool('id-23')
// => true
```

#### <a name="float" href="#float">#</a> `float(id[, options])`

Takes in an identifying [`input`](#overview-makers) value and returns a number
value with both a whole and decimal segment.

```js
float('id-23')
// => 4139094247650.859
```

##### `options`

- **`min=1` and `max=Number.MAX_SAFE_INTEGER`:** the minimum and maximum
  possible values for returned numbers

```js
float('id-2', {
  min: 2,
  max: 99
})
// => 2.54
```

#### <a name="dateString" href="#date-string">#</a> `dateString(id[, options])`

Takes in an identifying [`input`](#overview-makers) value and returns a string
representing a date in
[ISO 8601](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString)
format.

```js
dateString('id-23')
// => '1989-02-18T02:01:32.000Z'
```

##### `options`

- **`minYear=1980` and `maxYear=2019`:** the minimum and maximum possible year
  values for returned dates

```js
dateString('id-2', {
  minYear: 1980,
  maxYear: 2089
})
// => '2003-06-14T18:06:24.000Z'
```

#### <a name="char" href="#char">#</a> `char(input)`

Takes in an identifying [`input`](#overview-makers) value and returns a string
with a single character.

```js
char('id-23')
// => 'B'
```

The generated character will be an alphanumeric: lower and upper case ASCII
letters and digits 0 to 9. Alternative character ranges are listed
[below](#char-ranges). To choose your own range of characters, see
[`char.inRanges()`](#char-in-ranges).

##### Predefined character ranges

```js
char.ascii('id-2')
// => '_'

char.digit('id-3')
// => '0'
```

Fictional ships with makers for a predefined set of character ranges. Similar to
`char()`, these makers take in only an identifying [`input`](#overview-makers)
value as an argument and return a string with a single character. The following
ranges are available:

- `char.ascii`: Any ASCII character
- `char.digit`: Characters for numbers 0 to 9
- `char.alphanumeric` (alias: `char`): lower and upper case ASCII letters and
  digits 0 to 9
- `char.letter` (alias: `char.asciiLetter`): Lower and upper case ASCII letters
- `char.lower` (alias: `asciiLower`): Lower case ASCII letters
- `char.upper` (alias `char.asciiUpper`): Upper case ASCII letters

- `char.unicode`: Any character from the ASCII and
  [Latin-1 Supplement](<https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)>)
  unicode blocks
- `char.unicodeLetter`: Lower and upper case letters from the ASCII and Latin-1
  Supplement unicode blocks
- `char.unicodeLower`: Lower case letters from the ASCII and Latin-1 Supplement
  unicode blocks
- `char.unicodeUpper`: Upper case letters from the ASCII and Latin-1 Supplement
  unicode blocks

- `char.latin1`: Any character from the Latin-1 Supplement unicode block
- `char.latin1Letter`: Lower and upper case Latin-1 Supplement letters
- `char.latin1Lower`: Lower case Latin-1 Supplement letters
- `char.latin1Upper`: Upper case Latin-1 Supplement letters

##### <a name="char-in-ranges" href="#char-in-ranges">#</a> `char.inRanges(ranges)`

Takes in an array of `[min, max]` pairs, where `min` and `max` are integers
specifying the minimum and maximum possible
[Unicode code point](https://en.wikipedia.org/wiki/List_of_Unicode_characters)
values for a desired range of characters, and returns a maker function that will
return characters in those given ranges.

```js
const symbols = char.inRanges([
  // misc symbols
  [0x2600, 0x26ff],

  // emoticons
  [0x1f600, 0x1f64f]
])

symbols('id-1')
// => '⚜'
```

`char.inRanges` is designed to allow characters in the ranges given to all have
a similar likelihood of being returned.

To allow for composition, each item in the array of `ranges` can also be a
pre-defined character range, or another character range defined using
`char.inRanges()`:

```js
const misc = char.inRanges([[0x2600, 0x26ff]])
const emoticons = char.inRanges([[0x1f600, 0x1f64f]])
const letterOrSymbol = char.inRanges([misc, emoticons, char.letter])

letterOrSymbol('id-2')
// => '😑'
```

#### <a name="word" href="#word">#</a> `word(id[, options])`

Takes in an identifying [`input`](#overview-makers) value and returns a string
value resembling a fictitious word.

```js
word('id-23')
// => 'nostrum'
```

##### `options`

- **`capitalize=true`:** whether or not the word should start with an upper case
  letter
- **`unicode=false`:** whether or not the string should contain non-ascii
  unicode characters. If `true` is given, each returned word will always contain
  a single unicode character. If `false` is given, each returned word will never
  contain non-ascii characters. If a value between `0` and `1` is given, that
  value will represent the probability of a returned value containing a single
  unicode character.
- **`minSyllables=2` and `maxSyllables=4`:** the minimum and maximum possible
  number of syllables that returned words will contain

```js
word('id-2', {
  minSyllables: 1,
  maxSyllables: 6,
  unicode: 0.382
})
// => 'ƥot'
```

#### <a name="words" href="#words">#</a> `words(id[, options])`

Takes in an identifying [`input`](#overview-makers) value and returns a string
value resembling fictitious words.

```js
words('id-23')
// => 'Sempit iudicos quidem'
```

##### `options`

- **`min=2` and `max=3`:** the minimum and maximum possible number of words that
  returned strings will contain.
- **`capitalize='first'`:** whether or not the words should start with upper
  case letters. If `true` or `'all'` is given, each string returned will start
  with an upper case letter in each word. If `'first'` is given, for each string
  returned, only the first word will start with an upper case letter. If `false`
  is given, each string returned will always contain only lower case letters.
- **`unicode=false`:** whether or not the string should contain non-ascii
  unicode characters. If `true` is given, each returned word will always contain
  a single unicode character. If `false` is given, each returned word will never
  contain non-ascii characters. If a value between `0` and `1` is given, that
  value will represent the probability of a returned value containing a single
  unicode character.
- **`minSyllables=1` and `maxSyllables=4`:** the minimum and maximum possible
  number of syllables that returned words will contain

```js
words('id-2', {
  min: 5,
  max: 8,
  unicode: 0.618,
  capitalize: 'all'
})
// => 'Ad Nobis Aȑ Alter Es Quid'
```

#### <a name="sentence" href="#sentence">#</a> `sentence(id[, options])`

Takes in an identifying [`input`](#overview-makers) value and returns a string
value resembling a sentence of fictitious words.

```js
sentence('id-23')
// => 'Statueret verter me nullo quanto dedit, mot volup si dur vacuit ub quanto.'
```

##### `options`

- **`minClauses=1` and `maxClauses=2`:** the minimum and maximum possible number
  of clauses that a returned sentence will contain.
- **`minWords=5` and `maxWords=8`:** the minimum and maximum possible number of
  words that each clause will contain.
- **`unicode=false`:** whether or not the string should contain non-ascii
  unicode characters. If `true` is given, each returned word will always contain
  a single unicode character. If `false` is given, each returned word will never
  contain non-ascii characters. If a value between `0` and `1` is given, that
  value will represent the probability of a returned value containing a single
  unicode character.
- **`minSyllables=1` and `maxSyllables=4`:** the minimum and maximum possible
  number of syllables that returned words will contain

```js
sentence('id-2', {
  minClauses: 2,
  maxClauses: 3,
  minWords: 2,
  maxWords: 3,
  unicode: 0.9
})
// => 'Tậmentis summṓ, eṣ viɗer.'
```

#### <a name="paragraph" href="#paragraph">#</a> `paragraph(id[, options])`

Takes in an identifying [`input`](#overview-makers) value and returns a string
value resembling a paragraph of fictitious words.

```js
paragraph('id-23')
// => 'Faciuntur tibusque tal et loco eademus quod incor, vitam et nobis dic idis dol liberrat qui. Par ef hoc quid volup anum partien quod, plac se non es propteris. Aut a quae sed quanto. Ipse per quod periora fore earum melius. Est et primos in hoc. Uri propter are es fug. Homintel civium ep prob il sapientium et, numquam secun ate quid percipesse sit oderitis brevis.'
```

##### `options`

- **`minSentences=3` and `minSentences=7`:** the minimum and maximum possible
  number of sentences that a returned paragraph will contain.
- **`minClauses=1` and `maxClauses=2`:** the minimum and maximum possible number
  of clauses that each sentence will contain.
- **`minWords=5` and `maxWords=8`:** the minimum and maximum possible number of
  words that each clause will contain.
- **`unicode=false`:** whether or not the string should contain non-ascii
  unicode characters. If `true` is given, each returned word will always contain
  a single unicode character. If `false` is given, each returned word will never
  contain non-ascii characters. If a value between `0` and `1` is given, that
  value will represent the probability of a returned value containing a single
  unicode character.
- **`minSyllables=1` and `maxSyllables=4`:** the minimum and maximum possible
  number of syllables that returned words will contain

```js
paragraph('id-2', {
  minSentences: 2,
  minSentences: 3,
  unicode: 0.9
})
// => 'Vero ǡb laeţet deṯ q̃ui. Iḋ é̩t aṕ iucunẗur physicī ipsaḿ. Voluptaṭion cửm ȭmnino ernữm ʋol, hạec siţ oḿ ültim niĥillud. Morbos liƀ dè oḿnes sę̃d.'
```

### <a name="composition" href="#composition">#</a> Composition

#### <a name="join" href="#join">#</a> `join(input, joiner, values)`

Takes in an identifying [`input`](#overview-makers) value and an array of makers
as `values`, calls each with a unique identifying input, and joins the results
with the given `joiner`.

```js
join('id-23', ' ', [word, oneOf(['Street', 'Drive'])])
// => 'omne Drive'
```

If an item in the `value` array is not a function, that value will be used
as-is:

```js
join('id-2', ' ', [word, 'Drive'])
// => 'hac Drive'
```

`joiner` can also be a function, in which case it will be called with the
results of resolving each item in `values` as input:

```js
join('id-3', ([a, b, c]) => `${a}-${b} ${c}`, [word, word, word])
// => 'potes-orum reliq'
```

If any of the items in `values` resolves to a nested array, that array will be
flattened (regardless of nesting depth):

```js
join('id-2', '', [char.letter, times(3, char.alphanumeric)])
// => 'redU'
```

#### <a name="oneOf" href="#oneOf">#</a> `oneOf(input, values)`

Takes in an identifying [`input`](#overview-makers) value and an array of
`values`, and returns an item in `values` that corresponds to that `input`:

```js
oneOf('id-23', ['red', 'green', 'blue'])
// => 'red'
```

If an item in `values` is a maker, that maker will be called and the result will
be returned:

```js
oneOf('id-2', [int, word, char])
// => 'legum'
```

#### <a name="someOf" href="#someOf">#</a> `someOf(input, range, values)`

Takes in an identifying [`input`](#overview-makers) value and an array of
`values`, repeatedly picks items from that array a number of times within the
given `range`. Each item will be picked no more than once.

```js
someOf('id-23', [1, 2], ['red', 'green', 'blue'])
// => []
```

As shown above, `range` can be a tuple array of the minimum and maximum possible
number of items that can be picked.

It can also be given as a number, in which case exactly that number of items
will be picked:

```js
someOf('id-2', 2, ['red', 'green', 'blue'])
// => [ 'blue', 'green' ]
```

If an item in `values` is a maker, that maker will be called and the result will
be returned:

```js
someOf('id-3', [1, 2], [int, word, char])
// => []
```

#### <a name="times" href="#times">#</a> `times(input, range, maker)`

Takes in an identifying [`input`](#overview-makers) value and a `maker`, calls
that maker repeatedly (each time with a unique input) for a number of times
within the given `range`, and returns the results as an array:

```js
times('id-23', [4, 5], word)
// => [ 'me', 'cula', 'quam', 'iam' ]
```

As shown above, `range` can be a tuple array of the minimum and maximum possible
number of times the maker should be called. It can also be given as a number, in
which case the given maker will be called exactly that number of times:

```js
times('id-2', 2, word)
// => [ 'retinan', 'effic' ]
```

#### <a name="tuple" href="#tuple">#</a> `tuple(input, values)`

Takes in an identifying [`input`](#overview-makers) value and an array of makers
as `values`, calls each with a unique identifying input, and returns the array
of results.

```js
tuple('id-23', [char, char])
// => [ '7', 'A' ]
```

If an item in the `value` array is not a function, that value will be used
as-is:

```js
tuple('id-2', [char, '!'])
// => [ 'f', '!' ]
```

#### <a name="shape" href="#shape">#</a> `shape(input, properties)`

Takes in an identifying [`input`](#overview-makers) value and an object of
makers as `properties`, calls each property's value with a unique identifying
input, and returns results as an object.

```js
shape('id-23', {
  firstName: word,
  lastName: word
})
// => { firstName: 'haec', lastName: 'manens' }
```

If an item in the `properties` object is not a function, that value will be used
as-is:

```js
shape('id-23', {
  name: join(' ', [word, word]),
  active: true
})
// => { name: 'vitam a', active: true }
```

#### <a name="oneOfWeighted" href="#oneOfWeighted">#</a> `oneOfWeighted(id, values)`

Takes in an identifying [`input`](#overview-makers) value and a `value` array of
consisting of `[probability, value]` pairs, and returns one of one of the values
in that array. The likelihood of a particular `value` being returned will
correspond to the `probability` given for it, where `probability` is a number
between `0` and `1`.

```js
oneOfWeighted('id-23', [
  [0.9, 'red'],
  [0.05, 'green'],
  [0.05, 'blue']
])
// => 'red'
```

If an item in `values` is a maker, that maker will be called and the result will
be returned:

```js
oneOfWeighted('id-2', [
  [0.9, word],
  [0.05, char],
  [0.05, int]
])
// => 'ut'
```

For each `[probability, value]` pair in the array of `values`, if the given
`probability` is not a number, that probability will be considered _unassigned_.
All items with unassigned probabilities will receive an equal share of the
remaining probability after accounting for all items with assigned probabilities
(all items for which a number value was given for their probability). In the
example below, `'green'` and `'blue'` will both have a probability of `0.4` of
being returned (`(1 - 0.2) / 2`).

```js
oneOfWeighted('id-23', [
  [0.2, 'red'],
  [null, 'green'],
  [null, 'blue']
])
// => 'green'
```

## <a name="install-use" href="#install-use">#</a> Install & Use

You can use fictional as the npm package `fictional`:

```
npm i -D fictional  # chances are you want it as a devDependency
# or
yarn add -D fictional
```

Fictional can be used in both es-module-aware and commonjs
bundlers/environments.

```js
// es module
import { word } from 'fictional'

// or alternatively
import word from 'fictional/word'

// commonjs
const { word } = require('fictional')

// or alternatively
const word = require('fictional/word')
```

It can also be used a `<script>`:

```html
<script
  crossorigin
  src="https://unpkg.com/fictional/dist/umd/fictional.js"
></script>

<script>
  fictional.word('some-identifier')
</script>
```

```

```
