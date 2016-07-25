import autoprefixer from 'autoprefixer'
import PATHS from './paths'

const common = {
  resolve: {
    root: [
      PATHS.src,
      PATHS.node_modules,
    ],
    extensions: ['', '.js', '.json', '.scss', '.sass'],
  },
  module: {
    preLoaders: [
      {
        test: /\.scss$|\.sass$/,
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
        test: /\.scss$|\.sass$/,
        loaders: ['style', 'css', 'sass'],
        include: PATHS.src,
      },
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
}

export default common
