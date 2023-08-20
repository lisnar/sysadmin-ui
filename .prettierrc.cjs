module.exports = {
  printWidth: 100,
  quoteProps: 'consistent',
  singleQuote: true,
  trailingComma: 'all',

  plugins: [
    'prettier-plugin-organize-imports',
    'prettier-plugin-tailwindcss', // sort tailwind classes
  ],
  // Sort tailwind classes outside the `className` attribute.
  // https://github.com/tailwindlabs/prettier-plugin-tailwindcss#sorting-classes-in-function-calls
  tailwindFunctions: ['cva'],
};
