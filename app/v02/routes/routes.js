const express = require('express')
const router = express.Router()

// Set the views with a relative path (haven't yet found a better way of doing this yet)
const viewsFolder = __dirname + '/../views/'

// Route index page
router.get('/', function (req, res) {
  res.render(viewsFolder + 'index')
})

router.use('/external', require('./routes-external.js'))
router.use('/internal', require('./routes-internal.js'))
router.use('/sandpit', require('./routes-sandpit.js'))

module.exports = router
