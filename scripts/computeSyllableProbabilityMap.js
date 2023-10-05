const fs = require('fs')

const LETTER = /[a-zA-Z]/
const PUNCTUATION = /[ .,'"()[\]?-]/
const SYLLABLE_HEURISTIC = /^[^aeiou]*[aeiou]+[^aeiou]?$/

const splitIntoSyllables = text => {
  let i = -1
  const n = text.length

  const results = []
  let current = ''

  while (++i < n) {
    const char = text[i].toLowerCase()

    if (PUNCTUATION.test(char)) {
      if (current.length) {
        results.push(current)
        results.push('')
        current = ''
      }
    } else if (LETTER.test(char)) {
      if (
        SYLLABLE_HEURISTIC.test(current) &&
        !SYLLABLE_HEURISTIC.test(current + char)
      ) {
        results.push(current)
        current = char
      } else {
        current += char
      }
    }
  }

  return results
}

const buildSyllableCountMap = inputAsSyllables => {
  const result = {}
  let syllable = inputAsSyllables[0]
  const n = inputAsSyllables.length
  let i = 0

  while (++i < n) {
    let nextSyllable = inputAsSyllables[i]

    const syllableRecord = (result[syllable] = result[syllable] ?? {})
    syllableRecord[nextSyllable] = (syllableRecord[nextSyllable] ?? 0) + 1
    syllable = nextSyllable
  }

  return result
}

const buildSyllableProbabilityMapForSyllable = countMap => {
  const result = []
  const sum = Object.values(countMap).reduce((sum, value) => sum + value, 0)

  for (const nextSyllable of Object.keys(countMap)) {
    result.push([nextSyllable, countMap[nextSyllable] / sum])
  }

  return result.sort((a, b) => a[1] - b[1])
}

const buildSyllableProbabilityMap = syllableCountMap => {
  const result = {}

  for (const [syllable, countMap] of Object.entries(syllableCountMap)) {
    result[syllable] = buildSyllableProbabilityMapForSyllable(countMap)
  }

  return result
}

const main = () => {
  const input = fs.readFileSync('/dev/stdin').toString()
  const inputAsSyllables = splitIntoSyllables(input)
  const syllableCountMap = buildSyllableCountMap(inputAsSyllables)
  const syllableProbabilityMap = buildSyllableProbabilityMap(syllableCountMap)
  console.log(JSON.stringify(syllableProbabilityMap))
}

main()
