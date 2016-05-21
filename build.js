const fs = require('fs')
const fsExtra = require('fs-extra')
const rmRf = require('rimraf')

const Streams = require('mississippi')
const bind = require('ap').partial
const async = require('./async')

const Browserify = require('browserify')
const watchify = require('watchify')
const sassStream = require('sass-css-stream')




start(function(err){
  if (err) throw err
  console.log('end')
})


function start(cb){
  async.series({
    clean,
    build,
  }, cb)
}

function clean(cb){
  fsExtra.remove('./dist/', cb)
}

function build(cb){
  async.parallel({
    buildJs,
    buildCss,
    buildStatic,
  }, cb)
}

function buildJs(cb) {
  var browserify = Browserify({
    entries: ['./src/js/index.js'],
    cache: {},
    packageCache: {},
    plugin: [watchify],
  })

  browserify.on('update', bundle)

  async.series({
    buildJsPrep: bind(fsExtra.mkdirs, './dist/js'),
    buildJsStart: start,
  }, cb)

  function start(cb){
    var firstBundle = bundle()
    Streams.finished(firstBundle, cb)
  }

  function bundle() {
    console.log('bundle')
    return Streams.pipeline(
      browserify.bundle(),
      fs.createWriteStream('./dist/js/bundle.js')
    )
  }
}

function buildCss(cb) {
  
  async.series({
    buildCssPrep: bind(fsExtra.mkdirs, './dist/css'),
    buildCssStart: start,
  }, cb)

  function start(cb) {
    var pipeline = Streams.pipeline(
      fs.createReadStream( './src/css/index.scss' ),
      sassStream( './src/css/index.scss' ),
      fs.createWriteStream( './dist/css/bundle.css' )
    )
    Streams.finished(pipeline, cb)
  }
}

function buildStatic(cb) {

  async.parallel({
    imgs: bind(fsExtra.copy, './src/img/', './dist/img/'),
    fonts: bind(fsExtra.copy, './src/fonts/', './dist/fonts/'),
    html: bind(fsExtra.copy, './src/index.html', './dist/index.html'),
  }, cb)

}
