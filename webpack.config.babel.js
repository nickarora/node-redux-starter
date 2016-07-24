import webpack from 'webpack'
import path from 'path'
import merge from 'webpack-merge'
import autoprefixer from 'autoprefixer'

const TARGET = process.env.NODE_ENV
process.env.BABEL_ENV = TARGET

const PATHS = {
  dist: path.join(__dirname, 'dist'),
  node_modules: path.join(__dirname, 'node_modules'),
  src: path.join(__dirname, 'client'),
  test: path.join(__dirname, 'test'),
}

const sources = {
  entry: [
    'babel-polyfill',
  ],
  output: {
    path: PATHS.dist,
    filename: 'app.js',
    publicPath: '/',
  },
}

const common = {
  resolve: {
    root: [
      PATHS.src,
      PATHS.node_modules,
    ],
    extensions: ['', '.js', '.jsx', '.json', '.scss', '.sass'],
  },
  module: {
    preLoaders: [
      {
        test: /\.scss$|\.sass$/,
        loaders: ['postcss'],
        include: PATHS.src,
      },
      {
        test: /\.jsx?$/,
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
        test: /\.jsx?$/,
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

const development = {
  devtool: 'cheap-module-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    path.join(PATHS.src, 'index.jsx'),
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
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
}

const production = {
  entry: [
    path.join(PATHS.src, 'index.jsx'),
  ],
}

const test = {
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
}

const selectConfig = (target) => {
  switch (target) {
    case 'production':
      return merge.smart(sources, common, production)
    case 'test':
      return merge.smart(common, test)
    case 'development':
    default:
      return merge.smart(sources, common, development)
  }
}

export default selectConfig(TARGET)
