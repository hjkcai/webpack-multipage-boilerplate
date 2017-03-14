'use strict'

const merge = require('webpack-merge')
const config = require('../config')
const webpack = require('webpack')
const webpackConfig = require('./webpack.base.conf')
const FriendlyErrors = require('friendly-errors-webpack-plugin')

Object.keys(webpackConfig.entry).forEach(key => {
  webpackConfig.entry[key] = ['webpack-hot-middleware/client?reload=true', webpackConfig.entry[key]]
})

module.exports = merge(require('./webpack.base.conf'), {
  output: {
    filename: '[name].js'
  },
  devtool: config().devtool,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrors()
  ]
})
