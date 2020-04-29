exports.isCapitalized = s =>
  s[0].toUpperCase() === s[0] && s.slice(1).toLowerCase() === s.slice(1)
