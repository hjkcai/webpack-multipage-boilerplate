'use strict'

const path = require('path')

module.exports = {
  env: { NODE_ENV: '"production"' },
  output: path.resolve(__dirname, '../dist'),
  assetsSubDirectory: 'static',
  assetsPublicPath: '/'
}
