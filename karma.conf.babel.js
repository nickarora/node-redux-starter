import webpackConfig from './webpack.config.babel'

const karmaConfig = (config) =>
  config.set({
    browsers: ['PhantomJS'],

    frameworks: ['mocha', 'sinon-chai'],

    files: [
      'test/index.js',
    ],

    preprocessors: {
      'test/**/*.js': ['webpack'],
    },

    reporters: ['mocha'],

    port: 9876,

    autoWatch: false,

    singleRun: true,

    colors: true,

    logLevel: config.LOG_INFO,

    webpack: webpackConfig,

    webpackServer: {
      noInfo: true,
    },
  })

export default karmaConfig
