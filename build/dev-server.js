'use strict'
process.env.NODE_ENV = 'development'

const config = require('../config')
const express = require('express')
const webpack = require('webpack')
const proxyMiddleware = require('http-proxy-middleware')
const webpackConfig = require('./webpack.dev.conf')

const port = process.env.PORT || config().port
const proxyTable = config().proxyTable

const app = express()
const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, { quiet: true })
const hotMiddleware = require('webpack-hot-middleware')(compiler, { log: () => {} })

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  let options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }

  app.use(proxyMiddleware(context, options))
})

app.use(devMiddleware)
app.use(hotMiddleware)

devMiddleware.waitUntilValid(function () {
  console.log(`> Listening at http://localhost:${port}` + '\n')
})

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    process.exit()
  }
})
