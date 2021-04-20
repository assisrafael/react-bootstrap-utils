'use strict';

const webpack = require('webpack');

module.exports = [
  {
    entry: './src/index.js',
    externals: {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
      },
    },
    output: {
      library: 'ReactBootstrapUtils',
      libraryTarget: 'umd',
      globalObject: 'this',
    },
  },
  {
    entry: './demo/demo.jsx',
    output: {
      path: `${__dirname}/demo`,
      filename: 'demo.js',
    },
    devServer: {
      contentBase: `${__dirname}/demo`,
      hot: true,
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
  },
  {
    entry: './docs/docs.jsx',
    output: {
      path: `${__dirname}/docs`,
      filename: 'scripts.js',
    },
  },
].map((setup) => ({
  ...setup,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
}));
