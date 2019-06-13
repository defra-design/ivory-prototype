const express = require('express')
const router = express.Router()
const data = require('../views/internal/registrationsData.json')

// Set the views with a relative path (haven't yet found a better way of doing this yet)
const viewsFolder = __dirname + '/../views/'

function logger (req) {
  return 'DEBUG.routes ' + req.method + ' ' + req.route.path
}

/**
 * REGISTRATIONS
 */
router.get('/internal/registrations', function (req, res) {
  console.log(logger(req))

  console.log(viewsFolder + 'internal/registrations')

  res.render(viewsFolder + 'internal/registrations', data)
})

/**
 * ITEM-DETAIL
 */
router.get('/internal/item-detail/:regId', function (req, res) {
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

// END OF ROUTES

module.exports = router
