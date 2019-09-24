const express = require('express')
const router = express.Router()

const path = require('path')
const multer = require('multer')
const fs = require('fs')
const projectDirectory = path.dirname(require.main.filename) // Used for adding & removing the uploads

// Set the views with a relative path (haven't yet found a better way of doing this yet)
const viewsFolder = __dirname + '/../views/public/'

const exemptionTypeText1 = 'Item with less than 10% ivory made before 1947'
const exemptionTypeText2 = 'Musical instrument with less than 20% ivory and made before 1975'
const exemptionTypeText3 = 'Portrait miniature made before 1918'
const exemptionTypeText4 = 'Item to be acquired by an accredited museum'
const exemptionTypeText5 = 'An item of outstandingly high artistic, cultural or historical value made before 1918'



/// ///////////////////////////////////////////////////////////////////////////
// LOGGER (not great, but may help)
function logger (req, msg) {
  if (!msg) {
    msg = ''
  }
  console.log('DEBUG.routes ' + req.method + req.route.path + ': ' + msg)
}







/// ////////////////////////////////////////////
// WELCOME
router.get('/index-welcome', function (req, res) {
  res.render(viewsFolder + 'index-welcome')
})



/// ////////////////////////////////////////////
// Gumtree sell
router.get('/gumtree-sell', function (req, res) {
  res.render(viewsFolder + 'gumtree-sell')
})



/// ////////////////////////////////////////////
// Gumtree buy
router.get('/gumtree-buy', function (req, res) {
  res.render(viewsFolder + 'gumtree-buy')
})




/// ////////////////////////////////////////////
// DETAILED GUIDANCE
router.get('/guidance', function (req, res) {
  res.render(viewsFolder + 'a-guide-to-selling-hiring-and-buying-items-containing-ivory')
})




/// ////////////////////////////////////////////
// SELLING, HIRING, BUYING IVORY
router.get('/a-guide-to-selling-hiring-and-buying-items-containing-ivory', function (req, res) {
  res.render(viewsFolder + 'a-guide-to-selling-hiring-and-buying-items-containing-ivory')
})

router.get('/apply-to-sell-or-hire-an-ivory-item', function (req, res) {
  res.render(viewsFolder + 'apply-to-sell-or-hire-an-ivory-item')
})





/// ////////////////////////////////////////////



// Is it a musical instrument?

router.get('/is-it-a-musical-instrument', function (req, res) {
  res.render(viewsFolder + 'is-it-a-musical-instrument', {
  backUrl: 'apply-to-sell-or-hire-an-ivory-item'
  })
})


router.post('/is-it-a-musical-instrument', function (req, res) {
  logger(req)

  if (req.session.data['musical-instrument'] === 'Yes') {
    logger(req, "It's a musical instrument.")
    res.redirect('was-it-made-before-1975')
  } else {
    logger(req, "It's NOT a musical instrument.")
    res.redirect('is-it-a-portrait-miniature-made-before-1918')
  }
})












// Was it made before 1975?

router.get('/was-it-made-before-1975', function (req, res) {
  res.render(viewsFolder + 'was-it-made-before-1975', {
  backUrl: 'is-it-a-musical-instrument'
  })
})

router.post('/was-it-made-before-1975', function (req, res) {
  logger(req, 'pre-1975=' + req.session.data['pre-1975'])

  if (req.session.data['pre-1975'] === 'Yes') {
    res.redirect('does-it-have-less-than-20-percent-ivory')
  } else if (req.session.data['pre-1975'] === 'No') {
    res.redirect('based-on-your-answers?o=4')
  } else if (req.session.data['pre-1975'] === 'Not sure') {
    res.redirect('does-it-have-less-than-20-percent-ivory')
  }

})












// Does it have less than 20% ivory?

router.get('/does-it-have-less-than-20-percent-ivory', function (req, res) {
  res.render(viewsFolder + 'does-it-have-less-than-20-percent-ivory', {
  backUrl: 'was-it-made-before-1975'
  })
})

