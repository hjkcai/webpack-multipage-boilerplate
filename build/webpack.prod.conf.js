'use strict'

const merge = require('webpack-merge')
const config = require('../config')
const webpack = require('webpack')

module.exports = merge(require('./webpack.base.conf'), {
  output: {
    filename: config().assetsSubDirectory + '/js/[name].[chunkhash].js'
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
})
