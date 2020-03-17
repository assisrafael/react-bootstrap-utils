import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/main.js',
    format: 'es',
  },
  plugins: [
    resolve({
      extensions: ['.mjs', '.js', '.json', '.jsx'],
    }),
    babel({
      exclude: 'node_modules/**', // only transpile our source code
    }),
  ],
  external: ['react', 'prop-types', 'react-modal', 'react-dom'],
};
