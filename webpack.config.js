const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const postcssNested = require('postcss-nested');
const postcssImport = require('postcss-import');
// const postcssImport = require('postcss-import');

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
        test: /\.css$/,
        loader: 'style!css!postcss?sourceMap',
        include: PATHS.app
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    }),
    postcssNested,
    postcssImport
  ],
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    contentBase: PATHS.build
  }
};
