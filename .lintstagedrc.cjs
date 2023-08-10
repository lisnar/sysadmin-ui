module.exports = {
  '*.{ts,tsx}': [
    'eslint --max-warnings 0',
    // Check for typescript error by transpiling the project.
    // Filename input is ignored because `tsconfig.json` cannot be mixed with source files.
    (_file) => 'tsc --skipLibCheck --noEmit --pretty',
    'prettier --write',
  ],
};
