const express = require('express')
const router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('./index')
})

router.use('/v03', require('./v03/routes/routes'))
router.use('/v04', require('./v04/routes/routes'))
router.use('/v05', require('./v05/routes/routes'))

module.exports = router
