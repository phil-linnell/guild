const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const postcssNested = require('postcss-nested');
const postcssImport = require('postcss-import');
const postcssCustomMedia = require('postcss-custom-media');

const PATHS = {
  app: path.join(__dirname, './src'),
  build: path.join(__dirname, './public')
}

module.exports = {
  context: PATHS.app,
  entry: {
    jsx: './app.js',
    html: './index.html',
    vendor: [
      'react',
      'react-dom',
      'lodash'
    ]
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.(js|jsx)$/,
        include: PATHS.app,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // })
  ]
};