router.post('/does-it-have-less-than-20-percent-ivory', function (req, res) {
  logger(req)


  if (req.session.data['less-than-20-percent-ivory'] === 'No') {
    logger(req, "It has more than 20% ivory")
    res.redirect('based-on-your-answers?o=2')
  }


  if (req.session.data['pre-1975'] === 'Yes'){
    if (req.session.data['less-than-20-percent-ivory'] === 'Yes') {
      logger(req, "It has less than 20% ivory")
      res.redirect('based-on-your-answers?o=1')
    } else if (req.session.data['less-than-20-percent-ivory'] === 'Not sure') {
      logger(req, "Not sure if less than 20% ivory")
      res.redirect('based-on-your-answers?o=3')
    }
  } else if (req.session.data['pre-1975'] === 'Not sure'){
    if (req.session.data['less-than-20-percent-ivory'] === 'Yes') {
      logger(req, "It has less than 20% ivory")
      res.redirect('based-on-your-answers?o=5')
    } else if (req.session.data['less-than-20-percent-ivory'] === 'Not sure') {
      logger(req, "Not sure if less than 20% ivory")
      res.redirect('based-on-your-answers?o=7')
    }
  }


})








// Is it a portrait miniature made before 1918?

router.get('/is-it-a-portrait-miniature-made-before-1918', function (req, res) {
  res.render(viewsFolder + 'is-it-a-portrait-miniature-made-before-1918', {
  backUrl: 'is-it-a-musical-instrument'
  })
})


router.post('/is-it-a-portrait-miniature-made-before-1918', function (req, res) {
  logger(req)

  if (req.session.data['portrait-miniature'] === 'Yes') {
    logger(req, "It's a portrait miniature made before 1918.")
    res.redirect('is-its-surface-area-less-than-320-cm-squared')
  } else {
    logger(req, "It's NOT a portrait miniature.")
    res.redirect('was-it-made-before-1947')
  }
})




// Is its surface area less than 320cm squared?

router.get('/is-its-surface-area-less-than-320-cm-squared', function (req, res) {
  res.render(viewsFolder + 'is-its-surface-area-less-than-320-cm-squared', {
  backUrl: 'is-it-a-portrait-miniature-made-before-1918'
  })
})

router.post('/is-its-surface-area-less-than-320-cm-squared', function (req, res) {
  logger(req)

  if (req.session.data['less-than-320-cm-squared'] === 'Yes') {
    logger(req, "Surface area LESS THAN 320cm squared")
    res.redirect('based-on-your-answers?o=8')
  } else if (req.session.data['less-than-320-cm-squared'] === 'No') {
    logger(req, "Surface area MORE THAN 320cm squared")
    res.redirect('based-on-your-answers?o=9')
  } else if (req.session.data['less-than-320-cm-squared'] === 'Not sure') {
    logger(req, "Not sure about surface area")
    res.redirect('based-on-your-answers?o=10')
  }

})









// Was it made before 1947?

router.get('/was-it-made-before-1947', function (req, res) {
  res.render(viewsFolder + 'was-it-made-before-1947', {
  backUrl: 'is-it-a-portrait-miniature-made-before-1918'
  })
})




router.post('/was-it-made-before-1947', function (req, res) {
  logger(req, 'pre-1947=' + req.session.data['pre-1947'])

  if (req.session.data['pre-1947'] === 'Yes') {
    res.redirect('does-it-have-less-than-10-percent-ivory')
  } else if (req.session.data['pre-1947'] === 'No') {
    res.redirect('based-on-your-answers?o=14')
  } else if (req.session.data['pre-1947'] === 'Not sure') {
    res.redirect('does-it-have-less-than-10-percent-ivory')
  }

})







// Does it have less than 10% ivory?

router.get('/does-it-have-less-than-10-percent-ivory', function (req, res) {
  res.render(viewsFolder + 'does-it-have-less-than-10-percent-ivory', {
  backUrl: 'was-it-made-before-1947'
  })
})

router.post('/does-it-have-less-than-10-percent-ivory', function (req, res) {
  logger(req)

  if (req.session.data['pre-1947'] === 'Yes'){
    if (req.session.data['less-than-10-percent-ivory'] === 'Yes') {
      logger(req, "It has less than 10% ivory")
      res.redirect('based-on-your-answers?o=11')
    } else if (req.session.data['less-than-10-percent-ivory'] === 'No') {
      logger(req, "More than 10% ivory")
      res.redirect('based-on-your-answers?o=12')
    } else if (req.session.data['less-than-10-percent-ivory'] === 'Not sure') {
      logger(req, "Not sure if less than 10% ivory")
      res.redirect('based-on-your-answers?o=13')
    }
  } else if (req.session.data['pre-1947'] === 'Not sure'){
    if (req.session.data['less-than-10-percent-ivory'] === 'Yes') {
      logger(req, "It has less than 10% ivory")
      res.redirect('based-on-your-answers?o=15')
    } else if (req.session.data['less-than-10-percent-ivory'] === 'No') {
      logger(req, "More than 10% ivory")
      res.redirect('based-on-your-answers?o=16')
    } else if (req.session.data['less-than-10-percent-ivory'] === 'Not sure') {
      logger(req, "Not sure if less than 20% ivory")
      res.redirect('based-on-your-answers?o=17')
    }
  }


})












