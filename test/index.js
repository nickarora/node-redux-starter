/*
 * Test Environment Setup
 */
import 'babel-polyfill'
import chaiAsPromised from 'chai-as-promised'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'

chai.use(chaiAsPromised)
chai.use(chaiEnzyme())

global.React = React

/*
 * Require Tests
 */

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
