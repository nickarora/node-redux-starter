import path from 'path'
import webpack from 'webpack'
import PATHS from './paths'

const production = {
  entry: [
    path.join(PATHS.src, 'index.js'),
  ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
}

export default production
