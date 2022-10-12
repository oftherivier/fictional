# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.6.0](https://github.com/oftherivier/fictional/compare/v0.5.0...v0.6.0) (2022-10-12)


### ⚠ BREAKING CHANGES

* Use Number.MAX_SAFE_INTEGER as the max for int() and float()

### Features

* Support forwarding options with oneOf() ([5e10736](https://github.com/oftherivier/fictional/commit/5e107361f8522a2f8d8c0b1da4f7adbb15357851))


### Bug Fixes

* Use Number.MAX_SAFE_INTEGER as the max for int() and float() ([9ebcef8](https://github.com/oftherivier/fictional/commit/9ebcef85957fa67b2e26a9938d8fd2fc88e6604d)), closes [#30](https://github.com/oftherivier/fictional/issues/30)

## [0.5.0](https://github.com/oftherivier/fictional/compare/v0.4.15...v0.5.0) (2022-09-19)


### ⚠ BREAKING CHANGES

* Use only md5 for hashing (remove string-hash)

### Features

* Use only md5 for hashing (remove string-hash) ([05d2354](https://github.com/oftherivier/fictional/commit/05d2354997febcad38d9b2ae7625024ab541d495)), closes [#29](https://github.com/oftherivier/fictional/issues/29)

### [0.4.15](https://github.com/oftherivier/fictional/compare/v0.4.14...v0.4.15) (2022-07-14)

### [0.4.14](https://github.com/oftherivier/fictional/compare/v0.4.13...v0.4.14) (2022-07-14)

### [0.4.13](https://github.com/oftherivier/fictional/compare/v0.4.12...v0.4.13) (2022-05-09)

### [0.4.12](https://github.com/oftherivier/fictional/compare/v0.4.11...v0.4.12) (2022-05-03)

### [0.4.11](https://github.com/oftherivier/fictional/compare/v0.4.10...v0.4.11) (2022-05-02)

### [0.4.10](https://github.com/oftherivier/fictional/compare/v0.4.9...v0.4.10) (2022-05-02)

### [0.4.9](https://github.com/oftherivier/fictional/compare/v0.4.8...v0.4.9) (2022-05-02)

### [0.4.8](https://github.com/oftherivier/fictional/compare/v0.4.7...v0.4.8) (2022-04-30)

### [0.4.7](https://github.com/oftherivier/fictional/compare/v0.4.6...v0.4.7) (2022-04-30)

### [0.4.6](https://github.com/oftherivier/fictional/compare/v0.4.5...v0.4.6) (2022-04-30)

### [0.4.5](https://github.com/oftherivier/fictional/compare/v0.4.4...v0.4.5) (2020-05-29)

### [0.4.4](https://github.com/oftherivier/fictional/compare/v0.4.3...v0.4.4) (2020-05-24)

### [0.4.3](https://github.com/oftherivier/fictional/compare/v0.4.2...v0.4.3) (2020-05-24)


### Bug Fixes

* **esm:** Fix paths for conditional exports ([9bf236c](https://github.com/oftherivier/fictional/commit/9bf236cea86ac1e89a2b24c93378c0a093984267))

### [0.4.2](https://github.com/oftherivier/fictional/compare/v0.4.1...v0.4.2) (2020-05-24)


### Bug Fixes

* **esm:** Fix module paths in esm wrapper ([27812db](https://github.com/oftherivier/fictional/commit/27812db95a83ea3c737bbaa1b22a6c637a3f1063))

### [0.4.1](https://github.com/oftherivier/fictional/compare/v0.4.0...v0.4.1) (2020-05-21)

## [0.4.0](https://github.com/oftherivier/fictional/compare/v0.3.0...v0.4.0) (2020-05-21)


### Features

* Improve quality of results via namespaced hashes again ([0f86278](https://github.com/oftherivier/fictional/commit/0f862787db0f6a298f9a8a25d70943bce96c4ede))

## [0.3.0](https://github.com/oftherivier/fictional/compare/v0.2.0...v0.3.0) (2020-05-17)


### Features

* Use simpler hash inputs to improve performance ([f501fdf](https://github.com/oftherivier/fictional/commit/f501fdf74d3a284c6d5b4603bbb51a7e120f0b6e))

## [0.2.0](https://github.com/oftherivier/fictional/compare/v0.1.0...v0.2.0) (2020-05-17)


### Features

* **char:** Change char range shorthands ([037b216](https://github.com/oftherivier/fictional/commit/037b2167fe69292ab273a96f1b5e212562080375))
* Faster char() for ranges < 256 ([ea745ea](https://github.com/oftherivier/fictional/commit/ea745ea44fb342b60fd31c5dde967c342d54c74b))

## 0.1.0 (2020-05-16)


### Features

* **char:** Change char api and behaviour ([f2e15c5](https://github.com/oftherivier/fictional/commit/f2e15c5b8b07a09d20a58828da4863d975461270))
* **paragraph:** Change {min,max}Sentences to {3,7} ([6a1027d](https://github.com/oftherivier/fictional/commit/6a1027d980035e1b587bb0111c1604648e2a7c90))
* Alterations to syllables and word generation ([e3ad280](https://github.com/oftherivier/fictional/commit/e3ad280549b1e08b2e8edc744ba29ee938109baf))
* Consistent approach to hashing across makers ([340a0db](https://github.com/oftherivier/fictional/commit/340a0dbfcc7450000857cbe3a29d07a39b33a70f))
* Allow multiple .options() ([9e86cd8](https://github.com/oftherivier/fictional/commit/9e86cd8d2c13abdaf0d711d59a1d68fdd2a0235c))
* **bool:** Obligatory bool() generator ([e67385d](https://github.com/oftherivier/fictional/commit/e67385d3a9012c2a881eb5182898d44e3256ff3c))
* **char:** Support generating chars within a codepoint range ([534db3e](https://github.com/oftherivier/fictional/commit/534db3ed9d4483bb39950e6d3399b5ae2ac6c4fc))
* **datestr:** Support basic datestr ([ea385be](https://github.com/oftherivier/fictional/commit/ea385be5d05f8f9d05b816d4cbf1ed56bee94fb0))
* **dateString:** Support min and max year options ([9a22bd6](https://github.com/oftherivier/fictional/commit/9a22bd638e1feb9c4abc74fb8bb7588ec7c13ae4))
* **float:** Support float() type ([b8e047e](https://github.com/oftherivier/fictional/commit/b8e047e48c1d5c79c298e8f4c8cc97d98474c871))
* **float:** Support min and max ([1851528](https://github.com/oftherivier/fictional/commit/1851528f120209d8d943266d328ab326b0f308f4))
* **int:** Support basic int() type ([a9e2c1f](https://github.com/oftherivier/fictional/commit/a9e2c1f179c08cf03d99a33ec6aa7a44fc91ba9f))
* **int:** Support min and max options ([9e8db55](https://github.com/oftherivier/fictional/commit/9e8db550f776fe74b9f0976be518d5e297328c19))
* **join:** Flatten before joining ([1ff0282](https://github.com/oftherivier/fictional/commit/1ff0282e5f80265348b9d2eaa23256a21f36314f))
* **join:** Support delimeter as joiner ([1d441be](https://github.com/oftherivier/fictional/commit/1d441be23efb21a0bbbf2763d373cdb0c19803b1))
* **join:** Support join() ([6ce20c6](https://github.com/oftherivier/fictional/commit/6ce20c6f7a3c593ae3fee34a8a98a94c566adcc8))
* **modules:** Support es modules via index.mjs ([e28f4f4](https://github.com/oftherivier/fictional/commit/e28f4f4ae9e5e070537d75d97dc7d696529fc863))
* **one-of:** Support basic oneOf ([70ead0f](https://github.com/oftherivier/fictional/commit/70ead0f7d96382bddd4f7ce8eea35f026cfde5c4))
* **oneOf:** Support maker functions as items ([4d80335](https://github.com/oftherivier/fictional/commit/4d80335e89bc3735d00330041540606ccbf00ab0))
* **oneOfWeighted:** Support weighted choosing ([784452a](https://github.com/oftherivier/fictional/commit/784452ad75722bc3fa32dc5b3c6ff2e1b1a7721f))
* **paragraph:** Support paragraphs and sentences ([ab2e6dd](https://github.com/oftherivier/fictional/commit/ab2e6dd604a5f2a36bb4bca9db5a6e7acedc41a9))
* **shape:** Support generating objects of fake data ([fc13ec1](https://github.com/oftherivier/fictional/commit/fc13ec1b1b2f07dbf3eb84e5c3b942a3be69f019))
* **someOf:** Support picking multiple items from sample list ([afee583](https://github.com/oftherivier/fictional/commit/afee583db4f93189396c38653a008ac4bd86da55))
* **times:** Support creating a list out of repeated calls to a maker ([c279c9e](https://github.com/oftherivier/fictional/commit/c279c9efd43ee45bfb988937d9a04a0c65050808))
* **tuple:** Support easier composition via tuple() ([0392ae4](https://github.com/oftherivier/fictional/commit/0392ae46f2e177347be0c17d82d8aa5c8c4c75c5))
* **tuple:** Support non-fn makers ([879c1d1](https://github.com/oftherivier/fictional/commit/879c1d19f5ba5d715ce3a6452abb2fb0f3c7faa7))
* **word:** Always use unicode for individual words by default ([1116dad](https://github.com/oftherivier/fictional/commit/1116dad2e74c794dc02c98165d7c59921b22d37e))
* **word:** Include unicode characters in generated output ([acdc0ea](https://github.com/oftherivier/fictional/commit/acdc0ea6fcfcd374373a22b58e163b939105cb2a))
* **word:** Proof of concept word implementation ([8f8b204](https://github.com/oftherivier/fictional/commit/8f8b2045471c9fe1604aef86ef86314105591fae))
* **word:** Support capitalize option and default to true ([d3fda55](https://github.com/oftherivier/fictional/commit/d3fda55fb9789dfa48c782c404a2f6fdd2a82ecc))
* **word:** Use japenese syllables ([4033e21](https://github.com/oftherivier/fictional/commit/4033e21384c6340406fbe42b859506a047ef2e73))
* **words:** Capitalize all when option is `true` ([b64ec17](https://github.com/oftherivier/fictional/commit/b64ec170f9cab000240b2d3c37253d0ec8c8dac9))
* **words:** Support words() ([a68a3d2](https://github.com/oftherivier/fictional/commit/a68a3d2fa245328788e91173cf48840775570a3b))
* Add typescript type definitions ([c245deb](https://github.com/oftherivier/fictional/commit/c245debfdc306ef0724e13caab805b16511146dd))
* Exports for mjs ([85a72e8](https://github.com/oftherivier/fictional/commit/85a72e8c09aec06e490984fc4ea716473d9d264d))


### Bug Fixes

* Avoid rarer diacritics when unicodifying ([00b4c39](https://github.com/oftherivier/fictional/commit/00b4c396fa6cf6c995e0a50a3dbc2c82382d2e8c))
* Ensure all types hash inputs ([8562404](https://github.com/oftherivier/fictional/commit/8562404aabfc2097dfcfa2427ba56dd73ec13c4b))
* Use compound ids for id sequences ([1e1c598](https://github.com/oftherivier/fictional/commit/1e1c5989334ab0c14607cd5091aa3369b82895d0))
* **types:** Use correct type for char() options parameter ([59e8063](https://github.com/oftherivier/fictional/commit/59e8063fba2aefe099e02efb525a478baa50123c))
* Pass down options correctly for words and sentences ([5cc21c8](https://github.com/oftherivier/fictional/commit/5cc21c89ef82f37d02b24fb84e25b27dbc5b071d))
* **typedefs:** Update type definitions to match api changes and additions ([a9b6424](https://github.com/oftherivier/fictional/commit/a9b6424d30fe5d69af0fcfbe3f4d3e4ce756e8ce))
* Accept null inputs in curried functions ([10a658f](https://github.com/oftherivier/fictional/commit/10a658feaa70fb8f702f15ffd2e92b9bbe555c63))
* **datestr:** Ensure generated date strings are timezone-independent ([9a237c7](https://github.com/oftherivier/fictional/commit/9a237c739fe2de32f81d835e9d5cf2e83ab9fc32))
* **float:** Avoid whole segment colliding with int() ([b38f5ad](https://github.com/oftherivier/fictional/commit/b38f5ad2e4e31465516bca7d91a97fb039a6ccb8))
