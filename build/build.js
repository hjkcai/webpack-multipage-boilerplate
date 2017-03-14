'use strict'
process.env.NODE_ENV = 'production'

const webpack = require('webpack')

webpack(require('./webpack.prod.conf'), (err, stats) => {
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})
