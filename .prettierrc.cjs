module.exports = {
  tabWidth: 2,
  bracketSpacing: false,
  singleQuote: true,
  arrowParens: 'always',
  semi: false,
  jsxBracketSameLine: false,
  trailingComma: 'all',
  printWidth: 180,

  overrides: [
    {
      files: ['./app/providers/language-provider.tsx'],
      options: {
        printWidth: 0,
      },
    },
  ],
}