// Checker outcome page

router.get('/based-on-your-answers', function (req, res) {

  var outcome = req.query.o

  var checker = outcome

  var backUrl

  if ( checker === '1' ){
    backUrl = 'does-it-have-less-than-20-percent-ivory'
  } else if ( checker === '2' ){
    backUrl = 'does-it-have-less-than-20-percent-ivory'
  } else if ( checker === '3' ){
    backUrl = 'does-it-have-less-than-20-percent-ivory'
  } else if ( checker === '5' ){
    backUrl = 'does-it-have-less-than-20-percent-ivory'
  } else if ( checker === '6' ){
    backUrl = 'does-it-have-less-than-20-percent-ivory'
  } else if ( checker === '7' ){
    backUrl = 'does-it-have-less-than-20-percent-ivory'
  } else if ( checker === '4' ){
    backUrl = 'was-it-made-before-1975'
  } else if ( checker === '8' ){
    backUrl = 'is-its-surface-area-less-than-320-cm-squared'
  } else if ( checker === '11' ){
    backUrl = 'does-it-have-less-than-10-percent-ivory'
  }



  res.render(viewsFolder + 'based-on-your-answers', {
    checker: checker,
    backUrl: backUrl
  })


})


router.post('/based-on-your-answers', function (req, res) {
  var outcome = req.query.o

  if ( outcome == '1' ){
  logger(req, 'Checker: musical instrument, meets both criteria')
  res.redirect('choose-exemption')
  }

})











/// ////////////////////////////////////////////
// BUYING IVORY
router.get('/check-before-you-buy-an-ivory-item', function (req, res) {
  res.render(viewsFolder + 'check-before-you-buy-an-ivory-item')
})

/// ////////////////////////////////////////////
// START (old)

router.get('/start', function (req, res) {
  res.render(viewsFolder + 'apply-to-sell-or-hire-an-ivory-item')
})

router.get('/start-a', function (req, res) {
  res.render(viewsFolder + 'start-a')
})

router.get('/start-b', function (req, res) {
  res.render(viewsFolder + 'start-b')
})

router.get('/start-c', function (req, res) {
  res.render(viewsFolder + 'start-c')
})

/// ///////////////////////////////////////////
// START-PROTOTYPE_1
router.get('/start-prototype', function (req, res) {
  logger(req)

  // Remove the previous photo (no need to store it for the prototype.  Heroku will remove them everytime it restarts anyway, but might as well be tidy)
  // This isn't perfect, but removes most of the images floating about unnecessarily.
  if (req.session.data['imageName']) {
    const imagePath = path.join(__dirname, './uploads/', req.session.data['imageName'])
    fs.unlink(imagePath, err => {
      if (err) logger(req, err)
      else logger(req, 'Image removed = ' + imagePath)
    })
  }

  req.session.destroy(function (err) {
    if (err) logger(req, err)
    else logger(req, 'Previous session destroyed')
  })

  // res.redirect('choose-exemption')
  res.redirect('is-it-a-musical-instrument')
})

//* ****************************************************
// CHOOSE-EXEMPTION
router.get('/choose-exemption', function (req, res) {
  logger(req)

  var exemptionType1Checked
  var exemptionType2Checked
  var exemptionType3Checked
  var exemptionType4Checked

  switch (req.session.data['exemptionChoice']) {
    case 'type1':
      exemptionType1Checked = 'checked'
      break
    case 'type2':
      exemptionType2Checked = 'checked'
      break
    case 'type3':
      exemptionType3Checked = 'checked'
      break
    case 'type4':
      exemptionType4Checked = 'checked'
      break
    default:
      exemptionType1Checked = ''
      exemptionType2Checked = ''
      exemptionType3Checked = ''
      exemptionType4Checked = ''
  }
  res.render(viewsFolder + 'choose-exemption', {
    exemptionType1Checked: exemptionType1Checked,
    exemptionType2Checked: exemptionType2Checked,
    exemptionType3Checked: exemptionType3Checked,
    exemptionType4Checked: exemptionType4Checked
  })
})

