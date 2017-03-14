'use strict'

const path = require('path')
const chokidar = require('chokidar')
const childProcess = require('child_process')

let devServer
let restarting = false

function fileChangedHandler () {
  // prevent too many restarts in a short time
  if (restarting) return
  restarting = true

  new Promise(resolve => {
    // stop the original server
    if (devServer) {
      console.log('Pages/scripts added/removed. Restarting dev-server...')
      devServer.on('exit', resolve)
      devServer.kill()
    } else resolve()
  }).then(() => {
    // start server using child_process
    devServer = childProcess.fork(path.join(__dirname, 'dev-server.js'))
    devServer.on('message', message => {
      if (message === 'webpack-compilation-complete') {
        restarting = false
      }
    })
  })
}

const watcher = chokidar.watch([
  path.join(__dirname, '../src/views/**/*'),
  path.join(__dirname, '../src/scripts/**/*')
])

watcher.on('add', fileChangedHandler).on('unlink', fileChangedHandler)
fileChangedHandler()
