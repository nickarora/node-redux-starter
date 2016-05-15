import webpackConfig from './webpack.config.babel'

const karmaConfig = (config) =>
  config.set({
    browsers: ['PhantomJS'],
    singleRun: true,
    frameworks: ['mocha', 'sinon', 'chai'],
    files: [
      'test/index.js',
    ],
    preprocessors: {
      'test/index.js': ['webpack'],
    },
    reporters: ['mocha'],
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true, // no webpack output
    },
  })

export default karmaConfig