router.post('/choose-exemption', function (req, res) {
  logger(req, 'Exemption type=' + req.session.data['exemptionChoice'])
  res.redirect('add-photo')
})


















/// ///////////////////////////////////////////////////////////////////////////
// ADD PHOTGRAPH
router.get('/add-photo', function (req, res) {
  logger(req)

  // If returning to this page, remove previously uploaded photo (saves them sitting around unused)
  if (req.session.data['imageName']) {
    const imagePath = projectDirectory + '/app/uploads/' + req.session.data['imageName']
    console.log('Found a previously uploaded photo to remove at image path: ' + imagePath)
    fs.unlink(imagePath, err => {
      if (err) logger(req, err)
      else logger(req, 'Image removed = ' + imagePath)
    })
  }

  res.render(viewsFolder + 'add-photo', {
    backUrl: 'choose-exemption'
  })
})

router.post('/add-photo', function (req, res) {
  logger(req)

  // Set back button URL
  req.session.data['backUrl'] = 'add-photo'

  // Prepare for the photo upload code
  const upload = multer({
    dest: path.join(projectDirectory, '/app/uploads/temp'), // temp location for the file to be placed
    limits: {
      fileSize: 8 * 1024 * 1024 // 8 MB (max file size in bytes)
    }
  }).single('fileToUpload') /* name attribute of <file> element in the html form */

  // Upload the chosen file to the multer 'dest'
  // req.file is the `fileToUpload` file
  upload(req, res, function (err) {
    logger(req, 'Uploading the chosen file')

    // This error handling is a bit rough...
    if (err) {
      logger(req, 'Multer threw an error = ' + err)
    }

    // Check a file was successfully uploaded
    if (!req.file) {
      logger(req, 'No file was chosen/uploaded')

      // ALLOW NO PHOTOS
      // Remove the previous entry ... a temp fudge to handle that uploads from previous users are all called 'image.png'
      // fs.unlink(targetPath, err => {
      //   if (err) console.log(err)
      // });
      // res.redirect('add-title');
      res.redirect('check-photo')
      // FORCE A PHOTO TO BE UPLOAD AND THROW AN ERROR
      // res.render(viewsFolder + 'add-photo', {
      //   errorNoFile: 'Please choose a file'
      // })
    } else { // A file was uploaded, so continue
      const tempPath = req.file.path // req.file is the form input file from type="file" name="fileUpload"

      // Check the file type
      var type = path.extname(req.file.originalname).toLowerCase()
      logger(req, 'File type = ' + type)

      if (type !== '.png' && type !== '.jpg' && type !== '.jpeg' && type !== '.gif') {
        logger(req, 'Wrong file type')
        fs.unlink(tempPath, err => {
          if (err) console.log(err)
        })
        res.render(viewsFolder + 'upload-image', {
          errorNoFile: 'That file type is not accepted'
        })
      } else {
        // Correct file type, so continue
        // If it passes all validation, move/rename it to the persistent location

        // Choose temporary file name (it would likely be the registration/application reference in live)
        var imageName = new Date().getTime().toString() + '.png' // getTime() gives the milliseconds since 1970...
        req.session.data['imageName'] = imageName
        logger(req, 'New session variable imageName = ' + imageName)

        // Set target location for photo
        const targetPath = projectDirectory + '/app/uploads/' + imageName
        logger(req, 'targetPath = ' + targetPath)

        // Move photo from temp location to 'permenant' location
        fs.rename(tempPath, targetPath, function (err) {
          if (err) {
            console.log('err = ' + err)
          } else {
            logger(req, 'File successfully uploaded')
            req.session.data['photoUploaded'] = 'true'

            // testing
            // if ( req.session.data['photoAlreadyPreviewed'] === 'true' ) {
            //   res.redirect('description')
            // } else {
            //   res.redirect('check-photo')
            // }

            res.redirect('check-photo')

          }
        })
      }
    }
  })
})

/// ///////////////////////////////////////////////////////////////////////////
// ADD PHOTOGRAPH 2
router.get('/check-photo', function (req, res) {
  logger(req)
  res.render(viewsFolder + 'check-photo', {
    backUrl: 'add-photo'
  })
})

router.post('/check-photo', function (req, res) {
  logger(req)
  // Set back button URL
  req.session.data['backUrl'] = 'check-photo'
  res.redirect('description')
})

