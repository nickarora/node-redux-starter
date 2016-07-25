import path from 'path'
import webpack from 'webpack'
import PATHS from './paths'

const development = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    path.join(PATHS.src, 'index.js'),
  ],

  devServer: {
    proxy: {
      '*': 'http://localhost:8000',
    },
    contentBase: PATHS.dist,
    publicPath: '/',
    hot: true,
    historyApiFallback: true,
    progress: true,
    stats: 'errors-only',
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
        test: /\.css$|\.scss$|\.sass$/,
        loaders: ['style', 'css', 'sass'],
        include: PATHS.src,
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
}

export default development
