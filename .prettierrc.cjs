module.exports = {
  printWidth: 100,
  quoteProps: 'consistent',
  singleQuote: true,
  trailingComma: 'all',

  plugins: [
    'prettier-plugin-organize-imports',
    'prettier-plugin-tailwindcss', // sort tailwind classes
  ],
};