//* ****************************************************
// ADD-TITLE
// router.get('/add-title', function(req, res) {
//   res.render(viewsFolder + 'add-title', {
//     backUrl: 'add-photo2'
//   });
// })
//
// router.post('/add-title', function(req, res) {
//   logger(req);
//   res.redirect('description');
// })

//* ****************************************************
// DESCRIPTION
router.get('/description', function (req, res) {
  logger(req)

  // Temp fudge while we don't have validation on (and you can skip uploading a photo)
  var backUrl
  if (req.session.data['imageName']) {
    backUrl = 'add-photo'
  } else {
    backUrl = 'add-photo'
  }

  res.render(viewsFolder + 'description', {
    backUrl: backUrl
  })
})

router.post('/description', function (req, res) {
  logger(req, 'Description=' + req.session.data['description'])
  res.redirect('ivory-age')
})

//* ****************************************************
// IVORY AGE
router.get('/ivory-age', function (req, res) {
  logger(req)

  var ivoryYear

  switch (req.session.data['exemptionChoice']) {
    case 'type1':
      ivoryYear = '1947'
      break
    case 'type2':
      ivoryYear = '1975'
      break
    case 'type3':
      ivoryYear = '1918'
      break
    case 'type4':
      ivoryYear = ''
      break
    case 'type5':
      ivoryYear = ''
      break
    default:
      ivoryYear = 'xxxx'
  }


  res.render(viewsFolder + 'ivory-age', {
    'ivoryYear': ivoryYear,
    backUrl: 'description'
  })
})

router.post('/ivory-age', function (req, res) {
  res.redirect('ivory-volume')
})

//* ****************************************************
// IVORY VOLUME
router.get('/ivory-volume', function (req, res) {
  logger(req)



  var volumeType1Checked
  var volumeType2Checked
  var volumeType3Checked


  switch (req.session.data['volumeExplanation']) {
    case 'type1':
      volumeType1Checked = 'checked'
      break
    case 'type2':
      volumeType2Checked = 'checked'
      break
    case 'type3':
      volumeType3Checked = 'checked'
      break
    default:
      volumeType1Checked = ''
      volumeType2Checked = ''
      volumeType3Checked = ''
  }



  var ivoryVolume

  switch (req.session.data['exemptionChoice']) {
    case 'type1':
      ivoryVolume = '10%'
      break
    case 'type2':
      ivoryVolume = '20%'
      break
    case 'type3':
      ivoryVolume = '320cm2'
      break
    case 'type4':
      ivoryVolume = ''
      break
    case 'type5':
      ivoryVolume = ''
      break
    default:
      ivoryVolume = 'x%'
  }

  res.render(viewsFolder + 'ivory-volume', {
    volumeType1Checked: volumeType1Checked,
    volumeType2Checked: volumeType2Checked,
    volumeType3Checked: volumeType3Checked,
    'ivoryVolume': ivoryVolume,
    backUrl: 'ivory-age'
  })
})

router.post('/ivory-volume', function (req, res) {
  res.redirect('who-owns-item')
})

//* ****************************************************
// ARE YOU THE OWNER
router.get('/who-owns-item', function (req, res) {
  var ownerChecked = ''
  var agentChecked = ''
  if (req.session.data['ownerAgent'] === 'owner') {
    ownerChecked = 'checked'
  } else if (req.session.data['ownerAgent'] === 'agent') {
    agentChecked = 'checked'
  }

  res.render(viewsFolder + 'who-owns-item', {
    backUrl: 'ivory-volume',
    ownerChecked: ownerChecked,
    agentChecked: agentChecked
  })
})

router.post('/who-owns-item', function (req, res) {
  logger(req)

  if (req.session.data['ownerAgent'] === 'owner') {
    logger(req, "It's the owner, so go down the owner route.")
    res.redirect('owner-name')
  } else {
    logger(req, "It's the agent, so go down the agent route.")
    res.redirect('agent')
  }
})

