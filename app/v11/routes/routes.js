const express = require('express')
const router = express.Router()
const path = require('path')
const viewsFolder = path.join(__dirname, '/../views/') // Set the views with a relative path (haven't yet found a better way of doing this yet)
let versionRegex = process.platform === 'win32' ? /app\\(.[^\\]*?)\\routes/ : /app\/(.[^\/]*?)\/routes/
const version = __dirname.match(versionRegex)[1]// Gets the version, e.g. v10 (ensure this handles Heroku's __direname being /app/app/vXX/routes)

// Set the version and baseUrl.  We can use the {{baseURL}} to use absolute paths, rather than the confusing relative paths.
// This is picked up by all routes and then available in the template using {{ version }} or {{ baseURL }} etc.
router.use(function (req, res, next) {
  res.locals.version = version
  res.locals.baseUrl = `/${version}`
  next()
})

// Route index page
router.get('/', function (req, res) {
  res.render(viewsFolder + 'index')
})

router.use('/public', require('./routes-public.js'))
router.use('/apha', require('./routes-apha.js'))
router.use('/experiments', require('./routes-experiments.js'))
router.use('/', require('./routes-shared.js'))

module.exports = router
