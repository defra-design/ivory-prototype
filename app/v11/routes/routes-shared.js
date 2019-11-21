const express = require('express')
const router = express.Router()
const path = require('path')
const projectDirectory = path.dirname(require.main.filename) // Used when a full path is required, i.e. /Users/dave/Documents/NODE/projects/DEFRA/ivory-prototype
const version = __dirname.match(/app\/(.*?)\/routes/)[1] // Gets the version, e.g. v10

/**
 * PHOTOS
 * E.g. http://localhost:3000/vXX/photos/1548686882219.png
 */
router.get('/photos/:filename', (req, res) => {
  const imagePath = path.join(projectDirectory, 'app/', version, '/photos/', req.params.filename)
  res.sendFile(imagePath)
})

module.exports = router
