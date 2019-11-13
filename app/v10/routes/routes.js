const express = require('express')
const router = express.Router()
const path = require('path')
const viewsFolder = path.join(__dirname, '/../views/') // Set the views with a relative path (haven't yet found a better way of doing this yet)

// Route index page
router.get('/', function (req, res) {
  res.render(viewsFolder + 'index')
})

router.use('/public', require('./routes-public.js'))
router.use('/apha', require('./routes-apha.js'))
router.use('/experiments', require('./routes-experiments.js'))
router.use('/', require('./routes-shared.js'))

module.exports = router
