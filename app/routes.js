const express = require('express')
const router = express.Router()

const path = require('path')
const multer = require('multer')
const fs = require('fs')

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
  // if (!req) { req = '' }
  console.log('DEBUG.routes ' + req.method + req.route.path + ': ' + msg)
}

/// ///////////////////////////////////////////
// Add your routes here - above the module.exports line

// LOAD OTHER ROUTES (from separate files, as this main routes.js is getting busy)
router.use(require('./routes-internal.js'))
router.use(require('./routes-sandpit.js'))

/// ///////////////////////////////////////////
// START-PROTOTYPE_1
router.get('/start-prototype', function (req, res) {
  logger(req)

  // Remove the previous photo (no need to store it for the ptototype.  Heroku will remove them everytime it restarts anyway, but might as well be tidy)
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

  res.redirect('choose-exemption')
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
  res.render('choose-exemption', {
    exemptionType1Checked: exemptionType1Checked,
    exemptionType2Checked: exemptionType2Checked,
    exemptionType3Checked: exemptionType3Checked,
    exemptionType4Checked: exemptionType4Checked
  })
})

router.post('/choose-exemption', function (req, res) {
  logger(req, 'Exemption type=' + req.session.data['exemptionChoice'])
  res.redirect('add-photograph')
})

/// ///////////////////////////////////////////////////////////////////////////
// ADD PHOTGRAPH
router.get('/add-photograph', function (req, res) {
  logger(req)

  // If returning to this page, remove previously uploaded photo (saves them sitting around unused)
  if (req.session.data['imageName']) {
    const imagePath = path.join(__dirname, './uploads/', req.session.data['imageName'])
    fs.unlink(imagePath, err => {
      if (err) logger(req, err)
      else logger(req, 'Image removed = ' + imagePath)
    })
  }

  res.render('add-photograph', {
    backUrl: 'choose-exemption'
  })
})

router.post('/add-photograph', function (req, res) {
  logger(req)
  // Set back button URL
  req.session.data['backUrl'] = 'add-photograph'

  // Prepare for the photo upload code
  const upload = multer({
    dest: 'app/uploads/temp', // temp location for the file to be placed
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
      res.redirect('description')
      // FORCE A PHOTO TO BE UPLOAD AND THROW AN ERROR
      // res.render('add-photograph', {
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
        res.render('upload-image', {
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
        const targetPath = path.join(__dirname, './uploads/', imageName)
        logger(req, 'targetPath = ' + targetPath)

        // Move photo from temp location to 'permenant' location
        fs.rename(tempPath, targetPath, function (err) {
          if (err) {
            console.log('err = ' + err)
          } else {
            logger(req, 'File successfully uploaded')
            res.redirect('add-photograph2')
          }
        })
      }
    }
  })
})

/// ///////////////////////////////////////////////////////////////////////////
// ADD PHOTGRAPH 2
router.get('/add-photograph2', function (req, res) {
  logger(req)
  res.render('add-photograph2', {
    backUrl: 'add-photograph'
  })
})

router.post('/add-photograph2', function (req, res) {
  logger(req)
  // Set back button URL
  req.session.data['backUrl'] = 'add-photograph2'
  res.redirect('/description')
})

//* ****************************************************
// ADD-TITLE
// router.get('/add-title', function(req, res) {
//   res.render('add-title', {
//     backUrl: 'add-photograph2'
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
    backUrl = 'add-photograph2'
  } else {
    backUrl = 'add-photograph'
  }

  res.render('description', {
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
      ivoryYear = 'Not available'
  }

  res.render('ivory-age', {
    'ivoryYear': ivoryYear,
    backUrl: 'description'
  })
})

router.post('/ivory-age', function (req, res) {
  res.redirect('ivory-volume')
})

