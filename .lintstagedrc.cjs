module.exports = {
  'src/**/*.{ts,tsx}': [
    'eslint --max-warnings 0',
    `tsc ${getTscFlags()} --skipLibCheck --noEmit --pretty`, // checks for typescript error
    'prettier --write',
  ],
};

/**
 * Generate flags for `tsc` command based on `tsconfig.json`.
 * This is needed for `lint-staged` because passing filename args will make `tsc` ignore `tsconfig.json`.
 */
function getTscFlags() {
  const tsconfigJson = require('node:fs').readFileSync('./tsconfig.json');
  const tsconfig = require('json5').parse(tsconfigJson.toString());

  return Object.entries(tsconfig.compilerOptions)
    .filter(([key, value]) => !!value && key !== 'paths') // `paths` are not supported in cli
    .map(([key, value]) => {
      if (Array.isArray(value)) return `--${key} ${value.join(',')}`;
      if (typeof value === 'string') return `--${key} ${value}`;
      return `--${key}`;
    })
    .join(' ');
}
