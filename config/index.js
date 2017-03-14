'use strict'

const devConfig = require('./dev.conf')
const prodConfig = require('./prod.conf')

module.exports = function config (env = process.env.NODE_ENV || 'development') {
  if (env === 'production') {
    return prodConfig
  } else {
    return devConfig
  }
}
