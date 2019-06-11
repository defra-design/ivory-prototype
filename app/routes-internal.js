const express = require('express')
const router = express.Router()
const registrationsData = require('./views/internal/registrationsData.json')

function logger (req) {
  return 'DEBUG.routes ' + req.method + ' ' + req.route.path
}

/**
 * REGISTRATIONS
 */
router.get('/internal/registrations', function (req, res) {
  console.log(logger(req))

  res.render('internal/registrations', registrationsData)
})

/**
 * ITEM-DETAIL
 */
router.get('/internal/item-detail/:regId', function (req, res) {
  console.log(logger(req))
  let regId = req.params.regId
  console.log(regId)

  // Get the chosen registration from the JSON registrations array
  let registration = registrationsData.registrations.find(item => {
    return item.reg_id === regId
  })

  res.render('internal/item-detail', {
    registration: registration
  })
})

// END OF ROUTES

module.exports = router