//* ****************************************************
// IVORY AGE
router.get('/ivory-volume', function (req, res) {
  logger(req)

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
      ivoryVolume = 'Not available'
  }

  res.render('ivory-volume', {
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

  res.render('who-owns-item', {
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
  res.render('agent', {
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
  res.render('agent-name', {
    backUrl: 'agent'
  })
})

router.post('/agent-name', function (req, res) {
  res.redirect('agent-address')
})

//* ****************************************************
// AGENT-ADDRESS
router.get('/agent-address', function (req, res) {
  res.render('agent-address', {
    backUrl: 'agent-name'
  })
})

router.post('/agent-address', function (req, res) {
  res.redirect('agent-contact')
})

//* ****************************************************
// AGENT-CONTACT
router.get('/agent-contact', function (req, res) {
  res.render('agent-contact', {
    backUrl: 'agent-address'
  })
})

router.post('/agent-contact', function (req, res) {
  res.redirect('agent-owner-name')
})

//* ****************************************************
// AGENT-OWNER-NAME
router.get('/agent-owner-name', function (req, res) {
  res.render('agent-owner-name', {
    backUrl: 'agent-address'
  })
})

router.post('/agent-owner-name', function (req, res) {
  res.redirect('agent-owner-address')
})

//* ****************************************************
// AGENT-OWNER-ADDRESS
router.get('/agent-owner-address', function (req, res) {
  res.render('agent-owner-address', {
    backUrl: 'agent-owner-name'
  })
})

router.post('/agent-owner-address', function (req, res) {
  res.redirect('dealing-intent')
})

//* ****************************************************
// ADD-PHOTOGRAPH
router.get('/add-photograph-1', function (req, res) {
  res.render('add-photograph-1')
})

router.post('/add-photograph-1', function (req, res) {
  console.log('DEBUG.routes.add-photograph-1.post: ' + req.session.data['photograph'])
  res.redirect('add-description-1')
})

//* ****************************************************
// ADD-DESCRIPTION
router.get('/add-description-1', function (req, res) {
  res.render('add-description-1')
})

router.post('/add-description-1', function (req, res) {
  console.log('DEBUG.routes.add-description-1.post: ' + req.session.data['description'])
  res.redirect('owner-name-1')
})

//* ****************************************************
// OWNER-NAME
router.get('/owner-name', function (req, res) {
  res.render('owner-name', {
    backUrl: 'who-owns-item'
  })
})

router.post('/owner-name', function (req, res) {
  res.redirect('owner-address')
})

//* ****************************************************
// OWNER-ADDRESS
router.get('/owner-address', function (req, res) {
  res.render('owner-address', {
    backUrl: 'owner-name'
  })
})

router.post('/owner-address', function (req, res) {
  res.redirect('owner-contact')
})

//* ****************************************************
// OWNER-CONTACT
router.get('/owner-contact', function (req, res) {
  res.render('owner-contact', {
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
  res.render('dealing-intent', {
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

  res.render('check-your-answers', {
    exemptionTypeChosen: exemptionTypeChosen,
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
//   res.render('declaration', {
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

  res.render('confirmation', {
    contactEmail: contactEmail
  })
})

/// ///////////////////////////////////////////////////////////////////////////
// NOTIFY
router.post('/notify', function (req, res) {
  console.log('DEBUG.routes.notify')

  if (req.session.data['email']) {
    console.log('DEBUG.routes.notify.email: ' + req.session.data['email'])
    SendNotifyEmail(req.session.data['email'])
  } else {
    console.log('DEBUG.routes.notify.email is null')
  }

  if (req.session.data['telephoneNumber']) {
    console.log('DEBUG.routes.notify.telephoneNumber: ' + req.session.data['telephoneNumber'])
    SendNotifySMS(req.session.data['telephoneNumber'])
  } else {
    console.log('DEBUG.routes.notify.email is null')
  }

  res.render('notify-confirm', {
    'emailAddress': req.session.data['email'],
    'telephoneNumber': req.session.data['telephoneNumber']
  })
})

function SendNotifyEmail (emailAddress) {
  console.log('DEBUG.routes.SendNotifyEmail: ' + emailAddress)
  // SETUP
  let apiKey = process.env.GOVUK_NOTIFY_API_KEY
  let NotifyClient = require('notifications-node-client').NotifyClient
  let notifyClient = new NotifyClient(apiKey)

  // SEND MESSAGE - EMAIL
  let templateId = '67a4de78-d063-4593-976f-7ad8112c30ab'

  notifyClient.sendEmail(templateId, emailAddress, {
    personalisation: {
      submissionId: 'TEST'
    }
  })
    .then(res => console.log(res))
    .catch(err => console.error(err))
}

function SendNotifySMS (telephoneNumber) {
  console.log('DEBUG.routes.SendNotifySMS: ' + telephoneNumber)
  // SETUP
  let apiKey = process.env.GOVUK_NOTIFY_API_KEY
  let NotifyClient = require('notifications-node-client').NotifyClient
  let notifyClient = new NotifyClient(apiKey)

  // SEND MESSAGE - EMAIL
  var templateId = 'a5d109c5-ddcb-44b9-ab7d-f921f6b024be'

  notifyClient.sendSms(templateId, telephoneNumber, {
    personalisation: {
      submissionId: 'TEST'
    }
  })
    .then(res => console.log(res))
    .catch(err => console.error(err))
}

//* ****************************************************
// GOVPAY LOOKALIKE 1
router.get('/govpay-lookalike-1', function (req, res) {
  res.render('govpay-lookalike-1')
})

router.post('/govpay-lookalike-1', function (req, res) {
  res.redirect('govpay-lookalike-2')
})

//* ****************************************************
// GOVPAY LOOKALIKE 2
router.get('/govpay-lookalike-2', function (req, res) {
  res.render('govpay-lookalike-2')
})

router.post('/govpay-lookalike-2', function (req, res) {
  res.redirect('confirmation')
})

/// ///////////////////////////////////////////////////////////////////////////
// PAY
router.post('/pay', function (req, res) {
  console.log('DEBUG.routes.pay')

  res.redirect('https://products.payments.service.gov.uk/pay/afdf0ef4129a4e1db99af61e392a709f')

  // res.redirect(process.env.GOVUK_PAY_PROTOTYPE_LINK);
})

//* ****************************************************
// CHECK REGISTRATION SEARCH
router.get('/check-registration-search', function (req, res) {
  res.render('check-registration-search')
})

router.post('/check-registration-search', function (req, res) {
  logger(req)
  res.redirect('/check-registration-result')

  // res.redirect('check-registration-result', {
  //   sessionDataExists: sessionDataExists
  // });
})

//* ****************************************************
// CHECK REGISTRATION RESULT
router.get('/check-registration-result', function (req, res) {
  logger(req)

  // If there's no session data set some
  // var sessionDataExists;
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

  // res.render('check-registration-result', {
  //   sessionDataExists: sessionDataExists
  // })

  res.render('check-registration-result')
})

//* ****************************************************
// ADDRESS-POSTCODE
router.post('/address-postcode', function (req, res) {
  console.log('DEBUG.routes.address-postcode.post: ' + req.session.data['address-name-number'] + ' and ' + req.session.data['postcode'])
  res.redirect('address-select')
})

//* ****************************************************
// ADDRESS-SELECT
router.post('/address-select', function (req, res) {
  console.log('DEBUG.routes.address-select.post: ' + req.session.data['addressSelect'])
  res.redirect('address-confirm')
})

/// ///////////////////////////////////////////////////////////////////////////
// ACCESS UPLOADED IMAGES
router.get('/routeToImage', (req, res) => {
  // Takes a query parameter, e.g. http://localhost:3000/routeToImage?imageName=1548686882219.png
  var imageName = req.query.imageName
  logger(req, 'imageName = ' + imageName)
  var imagePath = path.join(__dirname, './uploads/', imageName)
  logger(req, 'imagePath = ' + imagePath)
  res.sendFile(imagePath)
})

router.get('/routeToUploadedImage/:imageId', (req, res) => {
  console.log('DEBUG.routes ' + req.route.path + ', imageId=' + req.params.imageId)
  res.sendFile(path.join(__dirname, './uploads/' + req.params.imageId + '.png'))
})

module.exports = router
