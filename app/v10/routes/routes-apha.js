const express = require('express')
const router = express.Router()
const registrationsData = require('../views/apha/registrationsData.json')
const path = require('path')
const viewsFolder = path.join(__dirname, '/../views/apha/') // Set the views with a relative path (haven't found a better way of doing this yet)

/**
 * REGISTRATIONS
 */
router.get('/registrations', function (req, res) {
  res.render(viewsFolder + 'registrations', registrationsData)
})

/**
 * ITEM-DETAIL
 */
router.get('/item-detail/:regId', function (req, res) {
  // Get the chosen registration from the JSON registrations array data
  let registration = registrationsData.registrations.find(item => {
    return item.reg_id === req.params.regId
  })
  res.render(viewsFolder + 'item-detail', {
    registration: registration
  })
})

// END OF ROUTES

module.exports = router