//* ****************************************************
// AGENT
router.get('/agent', function (req, res) {
  logger(req)

  var agentIs1Checked
  var agentIs2Checked
  var agentIs3Checked
  var agentIs4Checked

  switch (req.session.data['agentIs']) {
    case 'Professional advisor':
      agentIs1Checked = 'checked'
      break
    case 'Executor':
      agentIs2Checked = 'checked'
      break
    case 'Trustee':
      agentIs3Checked = 'checked'
      break
    case 'Friend or relative':
      agentIs4Checked = 'checked'
      break
    default:
      agentIs1Checked = ''
      agentIs2Checked = ''
      agentIs3Checked = ''
      agentIs4Checked = ''
  }
  res.render(viewsFolder + 'agent', {
    backUrl: 'who-owns-item',
    agentIs1Checked: agentIs1Checked,
    agentIs2Checked: agentIs2Checked,
    agentIs3Checked: agentIs3Checked,
    agentIs4Checked: agentIs4Checked
  })
})

router.post('/agent', function (req, res) {
  logger(req, 'Agent is = ' + req.session.data['agentIs'])
  res.redirect('agent-name')
})

//* ****************************************************
// AGENT-NAME
router.get('/agent-name', function (req, res) {
  res.render(viewsFolder + 'agent-name', {
    backUrl: 'agent'
  })
})

router.post('/agent-name', function (req, res) {
  res.redirect('agent-address')
})

//* ****************************************************
// AGENT-ADDRESS
router.get('/agent-address', function (req, res) {
  res.render(viewsFolder + 'agent-address', {
    backUrl: 'agent-name'
  })
})

router.post('/agent-address', function (req, res) {
  res.redirect('agent-contact')
})

//* ****************************************************
// AGENT-CONTACT
router.get('/agent-contact', function (req, res) {
  res.render(viewsFolder + 'agent-contact', {
    backUrl: 'agent-address'
  })
})

router.post('/agent-contact', function (req, res) {
  res.redirect('agent-owner-name')
})

//* ****************************************************
// AGENT-OWNER-NAME
router.get('/agent-owner-name', function (req, res) {
  res.render(viewsFolder + 'agent-owner-name', {
    backUrl: 'agent-address'
  })
})

router.post('/agent-owner-name', function (req, res) {
  res.redirect('agent-owner-address')
})

//* ****************************************************
// AGENT-OWNER-ADDRESS
router.get('/agent-owner-address', function (req, res) {
  res.render(viewsFolder + 'agent-owner-address', {
    backUrl: 'agent-owner-name'
  })
})

router.post('/agent-owner-address', function (req, res) {
  res.redirect('dealing-intent')
})

//* ****************************************************
// add-photo
router.get('/add-photo-1', function (req, res) {
  res.render(viewsFolder + 'add-photo-1')
})

router.post('/add-photo-1', function (req, res) {
  console.log('DEBUG.routes.add-photo-1.post: ' + req.session.data['photograph'])
  res.redirect('add-description')
})

//* ****************************************************
// ADD-DESCRIPTION
router.get('/add-description', function (req, res) {
  res.render(viewsFolder + 'add-description')
})

router.post('/add-description', function (req, res) {
  console.log('DEBUG.routes.add-description.post: ' + req.session.data['description'])
  res.redirect('owner-name-1')
})

//* ****************************************************
// OWNER-NAME
router.get('/owner-name', function (req, res) {
  res.render(viewsFolder + 'owner-name', {
    backUrl: 'who-owns-item'
  })
})

router.post('/owner-name', function (req, res) {
  res.redirect('owner-address')
})

//* ****************************************************
// OWNER-ADDRESS
router.get('/owner-address', function (req, res) {
  res.render(viewsFolder + 'owner-address', {
    backUrl: 'owner-name'
  })
})

router.post('/owner-address', function (req, res) {
  res.redirect('owner-contact')
})

//* ****************************************************
// OWNER-CONTACT
router.get('/owner-contact', function (req, res) {
  res.render(viewsFolder + 'owner-contact', {
    backUrl: 'owner-address'
  })
})

router.post('/owner-contact', function (req, res) {
  res.redirect('dealing-intent')
})

//* ****************************************************
// DEALING-INTENT
router.get('/dealing-intent', function (req, res) {
  logger(req)

  var backUrl
  if (req.session.data['ownerAgent'] === 'owner') {
    backUrl = 'owner-contact'
  } else if (req.session.data['ownerAgent'] === 'agent') {
    backUrl = 'agent-owner-address'
  }

  var intentSellChecked
  var intentHireOutChecked

  switch (req.session.data['dealingIntent']) {
    case 'Sell it':
      intentSellChecked = 'checked'
      break
    case 'Hire it out':
      intentHireOutChecked = 'checked'
      break
    default:
      intentSellChecked = ''
      intentHireOutChecked = ''
  }
  res.render(viewsFolder + 'dealing-intent', {
    backUrl: backUrl,
    intentSellChecked: intentSellChecked,
    intentHireOutChecked: intentHireOutChecked
  })
})

