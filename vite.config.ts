import react from '@vitejs/plugin-react-swc';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const projectDir = resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Enable bundler to resolve absolute path.
  // https://vitejs.dev/config/shared-options.html#resolve-alias
  // https://github.com/rollup/plugins/tree/master/packages/alias#entries
  resolve: {
    alias: [{ find: /^~\/(.*)/, replacement: `${projectDir}/src/$1` }],
  },
});
