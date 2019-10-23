const express = require('express')
const router = express.Router()

// Set the views with a relative path (haven't yet found a better way of doing this yet)
const viewsFolder = __dirname + '/../views/'

// Route index page
router.get('/', function (req, res) {
  res.render(viewsFolder + 'index')
})

router.use('/public', require('./routes-public.js'))
router.use('/apha', require('./routes-apha.js'))
router.use('/experiments', require('./routes-experiments.js'))

module.exports = router