router.post('/dealing-intent', function (req, res) {
  logger(req, 'Dealing intent = ' + req.session.data['dealingIntent'])
  res.redirect('check-your-answers')
})


//* ****************************************************
// CYA nunjucks
router.get('/cya', function (req, res) {
  res.render(viewsFolder + 'cya', {
    backUrl: ''
  })
})



//* ****************************************************
// CHECK YOUR ANSWERS
router.get('/check-your-answers', function (req, res) {
  logger(req)

  var backUrl
  if (req.session.data['ownerAgent'] === 'owner') {
    backUrl = 'dealing-intent'
  } else if (req.session.data['ownerAgent'] === 'agent') {
    backUrl = 'dealing-intent'
  }

  var exemptionTypeChosen

  switch (req.session.data['exemptionChoice']) {
    case 'type1':
      exemptionTypeChosen = exemptionTypeText1
      break
    case 'type2':
      exemptionTypeChosen = exemptionTypeText2
      break
    case 'type3':
      exemptionTypeChosen = exemptionTypeText3
      break
    case 'type4':
      exemptionTypeChosen = exemptionTypeText4
      break
    case 'type5':
      exemptionTypeChosen = exemptionTypeText5
      break
    default:
      exemptionTypeChosen = 'Not available'
  }

  req.session.data['exemptionTypeText'] = exemptionTypeChosen

  switch (req.session.data['exemptionChoice']) {
    case 'type1':
      ivoryYear = '1947'
      ivoryVolume = '10%'
      break
    case 'type2':
      ivoryYear = '1975'
      ivoryVolume = '20%'
      break
    case 'type3':
      ivoryYear = '1918'
      ivoryVolume = '320cm2'
      break
    case 'type4':
      ivoryYear = ''
      break
    case 'type5':
      ivoryYear = ''
      break
    default:
      ivoryYear = 'xxxx'
      ivoryVolume = 'xxxx'
  }


  var ageDetail
  ageDetail = req.session.data['ageDetail']

  var ivoryAge

  ivoryAge = (req.session.data['ivoryAge'])
  console.log( ivoryAge )

  var ageDetail
  ageDetail = req.session.data['ageDetail']



  // switch (req.session.data['ageExplanation']) {
  //   case 'type1':
  //     ageExplanation = 'Date mark on the item'
  //     break
  //   case 'type2':
  //   ageExplanation = 'Information from previous owners, for example where the item was a family heirloom'
  //     break
  //     case 'type3':
  //       ageExplanation = 'Receipt or bill from before' + ivoryYear
  //       break
  //     case 'type4':
  //     ageExplanation = 'Article published before ' + ivoryYear + ' with photographs or a description of the item'
  //       break
  //       case 'type5':
  //         ageExplanation = 'Written verification from an expert'
  //         break
  //       case 'type6':
  //       ageExplanation = 'Evidence in a photograph'
  //         break
  //   case 'type7':
  //   ageExplanation = 'Other'
  //     break
  //   default:
  //   ageExplanation = 'Not available'
  // }





  // switch (req.session.data['volumeExplanation']) {
  //   case 'type1':
  //     volumeExplanation = 'Estimate of ivory content by eye'
  //     break
  //   case 'type2':
  //   volumeExplanation = 'Measured the item to work out the volume'
  //     break
  //   case 'type3':
  //   volumeExplanation = 'Other'
  //     break
  //   default:
  //   volumeExplanation = 'Not available'
  // }


  switch (req.session.data['dealingIntent']) {
    case 'Sell it':
      dealingIntent = 'Sale'
      break
    case 'Hire it out':
    dealingIntent = 'Hire'
      break
      default:
    dealingIntent = 'Not available'
  }

  res.render(viewsFolder + 'check-your-answers', {
    exemptionTypeChosen: exemptionTypeChosen,
    ivoryYear: ivoryYear,
    ivoryAge: ivoryAge,
    ageDetail: ageDetail,
    ivoryVolume: ivoryVolume,
    dealingIntent: dealingIntent,
    backUrl: backUrl,
    agentOwner: req.session.data['ownerAgent']
  })
})

