import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import PATHS from './paths'

const production = {
  devtool: 'source-map',

  entry: [
    path.join(PATHS.src, 'index.js'),
  ],

  module: {
    preLoaders: [
      {
        test: /\.css$|\.scss$|\.sass$/,
        loaders: ['postcss'],
        include: PATHS.src,
      },
    ],
    loaders: [
      {
        test: /\.css$|\.scss$|\.sass$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass'),
        include: PATHS.src,
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
}

export default production
