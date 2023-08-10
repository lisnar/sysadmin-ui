// ESLint guide: config properties explained, plugin & rules recommendation
// https://www.mariasimo.codes/guide-eslint-part-1-eslint-legacy

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    // Default extends from Vite
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',

    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:storybook/recommended',
  ],
  ignorePatterns: ['/*', '!/src'], // ignores all except `src` directory
  // Default parser & parserOptions from Vite
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['react-refresh'],
  rules: {
    // Validate that components can safely be updated with fast refresh.
    // https://github.com/ArnaudBarre/eslint-plugin-react-refresh#options
    // More info about fast refresh: https://www.npmjs.com/package/react-refresh
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
  settings: {
    // Fix "Warning: React version not specified in eslint-plugin-react settings."
    // https://github.com/jsx-eslint/eslint-plugin-react#configuration
    'react': { version: 'detect' },
    // Enable `eslint-plugin-import` to resolve absolute paths defined in `tsconfig.json`.
    // https://github.com/import-js/eslint-plugin-import#typescript
    'import/resolver': { node: true, typescript: true },
  },
};
