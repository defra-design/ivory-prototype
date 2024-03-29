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
router.use('/v15', require('./v15/routes/routes'))
router.use('/v16', require('./v16/routes/routes'))
router.use('/v17', require('./v17/routes/routes'))
router.use('/v18', require('./v18/routes/routes'))
router.use('/v19', require('./v19/routes/routes'))
router.use('/v20', require('./v20/routes/routes'))
router.use('/v21', require('./v21/routes/routes'))
router.use('/v22', require('./v22/routes/routes'))
router.use('/v23', require('./v23/routes/routes'))
router.use('/v24', require('./v24/routes/routes'))
router.use('/v25', require('./v25/routes/routes'))
router.use('/v26', require('./v26/routes/routes'))














module.exports = router
