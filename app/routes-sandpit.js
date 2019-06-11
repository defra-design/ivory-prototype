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
