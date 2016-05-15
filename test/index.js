// Test environment setup
import React from 'react'
import chaiEnzyme from 'chai-enzyme'

chai.use(chaiEnzyme())

global.React = React

// for use with karma-webpack-with-fast-source-maps
const karmaWebpackManifest = []
const inManifest = (path) => karmaWebpackManifest.indexOf(path) >= 0

// require tests/**/*.test.js
const testsContext = require.context('./', true, /\.test\.js$/)

// only run tests that have changed after the first pass.
let runnable = testsContext.keys().filter(inManifest)
if (!runnable.length) {
  runnable = testsContext.keys()
}

runnable.forEach(testsContext)
