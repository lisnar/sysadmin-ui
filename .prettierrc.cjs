module.exports = {
  printWidth: 100,
  quoteProps: 'consistent',
  singleQuote: true,
  trailingComma: 'all',

  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: ['<BUILTIN_MODULES>', '<THIRD_PARTY_MODULES>', '^[.]'],
};
