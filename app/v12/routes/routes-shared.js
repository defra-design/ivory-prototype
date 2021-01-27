const express = require('express')
const router = express.Router()
const path = require('path')
const rootAppDirectory = require('../../config').rootAppDirectory // Used when a full path is required, e.g. '/Users/dave/Documents/NODE/projects/DEFRA/ivory-prototype/app' or '/app/app' on Heroku
let versionRegex = process.platform === 'win32' ? /app\\(.[^\\]*?)\\routes/ : /app\/(.[^\/]*?)\/routes/
const version = __dirname.match(versionRegex)[1]// Gets the version, e.g. v10 (ensure this handles Heroku's __direname being /app/app/vXX/routes)

/**
 * PHOTOS
 * E.g. http://localhost:3000/vXX/photos/1548686882219.png
 */
router.get('/photos/:filename', (req, res) => {
  const imagePath = path.join(rootAppDirectory, version, '/photos/', req.params.filename)
  res.sendFile(imagePath)
})

module.exports = router
