const express = require('express')
const router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('./index')
})

router.use('/v03', require('./v03/routes/routes'))
router.use('/v04', require('./v04/routes/routes'))
router.use('/v04.2', require('./v04.2/routes/routes'))
router.use('/v05', require('./v05/routes/routes'))
router.use('/v06', require('./v06/routes/routes'))
router.use('/v07', require('./v07/routes/routes'))
router.use('/v08', require('./v08/routes/routes'))
router.use('/v09', require('./v09/routes/routes'))
router.use('/v10', require('./v10/routes/routes'))
router.use('/v11', require('./v11/routes/routes'))
router.use('/v12', require('./v12/routes/routes'))
router.use('/v12.1', require('./v12.1/routes/routes'))
router.use('/v13', require('./v13/routes/routes'))
router.use('/v14', require('./v14/routes/routes'))


module.exports = router
