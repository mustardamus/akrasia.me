'use strict'

const fs = require('fs-extra')
const async = require('async')
const globby = require('globby')
const lwip = require('lwip')

const pattern = __dirname + '/../pictures/**/*.JPG'
const paths = globby.sync([pattern])
const outPath = __dirname + '/../public/pictures'

const crop = function (fileIn, fileOut, cb) {
  if (fs.existsSync(fileOut)) {
    return cb({ msg: 'Skip. Exists.', path: fileOut })
  }

  let dir = fileOut.split('/')
  dir.pop()
  fs.ensureDirSync(dir.join('/'))

  lwip.open(fileIn, function(err, image) {
    if (err) {
      console.log('ERROR open picture', err)
      cb(err)
    }

    /*image
      .batch()
      .crop(200, 200)
      .writeFile(fileOut, function(err) {
        if (err) {
          console.log('ERROR generating thumbnail', err)
          cb(err)
        } else {
          cb(null)
        }
      })
      */

    let width = 220
    let height  = image.height() * width / image.width() + 1

    image
      .batch()
      .resize(width, height)
      .writeFile(fileOut, function(err) {
        if (err) {
          console.log('ERROR generating thumbnail', err)
          cb(err)
        } else {
          cb(null)
        }
      })
  })
}

const resize = function (fileIn, fileOut, cb) {
  if (fs.existsSync(fileOut)) {
    return cb({ msg: 'Skip. Exists.', path: fileOut })
  }

  let dir = fileOut.split('/')
  dir.pop()
  fs.ensureDirSync(dir.join('/'))

  lwip.open(fileIn, function(err, image) {
    if (err) {
      console.log('ERROR open picture', err)
      cb(err)
    }

    let width = 1000
    let height  = image.height() * width / image.width() + 1

    image
      .batch()
      .resize(width, height, 'grid')
      .writeFile(fileOut, function(err) {
        if (err) {
          console.log('ERROR generating thumbnail', err)
          cb(err)
        } else {
          cb(null)
        }
      })
  })
}


async.eachSeries(paths, (path, done) => {
  let pathArr = path.split('/')
  let filename = pathArr.pop()
  let city = pathArr.pop()
  let country = pathArr.pop()
  let ext = filename.split('.').pop()
  let nameonly = filename.replace('.' + ext, '')
  let outname = outPath + '/' + country + '/' + city + '/' + nameonly
  let thumbpath = outname + '_thumb.' + ext
  let outpath = outname + '.' + ext

  crop(path, thumbpath, (err) => {
    if (err) {
      //console.log(err)
    } else {
      console.log(country, city, filename, 'Thumbnail Done.')
    }

    resize(path, outpath, (err) => {
      if (err) {
        //console.log(err)
      } else {
        console.log(country, city, filename, 'Resize Done.')
      }

      done(null, outname)
    })
  })
}, (err) => {
  console.log('All done.');
})
