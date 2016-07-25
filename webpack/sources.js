import PATHS from './paths'

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

export default sources
