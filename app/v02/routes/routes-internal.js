const express = require('express')
const router = express.Router()
const data = require('../views/internal/registrationsData.json')
const path = require('path')

const projectDirectory = path.dirname(require.main.filename) // Used for adding & removing the uploads

// Set the views with a relative path (haven't yet found a better way of doing this yet)
const viewsFolder = __dirname + '/../views/'

function logger (req) {
  return 'DEBUG.routes ' + req.method + ' ' + req.route.path
}

/**
 * REGISTRATIONS
 */
router.get('/registrations', function (req, res) {
  console.log(logger(req))

  console.log(viewsFolder + 'internal/registrations')

  res.render(viewsFolder + 'internal/registrations', data)
})

/**
 * ITEM-DETAIL
 */
router.get('/item-detail/:regId', function (req, res) {
  console.log(logger(req))
  let regId = req.params.regId
  console.log(regId)

  // Get the chosen registration from the JSON registrations array
  let registration = data.registrations.find(item => {
    return item.reg_id === regId
  })

  res.render(viewsFolder + 'internal/item-detail', {
    registration: registration
  })
})

/// ///////////////////////////////////////////////////////////////////////////
// ACCESS UPLOADED IMAGES
router.get('/routeToImage', (req, res) => {
  // Takes a query parameter, e.g. http://localhost:3000/routeToImage?imageName=1548686882219.png
  var imageName = req.query.imageName
  logger(req, 'imageName = ' + imageName)
  var imagePath = path.join(projectDirectory, '/app/uploads/', imageName)
  logger(req, 'imagePath = ' + imagePath)
  res.sendFile(imagePath)
})

router.get('/routeToUploadedImage/:imageId', (req, res) => {
  console.log('DEBUG.routes ' + req.route.path + ', imageId=' + req.params.imageId)
  res.sendFile(path.join(projectDirectory, '/app/uploads/' + req.params.imageId + '.png'))
})

// END OF ROUTES

module.exports = router
