'use strict'

const fs = require('fs')
const glob = require('glob')
const path = require('path')
const merge = require('webpack-merge')
const config = require('../config')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const projectRoot = path.resolve(__dirname, '../')
const src = path.join(projectRoot, 'src')

// Read all .js files inside 'scripts' folder as entries
const chunks = glob.sync(path.join(src, 'scripts', '**/*.js')).map(filename => {
  // remove extention for further use
  return path.relative(path.join(src, 'scripts'), filename).replace(/\.js$/, '')
})

const entries = chunks.reduce((entries, chunk) => {
  entries[chunk] = path.join(src, 'scripts', `${chunk}.js`)
  return entries
}, {})

if (Object.keys(entries).length === 0) {
  throw new Error('Please add at lease one js files in src/scripts')
}

// Read all .html and .pug as views
const views = glob.sync(path.join(src, 'views', '**/*.@(html|pug)')).map(filename => {
  // remove extention for further use
  return {
    filename,
    name: path.relative(path.join(src, 'views'), filename).replace(/\.(html|pug)$/, '')
  }
})

// Read all folders inside 'src' folder as alias
const alias = fs.readdirSync(src).reduce((dirs, filename) => {
  if (fs.statSync(path.join(src, filename)).isDirectory()) {
    dirs[filename] = path.join(src, filename)
  }

  return dirs
}, { src })

module.exports = merge({
  entry: entries,
  output: {
    path: config().output,
    publicPath: config().assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.ts', '.json'],
    modules: [
      path.join(__dirname, '../node_modules')
    ],
    alias
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
          'eslint-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        use: [
          'html-loader'
        ]
      },
      {
        test: /\.pug$/,
        use: [
          'html-loader',
          'pug-html-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join(config().assetsSubDirectory || '', 'img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join(config().assetsSubDirectory || '', 'fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config().env
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    }),

    ...views.map(entry => new HtmlWebpackPlugin({
      filename: `${entry.name}.html`,
      template: entry.filename,
      chunks: [entry.name],
      includeDependent: true,
      chunksSortMode: 'dependency',
      inject: true
    }))
  ],
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false
  }
})
