const express = require('express')
const router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('./index')
})

router.use('/v01', require('./v01/routes/routes'))
router.use('/v02', require('./v02/routes/routes'))

module.exports = router
