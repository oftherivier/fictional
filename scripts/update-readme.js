#!/usr/bin/env node
const fs = require('fs')
const vm = require('vm')
const util = require('util')
const path = require('path')
const { createRequire } = require('module')

const readmePath = process.argv[2]
const header = process.argv[3] || ''
const ignoreRegex = process.argv[4] ? new RegExp(process.argv[4], 'g') : null

const parseReadme = source => {
  const nodes = []
  let lines = source.split('\n')

  while (lines.length) {
    const nextCodeBlockStart = lines.findIndex(isCodeBlockIndicatorLine)

    if (nextCodeBlockStart > -1) {
      const linesFromCodeBlockStart = lines.slice(nextCodeBlockStart + 1)
      const nextCodeBlockEnd = linesFromCodeBlockStart.findIndex(
        isCodeBlockIndicatorLine
      )

      if (nextCodeBlockEnd < 0) {
        throw new Error('Found code block without an end marker')
      }

      const codeBlock = linesFromCodeBlockStart.slice(0, nextCodeBlockEnd)
      const textBeforeCodeBlock = lines.slice(0, nextCodeBlockStart)

      if (textBeforeCodeBlock.length) {
        nodes.push({
          kind: 'text',
          value: textBeforeCodeBlock.join('\n')
        })
      }

      nodes.push({
        kind: 'code',
        code: codeBlock.join('\n'),
        startLine: lines[nextCodeBlockStart]
      })

      lines = linesFromCodeBlockStart.slice(nextCodeBlockEnd + 1)
    } else {
      nodes.push({
        kind: 'text',
        value: lines.join('\n')
      })

      lines = []
    }
  }

  return nodes
}

const parseCode = code => {
  const blocks = []
  let lines = code.split('\n')

  while (lines.length) {
    const nextExampleStart = lines.findIndex(isExampleStartMarker)

    if (nextExampleStart > -1) {
      const nextExampleStartLine = lines[nextExampleStart]
      let nextExampleEnd = nextExampleStart

      if (isMultiLineExampleStartMarker(nextExampleStartLine)) {
        nextExampleEnd = lines.findIndex(isMultilineCommentEndMarker)

        if (nextExampleEnd < 0) {
          throw new Error('Unending multiline comment found')
        }
      }

      blocks.push({
        kind: 'example',
        value: lines.slice(0, nextExampleStart).join('\n')
      })

      const linesFromExampleEnd = lines.slice(nextExampleEnd + 1)
      lines = linesFromExampleEnd
    } else {
      blocks.push({
        kind: 'normal',
        value: lines.join('\n')
      })

      lines = []
    }
  }

  return blocks
}

const isExampleStartMarker = s =>
  s.includes('// =>') || isMultiLineExampleStartMarker(s)

const isMultiLineExampleStartMarker = s => s.includes('/* =>')

const isMultilineCommentEndMarker = s => s.includes('*/')

const transformNode = node => {
  if (node.kind === 'text') {
    return node
  }

  const context = vm.createContext({
    require: createRequire(path.join(process.cwd(), 'tmp.js'))
  })
  vm.runInContext(header, context)

  let result = ''

  for (const block of parseCode(node.code)) {
    if (block.kind === 'normal') {
      result += `${block.value}\n`
    } else {
      try {
        let code = block.value

        if (ignoreRegex) {
          code = block.value.replaceAll(ignoreRegex, '')
        }

        const blockResult = vm.runInContext(code, context)

        const stringifiedBlockResult = util.inspect(blockResult)

        if (stringifiedBlockResult.indexOf('\n') !== -1) {
          result += `${block.value}\n/* =>\n${stringifiedBlockResult}\n*/\n`
        } else {
          result += `${block.value}\n// => ${stringifiedBlockResult}\n`
        }
      } catch (e) {
        throw new Error(
          `Error in code block:\nError:\n${e.stack}\n\nCode block:\n${block.value}`
        )
      }
    }
  }

  return {
    ...node,
    code: result
  }
}

const stringify = nodes => {
  let result = ''

  for (const node of nodes) {
    if (node.kind === 'text') {
      result += `${node.value}\n`
    } else if (node.kind === 'code') {
      result += `${node.startLine}\n${node.code}${'```'}\n`
    }
  }

  return result
}

const isCodeBlockIndicatorLine = line => line.includes('```')

const main = () => {
  const currentReadme = fs.readFileSync(readmePath).toString().trim()
  let nodes = parseReadme(currentReadme)
  nodes = nodes.map(transformNode)
  const result = stringify(nodes)
  if (process.env.DRY) {
    process.stdout.write(result)
  } else {
    fs.writeFileSync(readmePath, result)
  }
}

if (require.main === module && !process.env.IS_WORKER) {
  main()
}
