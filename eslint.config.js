module.exports = [
  require('@oftherivier/tools/eslint/ignores'),
  require('@oftherivier/tools/eslint')({
    files: ['.*.js', 'eslint.config.js', 'tests/**/*.js']
  })(),
  require('@oftherivier/tools/eslint/es5')({
    files: ['*.js', 'utils/**/*.js']
  })()
]
