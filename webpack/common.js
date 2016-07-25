import autoprefixer from 'autoprefixer'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import PATHS from './paths'
import path from 'path'

const common = {
  devtool: 'cheap-module-source-map',

  resolve: {
    root: [
      PATHS.src,
      PATHS.node_modules,
    ],
    extensions: ['', '.js', '.json', '.css', '.scss', '.sass'],
  },

  module: {
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
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=public/fonts/[name].[ext]',
      },
    ],
  },

  postcss: () => [
    autoprefixer,
  ],

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Node Redux Starter',
      template: path.join(PATHS.src, 'index.html'),
    }),
  ],
}

export default common
