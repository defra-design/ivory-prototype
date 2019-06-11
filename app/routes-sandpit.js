const express = require('express')
const router = express.Router()

const multer = require('multer')
const path = require('path')
const fs = require('fs')

/// ///////////////////////////////////////////////////////////////////////////
// LOGGER
function logger (req, msg) {
  if (!msg) { msg = '' }
  // if (!req) { req = '' }
  console.log('DEBUG.routes ' + req.method + req.route.path + ': ' + msg)
}

// ENTER ROUTES HERE...

/// ///////////////////////////////////////////////////////////////////////////
// UPLOAD IMAGE
router.get('/sandpit/upload-image', function (req, res) {
  console.log(logger(req))
  res.render('sandpit/upload-image')
})

const upload = multer({
  dest: 'app/uploads/temp', // temp location for the file to be placed
  limits: {
    fileSize: 1 * 1024 * 1024 // 8 MB (max file size in bytes)
  }
}).single('fileToUpload') /* name attribute of <file> element in your form */

// router.post('/sandpit/upload-image', upload, function(req, res) {
router.post('/sandpit/upload-image', function (req, res) {
  logger(req, 'hi there')
  // console.log(logger(req));

  // Upload the chosen file to the multer 'dest'
  upload(req, res, function (err) {
    console.log(logger(req), 'File uploaded to temp location')
    // req.file is the `fileToUpload` file
    // req.body will hold the text fields, if there were any

    // This error handling is a bit rough...
    if (err) {
      logger(req, 'Multer threw an error = ' + err)
    }

    // Check a file was uploaded
    if (!req.file) {
      console.log(logger(req) + 'No file uploaded')
      res.render('sandpit/upload-image', {
        errorNoFile: 'Please choose a file to upload'
      })
    } else { // A file was uploaded, so continue
      const tempPath = req.file.path // req.file is the form input file from type="file" name="fileUpload"
      const targetPath = path.join(__dirname, './uploads/image.png')
      console.log(logger(req) + 'tempPath=' + tempPath)
      console.log(logger(req) + 'tempPath=' + targetPath)

      // Check the file type
      var type = path.extname(req.file.originalname).toLowerCase()
      console.log('File type = ' + type)

      if (type !== '.png' && type !== '.jpg') {
        console.log(logger(req) + 'Wrong file type')

        fs.unlink(tempPath, err => {
          if (err) console.log(err)
        })

        res.render('sandpit/upload-image', {
          errorNoFile: 'That file type is not accepted'
        })

        // Correct file type, so continue
      } else {
        // If it passes all validation, move/rename it to the persistent location
        fs.rename(tempPath, targetPath, function (err) {
          if (err) {
            console.log(logger(req) + 'err = ' + err)
          } else {
            console.log(logger(req) + 'File successfully uploaded')
            res.redirect('upload-image2')
          }
        })
      }
    }
  })
})

router.get('/sandpit/upload-image2', function (req, res) {
  console.log(logger(req))
  res.render('sandpit/upload-image2')
})

/// ///////////////////////////////////////////////////////////////////////////
// TEST
router.get('/sandpit/test', function (req, res) {
  logger(req, 'Test message')

  var imageName = new Date().getTime().toString() + '.png' // getTime() gives the milliseconds since 1970...
  const targetPath = path.join(__dirname, './uploads/', imageName)
  logger(req, 'targetPath=' + targetPath)

  //
  // var randomNumber = Math.floor(Math.random() * 1000000001);
  // logger(req, 'randomNumber = '+randomNumber)

  res.render('sandpit/test', {
    'message': 'This is a test message'
  })
})

/// ///////////////////////////////////////////////////////////////////////////
// END OF ROUTES

module.exports = router
