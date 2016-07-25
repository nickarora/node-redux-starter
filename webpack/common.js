import autoprefixer from 'autoprefixer'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import PATHS from './paths'
import path from 'path'

const common = {
  resolve: {
    root: [
      PATHS.src,
      PATHS.node_modules,
    ],
    extensions: ['', '.js', '.json', '.css', '.scss', '.sass'],
  },
  module: {
    preLoaders: [
      {
        test: /\.css$|\.scss$|\.sass$/,
        loaders: ['postcss'],
        include: PATHS.src,
      },
      {
        test: /\.js$/,
        loaders: ['eslint'],
        include: [PATHS.src, PATHS.test],
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: [PATHS.src, PATHS.test],
      },
      {
        test: /\.json/,
        loaders: ['json'],
      },
    ],
  },
  postcss: () => [
    autoprefixer,
  ],
  plugins: [
    new CopyWebpackPlugin([
      { from: path.join(__dirname, '..', 'vendor'), to: PATHS.dist },
    ]),
  ],
}

export default common
