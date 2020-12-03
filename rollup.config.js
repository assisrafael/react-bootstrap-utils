/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable import/no-default-export */
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/index.js',
  plugins: [
    resolve({
      extensions: ['.mjs', '.js', '.json', '.jsx'],
    }),
    babel({
      babelHelpers: 'runtime',
      exclude: /node_modules/, // only transpile our source code
    }),
  ],
  output: {
    file: 'dist/main.js',
    format: 'es',
  },
  external: [/@babel\/runtime/, 'react', 'prop-types', 'react-modal', 'react-dom', 'js-var-type'],
};
