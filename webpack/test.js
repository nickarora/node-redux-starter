import PATHS from './paths'

const test = {
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
  module: {
    loaders: [
      {
        test: /\.css$|\.scss$|\.sass$/,
        loader: 'null',
        include: PATHS.src,
      },
    ],
  },
}

export default test
