var PATH = require('path');

module.exports = {
  entry: './src/index.js',

  resolve: {
      alias: {
          'react': 'react-lite',
          'react-dom': 'react-lite'
      }
  },

  output: {
    filename: './dist/bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        },
        include: PATH.src
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  }
}
