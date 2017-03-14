'use strict'

const merge = require('webpack-merge')
const config = require('../config')
const webpack = require('webpack')
const FriendlyErrors = require('friendly-errors-webpack-plugin')

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