router.post('/check-your-answers', function (req, res) {
  logger(req)
  // res.redirect('declaration');
  res.redirect('govpay-lookalike-1')
})

//* ****************************************************
// DECLARATION
// router.get('/declaration', function(req, res) {
//   logger(req);
//   res.render(viewsFolder + 'declaration', {
//     backUrl: 'check-your-answers'
//   });
// })

// router.post('/declaration', function(req, res) {
//   logger(req);
//   res.redirect('govpay-lookalike-1');
// })

//* ****************************************************
// CONFIRMATION
router.get('/confirmation', function (req, res) {
  logger(req)

  var contactEmail
  if (req.session.data['ownerAgent'] === 'owner') {
    contactEmail = req.session.data['ownerEmail']
    logger(req, 'Owner email=' + req.session.data['ownerEmail'])
  } else if (req.session.data['ownerAgent'] === 'agent') {
    contactEmail = req.session.data['agentEmail']
    logger(req, 'Agent email=' + req.session.data['agentEmail'])
  }
  logger(req, 'ownerAgent=' + req.session.data['ownerAgent'] + ', therefore contact email=' + contactEmail)

  res.render(viewsFolder + 'confirmation', {
    contactEmail: contactEmail
  })
})

//* ****************************************************
// GOVPAY LOOKALIKE 1
router.get('/govpay-lookalike-1', function (req, res) {
  res.render(viewsFolder + 'govpay-lookalike-1')
})

router.post('/govpay-lookalike-1', function (req, res) {
  res.redirect('govpay-lookalike-2')
})

//* ****************************************************
// GOVPAY LOOKALIKE 2
router.get('/govpay-lookalike-2', function (req, res) {
  res.render(viewsFolder + 'govpay-lookalike-2')
})

router.post('/govpay-lookalike-2', function (req, res) {
  res.redirect('confirmation')
})

/// ///////////////////////////////////////////////////////////////////////////
// PAY
router.get('/pay', function (req, res) {
  console.log('DEBUG.routes.pay')

  res.redirect(process.env.GOVUK_PAY_PROTOTYPE_LINK)
})

//* ****************************************************
// CHECK REGISTRATION SEARCH
router.get('/check-registration-search', function (req, res) {
  res.render(viewsFolder + 'check-registration-search')
})

router.post('/check-registration-search', function (req, res) {
  logger(req)
  res.redirect('check-registration-result')

  // res.redirect('check-registration-result', {
  //   sessionDataExists: sessionDataExists
  // });
})

//* ****************************************************
// CHECK REGISTRATION RESULT
router.get('/check-registration-result', function (req, res) {
  logger(req)

  // If there's no session data set some
  // let sessionDataExists;
  // if (req.session.data['exemptionChoice']) {
  //   logger(req, 'Exemption choice exists, so stick with session variables')
  //   sessionDataExists = true;
  //
  // } else {
  //   logger(req, 'Exemption choice does NOT exist, so create some static example session variables')
  //   req.session.data['exemptionTypeText'] = 'Musical instrument with less than 20% ivory and made before 1975'
  //   req.session.data['title'] = 'Piano'
  //   req.session.data['description'] = 'An upright piano with ivory keys'
  //   req.session.data['ivoryAge'] = 'Manufacture dated on 1902'
  //   req.session.data['ivoryVolume'] = 'Expert assessed the volume about 5%'
  //   sessionDataExists = false;
  // }

  // res.render(viewsFolder + 'check-registration-result', {
  //   sessionDataExists: sessionDataExists
  // })

  res.render(viewsFolder + 'check-registration-result')
})

/// ///////////////////////////////////////////////////////////////////////////
// ACCESS UPLOADED IMAGES
router.get('/routeToImage', (req, res) => {
  // Takes a query parameter, e.g. http://localhost:3000/routeToImage?imageName=1548686882219.png
  var imageName = req.query.imageName
  logger(req, 'imageName = ' + imageName)
  var imagePath = path.join(projectDirectory, '/app/uploads/', imageName)
  logger(req, 'imagePath = ' + imagePath)
  res.sendFile(imagePath)
})

router.get('/routeToUploadedImage/:imageId', (req, res) => {
  console.log('DEBUG.routes ' + req.route.path + ', imageId=' + req.params.imageId)
  res.sendFile(path.join(projectDirectory, '/app/uploads/' + req.params.imageId + '.png'))
})



/// ///////////////////////////////////////////////////////////////////////////
// END OF ROUTES

module.exports = router
