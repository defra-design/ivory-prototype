const express = require('express')
const router = express.Router()
const path = require('path')
const multer = require('multer')
const fs = require('fs')
const rootAppDirectory = require('../../config').rootAppDirectory // Used when a full path is required, e.g. '/Users/dave/Documents/NODE/projects/DEFRA/ivory-prototype/app' or '/app/app' on Heroku
const viewsFolder = path.join(__dirname, '/../views/public/') // Set the views with a relative path (haven't yet found a better way of doing this yet)
let versionRegex = process.platform === 'win32' ? /app\\(.[^\\]*?)\\routes/ : /app\/(.[^\/]*?)\/routes/
const version = __dirname.match(versionRegex)[1]// Gets the version, e.g. v10 (ensure this handles Heroku's __direname being /app/app/vXX/routes)

const exemptionTypeText1 = 'Item made before 3 March 1947 with less than 10% ivory'
const exemptionTypeText2 = 'Musical instrument made before 1975 with less than 20% ivory'
const exemptionTypeText3 = 'Portrait miniature made before 1918 with a surface area less than 320 square centimetres'
const exemptionTypeText4 = 'Item to be sold or hired out to a qualifying museum'
const exemptionTypeText5 = 'Item made before 1918 that has outstandingly high artistic, cultural or historical value'



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

// Removed 'Check if service is suitable' type questions - see V9

/// ////////////////////////////////////////////






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

  res.redirect('what-type-of-item-is-it')
  // res.redirect('choose-exemption')
  // res.redirect('is-it-a-musical-instrument')
})

//* ****************************************************
// WHAT TYPE OF ITEM IS IT?
router.get('/what-type-of-item-is-it', function (req, res) {

  var exemptionType1Checked
  var exemptionType2Checked
  var exemptionType3Checked
  var exemptionType4Checked
  var exemptionType5Checked

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
    case 'type5':
      exemptionType5Checked = 'checked'
      break
    default:
      exemptionType1Checked = ''
      exemptionType2Checked = ''
      exemptionType3Checked = ''
      exemptionType4Checked = ''
      exemptionType5Checked = ''
  }
  res.render(viewsFolder + 'what-type-of-item-is-it', {
    exemptionType1Checked: exemptionType1Checked,
    exemptionType2Checked: exemptionType2Checked,
    exemptionType3Checked: exemptionType3Checked,
    exemptionType4Checked: exemptionType4Checked,
    exemptionType5Checked: exemptionType5Checked
  })
})



router.post('/what-type-of-item-is-it', function (req, res) {

    if (req.session.data.photos && req.session.data.photos.length) {
      res.redirect('your-photos')
    } else {
      res.redirect('eligibility-end')
    }
})






//* ****************************************************
// REGISTER MUSEUM ITEM
router.get('/apply-to-register-to-sell-an-item-to-a-museum', function (req, res) {

  res.render(viewsFolder + 'apply-to-register-to-sell-an-item-to-a-museum', {
    backUrl: 'what-type-of-item-is-it',
  })
})



//* ****************************************************
// APPLY FOR AN RMI CERTIFICATE
router.get('/apply-for-an-rmi-certificate', function (req, res) {

  res.render(viewsFolder + 'apply-for-an-rmi-certificate', {
    backUrl: 'what-type-of-item-is-it',
  })
})


/// ///////////////////////////////////////////////////////////////////////////
// COMMON PHOTO FUNCTIONS
function deletePhoto (req, photo) {

  // Remove photo from photos array session variable
  const indexOfPhoto = req.session.data.photos.indexOf(photo)
  req.session.data.photos.splice(indexOfPhoto, 1)

  // Delete photo from storage
  const photoPath = path.join(rootAppDirectory, version, '/photos/', photo)
  fs.unlink(photoPath, err => {
    if (err) {
      console.log(err)
    }
  })

  console.log(`photo deleted: ${photo}`)
  console.log(`photos array: ${req.session.data.photos}`)
}


/// ///////////////////////////////////////////////////////////////////////////
// ADD PHOTO




// if (req.session.data.photos && req.session.data.photos.length) {




router.get('/add-photo', function (req, res) {

  var backUrl
  backUrl = 'what-type-of-item-is-it'

  if (req.session.data['checkYourAnswers'] == 'hub') {
    backUrl = 'your-photos'
  }

  res.render(viewsFolder + 'add-photo', {
    backUrl: backUrl
  })

})


router.post('/add-photo', function (req, res) {

  // Set back button URL
  req.session.data['backUrl'] = 'add-photo'

  // Prepare for the photo upload code
  const upload = multer({
    dest: path.join(rootAppDirectory, version, '/photos'),
    limits: {
      fileSize: 8 * 1024 * 1024 // 8 MB (max file size in bytes)
    }
  }).array('fileToUpload') /* name attribute of <file> element in the html form */

  // Upload the chosen file to the multer 'dest'
  upload(req, res, function (err) {

    // Handle errors
    if (err) {
      logger(req, 'Multer threw an error' + err)
    }

    // Handle no file chosen
    if (!req.files.length) {

      logger(req, 'No file chosen/uploaded')
      res.render(viewsFolder + 'add-photo', {
        errorNoFile: 'Choose a photo'
      })

    } else {

      for ( i=0; i < req.files.length; i++ ) {

        // Handle a wrong file type
        const multerDestPath = req.files[i].path
        var fileExt = path.extname(req.files[i].originalname).toLowerCase()
        if (fileExt !== '.png' && fileExt !== '.jpg' && fileExt !== '.jpeg') {
          logger(req, 'Wrong file type')
          fs.unlink(multerDestPath, err => {
            if (err) console.log(err)
          })
          res.render(viewsFolder + 'add-photo', {
            errorNoFile: 'The photo must be JPG, JPEG or PNG'
          })
        }

        // Passes all validation, so move/rename it to the persistent location
        // (We need to initially save it somewhere to get the file extension otherwise we'd need an additional module to handle the multipart upload)
        var photo = new Date().getTime().toString() + i + fileExt // getTime() gives the milliseconds since 1970...
        const targetPath = path.join(rootAppDirectory, version, '/photos/', photo)

        fs.rename(multerDestPath, targetPath, function (err) {
          if (err) {
            console.log('err = ' + err)
          }
        })

        // Handle session variables
        // Add a photo to the photos array (and create array if it doesn't exist yet)
        if (!req.session.data.photos) {
          req.session.data.photos = []
        }
        req.session.data.photos.push(photo)
        console.log(`photo added: ${photo}`)
        console.log(`photo array: ${req.session.data.photos}`)

      }


      if (err) {
        console.log('err = ' + err)
      } else {

        res.redirect('your-photos')

      }

    }
  })
})






/// ///////////////////////////////////////////////////////////////////////////
// YOUR PHOTOS
router.get('/your-photos', function (req, res) {

  // If we've come from the CYA page, make that the Back link destination
  var backUrl
  backUrl = 'what-type-of-item-is-it'
  if (req.session.data['checkYourAnswers'] == 'hub') {
    backUrl = 'check-your-answers'
  }

  // Reset the what next decision
  req.session.data['photos-what-next'] = ''

  // If there are photos in the array, build the array expected by the GOV.UK summary list
  if (req.session.data.photos && req.session.data.photos.length) {
    const photosSummaryList = req.session.data.photos.map((photo, position) => {
      return {
        key: {
          classes: 'your-photos-key',
          text: `Photo ${position + 1}`
        },
        value: {
          classes: 'your-photos-value',
          html: `<img class="your-photos-img" src="${res.locals.baseUrl}/photos/${photo}" />`
        },
        actions: {
          classes: 'your-photos-actions',
          items: [
            {
              href: `${res.locals.baseUrl}/public/remove-photo/${photo}`,
              text: 'Remove',
              visuallyHiddenText: `Photo ${position + 1}`
            }
          ]
        }
      }
    })

    res.render(viewsFolder + 'your-photos', {

      backUrl: backUrl,
      photosSummaryList: photosSummaryList

    })

    // If there are no photos in the array, redirect to add-photo
  } else {
    res.redirect('add-photo')
  }
})


router.post('/your-photos', function (req, res) {
  // Set back button URL
  req.session.data['backUrl'] = 'your-photos'

  if (req.session.data['checkYourAnswers'] == 'hub') {
    res.redirect('check-your-answers')
  } else {
    res.redirect('describe-the-item')
  }

})





/// ///////////////////////////////////////////////////////////////////////////
// CONFIRM REMOVE PHOTO
router.get('/confirm-remove-photo/:filename', function (req, res) {

  res.render(viewsFolder + 'confirm-remove-photo', {

    // backUrl:  'your-photos',
    // const photo = req.params.filename

    backUrl: `${res.locals.baseUrl}/public/your-photos`,
    photo: req.params.filename
    // photo: req.session.data.photos[req.session.data.photos.length - 1]
  })
})

router.post('/confirm-remove-photo/:filename', function (req, res) {
  // Set back button URL
  // req.session.data['backUrl'] = 'what-type-of-item-is-it'
  // res.redirect('your-photos')
  const photo = req.params.filename
  res.redirect(`${res.locals.baseUrl}/public/remove-photo/` + photo)
})



/// ///////////////////////////////////////////////////////////////////////////
// DELETE PHOTOS
router.get('/remove-photo/:filename', (req, res) => {
  const photo = req.params.filename
  deletePhoto(req, photo)
  res.redirect(`${res.locals.baseUrl}/public/your-photos`) // Dave: This is an explicit path because my computer/browser was having problems with relative paths, which was particularly confusing when the relative path was appended to 'delete-photo'.
})



//* ****************************************************
// DESCRIBE THE ITEM
router.get('/describe-the-item', function (req, res) {
  res.render(viewsFolder + 'describe-the-item')
})

router.post('/describe-the-item', function (req, res) {
  logger(req, 'Description=' + req.session.data['description'])

  if (req.session.data['checkYourAnswers'] == 'hub') {
    res.redirect('check-your-answers')
  } else if (req.session.data['exemptionChoice'] == 'type4'){
    res.redirect('add-photo')
  } else if (req.session.data['exemptionChoice'] == 'type3'){
    res.redirect('ivory-age')
  } else {
    res.redirect('ivory-volume')
  }


})



//* ****************************************************
// IVORY AGE
router.get('/ivory-age', function (req, res) {

  var ivoryYear
  var ivoryDate
  var ivoryBeforeDate
  var ivoryType

  switch (req.session.data['exemptionChoice']) {
    case 'type1':
      ivoryYear = '1947'
      ivoryDate = '3 March 1947'
      ivoryBeforeDate = '2 March 1947'
      ivoryType = 'item'
      break
    case 'type2':
      ivoryYear = '1975'
      ivoryDate = '1975'
      ivoryBeforeDate = '1974'
      ivoryType = 'musical instrument'
      break
    case 'type3':
      ivoryYear = '1918'
      ivoryDate = '1918'
      ivoryBeforeDate = '1917'
      ivoryType = 'portrait miniature'
      break
    case 'type4':
      ivoryYear = 'n/a'
      ivoryDate = 'n/a'
      ivoryYear = 'item'
      break
    case 'type5':
      ivoryYear = '1918'
      ivoryDate = '1918'
      ivoryBeforeDate = '1917'
      ivoryType = 'item'
      break
    default:
      ivoryYear = 'YYYY'
      ivoryDate = 'DD MMM YYYY'
      ivoryBeforeDate = 'DD MMM YYYY'
      ivoryType = 'item'
  }


  res.render(viewsFolder + 'ivory-age', {
    'ivoryYear': ivoryYear,
    'ivoryDate': ivoryDate,
    'ivoryBeforeDate': ivoryBeforeDate,
    'ivoryType': ivoryType,
    backUrl: 'describe-the-item'
  })
})

router.post('/ivory-age', function (req, res) {
  if (req.session.data['exemptionChoice'] == 'type5') {
    res.redirect('want-to-add-documents')
  } else {
    res.redirect('who-owns-item')
  }
})



//* ****************************************************
// IVORY IS INTEGRAL - Only for Pre-1947 less than 10% items
router.get('/ivory-is-integral', function (req, res) {

  res.render(viewsFolder + 'ivory-is-integral', {
    backUrl: 'ivory-age'
  })
})

router.post('/ivory-is-integral', function (req, res) {
  if (req.session.data['checkYourAnswers'] == 'hub') {
    res.redirect('check-your-answers')
  } else {
    res.redirect('ivory-age')
  }
})




//* ****************************************************
// IVORY VOLUME
router.get('/ivory-volume', function (req, res) {


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
  var ivoryType
  var backUrl

  backUrl = 'ivory-age'

  switch (req.session.data['exemptionChoice']) {
    case 'type1':
      ivoryVolume = '10%'
      ivoryType = 'item'
      backUrl = 'ivory-is-integral'
      break
    case 'type2':
      ivoryVolume = '20%'
      ivoryType = 'musical instrument'
      break
    case 'type3':
      ivoryVolume = '320 square centimetres'
      ivoryType = 'portrait miniature'
      break
    case 'type4':
      ivoryVolume = ''
      ivoryType = 'item'
      break
    case 'type5':
      ivoryVolume = ''
      ivoryType = 'item'
      break
    default:
      ivoryVolume = 'x%'
      ivoryType = 'item'
  }



  res.render(viewsFolder + 'ivory-volume', {
    volumeType1Checked: volumeType1Checked,
    volumeType2Checked: volumeType2Checked,
    volumeType3Checked: volumeType3Checked,
    'ivoryVolume': ivoryVolume,
    'ivoryType': ivoryType,
    backUrl: backUrl
  })
})

router.post('/ivory-volume', function (req, res) {

  if (req.session.data['exemptionChoice'] == 'type1') {
    res.redirect('ivory-is-integral')
  } else {
    res.redirect('ivory-age')
  }

})


//* ****************************************************
// WHO OWNS ITEM
router.get('/who-owns-item', function (req, res) {
  var ownerChecked = ''
  var agentChecked = ''
  if (req.session.data['ownerAgent'] == 'owner') {
    ownerChecked = 'checked'
  } else if (req.session.data['ownerAgent'] == 'agent') {
    agentChecked = 'checked'
  }

  res.render(viewsFolder + 'who-owns-item', {
    backUrl: 'ivory-volume',
    ownerChecked: ownerChecked,
    agentChecked: agentChecked
  })
})

router.post('/who-owns-item', function (req, res) {

    if (req.session.data['ownerAgent'] == 'owner'){
    res.redirect('agent-name')
    } else {
    res.redirect('owner-name')
    }
})

//* ****************************************************
// AGENT-NAME
router.get('/agent-name', function (req, res) {
  res.render(viewsFolder + 'agent-name', {
    // backUrl: 'agent'
    backUrl: 'who-owns-item'
  })
})

router.post('/agent-name', function (req, res) {

  if (req.session.data['checkYourAnswers'] == 'hub') {
    res.redirect('check-your-answers')
  } else {
    res.redirect('agent-address')
  }

})

//* ****************************************************
// AGENT-ADDRESS
router.get('/agent-address', function (req, res) {
  res.render(viewsFolder + 'agent-address', {
    backUrl: 'agent-name'
  })
})

router.post('/agent-address', function (req, res) {
    req.session.data['agentAddressLine1'] = '19'
    req.session.data['agentAddressLine2'] = 'Grosvenor Road'
    req.session.data['agentAddressTown'] = 'Solihull'
    req.session.data['agentAddressPostcode'] = 'B91 3PU'
    res.redirect('agent-address-confirm')
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
  })
})

router.post('/owner-name', function (req, res) {

  if (req.session.data['checkYourAnswers'] == 'hub') {
    res.redirect('check-your-answers')
  } else {
    res.redirect('owner-address')
  }

})

//* ****************************************************
// OWNER-ADDRESS
router.get('/owner-address', function (req, res) {
  res.render(viewsFolder + 'owner-address', {
  })
})

router.post('/owner-address', function (req, res) {
    res.redirect('owner-address-choose')
})


//* ****************************************************

// IS ITEM OUTSIDE UK
router.get('/is-item-outside-uk', function (req, res) {
  res.render(viewsFolder + 'is-item-outside-uk')
})

router.post('/is-item-outside-uk', function (req, res) {
  res.redirect('dealing-intent')
})

// DEALING-INTENT
router.get('/dealing-intent', function (req, res) {
  res.render(viewsFolder + 'dealing-intent')
})

router.post('/dealing-intent', function (req, res) {
  res.redirect('check-your-answers')
})



//* ****************************************************
// CHECK YOUR ANSWERS
router.get('/check-your-answers', function (req, res) {


  req.session.data['checkYourAnswers'] = 'hub'

  var backUrl
  if (req.session.data['ownerAgent'] == 'owner') {
    backUrl = 'dealing-intent'
  } else if (req.session.data['ownerAgent'] == 'agent') {
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
      ivoryVolume = '320 square centimetres'
      break
    case 'type4':
      ivoryYear = ''
      ivoryVolume = ''
      break
    case 'type5':
      ivoryYear = '1918'
      ivoryVolume = ''
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
  // res.redirect('declaration');
  res.redirect('govpay-lookalike-1')
})














// * Check your answers pre-filled *********************


//* ****************************************************
// CHECK YOUR ANSWERS FILLED
router.get('/check-your-answers-filled', function (req, res) {

  req.session.data['checkYourAnswers'] = 'hub'

  // * let's pre-fill all the data - this is super-clunky but'll do for now...

  /* type1 = De minimis */
  // req.session.data['exemptionChoice'] = 'type1'

  /* type2 = Musical instrument */
  req.session.data['exemptionChoice'] = 'type2'
  req.session.data['photos'] = ['7BFR12QA.jpg', '1DEW99TX.jpg', '2APS78QY.jpg', '4DFH21BN.jpg', '8PPL07GB.jpg', '9WAS18NJ.jpg']
  req.session.data['description'] = 'An antique violin bow made with tabebuia wood and horsehair with an ivory tip'


  req.session.data['age-declaration'] = 'Declared'
  req.session.data['ivoryAge'] = ['Date mark on the item', 'It\'s been in the family since 1974 or before']
  req.session.data['ageDetail'] = 'Hallmark on the wooden handle dates the bow to 1894.'

  req.session.data['volume-declaration'] = 'Declared'
  req.session.data['volumeDetail'] = 'I can see that the bow contains less than 20% ivory.'
  req.session.data['ivoryVolume'] = ['Estimate of ivory content by eye']


  /* type3 = Portrait miniature */
  // req.session.data['exemptionChoice'] = 'type3'
  // req.session.data['photos'] = ['3UJS18CV.jpg']

  // need to add the checkbox answers to each of these age and volume


  req.session.data['ownerAgent'] = 'agent'

  req.session.data['agentName'] = 'Stella Rimmington'
  req.session.data['agentAddressBusiness'] = 'Acme Auctioneers Ltd'
  req.session.data['agentAddressLine1'] = '65 Primrose Avenue'
  req.session.data['agentAddressLine2'] = ''
  req.session.data['agentAddressTown'] = 'Hoddingbridge'
  req.session.data['agentAddressCounty'] = ''
  req.session.data['agentAddressPostcode'] = 'WE11 2DO'
  req.session.data['agentEmail'] = 's.rimmington@boltsandratchets.co.uk'

  req.session.data['ownerName'] = 'Jim Bowen'
  req.session.data['addressBusiness'] = 'On the Oche'
  req.session.data['addressLine1'] = '29 Bull End'
  req.session.data['addressLine2'] = 'Heswall'
  req.session.data['addressTown'] = 'Wirral'
  req.session.data['addressCounty'] = 'Merseyside'
  req.session.data['addressPostcode'] = 'CH60 1PL'
  req.session.data['ownerEmail'] = 'jim.bowen@gmole.com'

  req.session.data['dealingIntent'] = 'Sell it'




  var backUrl
  if (req.session.data['ownerAgent'] == 'owner') {
    backUrl = 'dealing-intent'
  } else if (req.session.data['ownerAgent'] == 'agent') {
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
      ivoryVolume = '320 square centimetres'
      break
    case 'type4':
      ivoryYear = ''
      ivoryVolume = ''
      break
    case 'type5':
      ivoryYear = '1918'
      ivoryVolume = ''
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

  res.render(viewsFolder + 'check-your-answers-filled', {
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

router.post('/check-your-answers-filled', function (req, res) {
  res.redirect('confirmation')
})



























// * Check your answers pre-filled *********************


//* ****************************************************
// CHECK YOUR ANSWERS FILLED
router.get('/check-your-answers-violin', function (req, res) {

  req.session.data['checkYourAnswers'] = 'hub'

  // * let's pre-fill all the data - this is super-clunky but'll do for now...

  /* type1 = De minimis */
  // req.session.data['exemptionChoice'] = 'type1'

  /* type2 = Musical instrument */
  req.session.data['exemptionChoice'] = 'type2'
  req.session.data['photos'] = ['violin_01.jpg', 'violin_02.jpg', 'violin_03.jpg', 'violin_04.jpg', 'violin_05.jpg']
  req.session.data['description'] = 'An antique violin bow made with tabebuia wood and horsehair with an ivory tip'


  req.session.data['age-declaration'] = 'Declared'
  req.session.data['ivoryAge'] = ['Date mark on the item', 'It\'s been in the family since 1974 or before']
  req.session.data['ageDetail'] = 'Hallmark on the wooden handle dates the bow to 1894.'

  req.session.data['volume-declaration'] = 'Declared'
  req.session.data['volumeDetail'] = 'I can see that the bow contains less than 20% ivory.'
  req.session.data['ivoryVolume'] = ['Estimate of ivory content by eye']


  /* type3 = Portrait miniature */
  // req.session.data['exemptionChoice'] = 'type3'
  // req.session.data['photos'] = ['3UJS18CV.jpg']

  // need to add the checkbox answers to each of these age and volume


  req.session.data['ownerAgent'] = 'agent'

  req.session.data['agentName'] = 'Stella Rimmington'
  req.session.data['agentAddressBusiness'] = 'Acme Auctioneers Ltd'
  req.session.data['agentAddressLine1'] = '65 Primrose Avenue'
  req.session.data['agentAddressLine2'] = ''
  req.session.data['agentAddressTown'] = 'Hoddingbridge'
  req.session.data['agentAddressCounty'] = ''
  req.session.data['agentAddressPostcode'] = 'WE11 2DO'
  req.session.data['agentEmail'] = 's.rimmington@boltsandratchets.co.uk'

  req.session.data['ownerName'] = 'Jim Bowen'
  req.session.data['addressBusiness'] = 'On the Oche'
  req.session.data['addressLine1'] = '29 Bull End'
  req.session.data['addressLine2'] = 'Heswall'
  req.session.data['addressTown'] = 'Wirral'
  req.session.data['addressCounty'] = 'Merseyside'
  req.session.data['addressPostcode'] = 'CH60 1PL'
  req.session.data['ownerEmail'] = 'jim.bowen@gmole.com'

  req.session.data['dealingIntent'] = 'Sell it'




  var backUrl
  if (req.session.data['ownerAgent'] == 'owner') {
    backUrl = 'dealing-intent'
  } else if (req.session.data['ownerAgent'] == 'agent') {
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
      ivoryVolume = '320 square centimetres'
      break
    case 'type4':
      ivoryYear = ''
      ivoryVolume = ''
      break
    case 'type5':
      ivoryYear = '1918'
      ivoryVolume = ''
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

  var ivoryIntegralDetail
  ivoryIntegralDetail = req.session.data['ivoryIntegralDetail']

  var ivoryVolume
  ivoryVolume = (req.session.data['ivoryVolume'])
  //console.log( ivoryAge )




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

  res.render(viewsFolder + 'check-your-answers-violin', {
    exemptionTypeChosen: exemptionTypeChosen,
    ivoryYear: ivoryYear,
    ivoryAge: ivoryAge,
    ageDetail: ageDetail,
    ivoryVolume: ivoryVolume,
    ivoryIntegralDetail: ivoryIntegralDetail,
    dealingIntent: dealingIntent,
    backUrl: backUrl,
    agentOwner: req.session.data['ownerAgent']
  })
})

router.post('/check-your-answers-violin', function (req, res) {
  res.redirect('confirmation')
})










//* ****************************************************
// CONFIRMATION
router.get('/confirmation', function (req, res) {

  var contactEmail

  if (req.session.data['ownerAgent'] == 'owner') {
    contactEmail = req.session.data['ownerEmail']
    contactName = req.session.data['ownerName']
  } else if (req.session.data['ownerAgent'] == 'agent') {
    contactEmail = req.session.data['agentEmail']
    contactName = req.session.data['agentName']
  }
  logger(req, 'ownerAgent=' + req.session.data['ownerAgent'] + ', therefore contact email=' + contactEmail)

  res.render(viewsFolder + 'confirmation', {
    contactEmail: contactEmail
  })
})


//* ****************************************************
// CONFIRMATION-RMI
router.get('/confirmation-RMI', function (req, res) {
  res.render(viewsFolder + 'confirmation-RMI')
})

//* ****************************************************
// CONFIRMATION-CITES
router.get('/confirmation-cites', function (req, res) {
  res.render(viewsFolder + 'confirmation-cites')
})













//* ****************************************************
// CONFIRMATION EMAIL
router.get('/confirmation-email', function (req, res){

  var exemption = req.query.e
  var contactEmail = "jacky.turner@boltsandratchets.co.uk"
  var contactName
  var contactBusiness

  if (req.session.data['ownerAgent'] == 'owner') {
    contactEmail = req.session.data['ownerEmail']
    contactName = req.session.data['ownerName']
    contactBusiness = req.session.data['addressBusiness']
  } else if (req.session.data['ownerAgent'] == 'agent') {
    contactEmail = req.session.data['agentEmail']
    contactName = req.session.data['agentName']
    contactBusiness = req.session.data['agentAddressBusiness']
  }
  logger(req, 'ownerAgent=' + req.session.data['ownerAgent'] + ', therefore contact email=' + contactEmail)

  const date = new Date()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const dayLong = date.toLocaleString('default', { weekday: 'long' })
  const day = date.toLocaleString('default', { day: 'numeric' })
  const month = date.toLocaleString('default', { month: 'long' })
  const year = date.getFullYear()
  const timeOfRegistration = `${hours}:${minutes}`
  const dateOfRegistration = `${dayLong} ${day} ${month} ${year}`

  res.render(viewsFolder + 'confirmation-email', {
    exemption: exemption,
    contactEmail: contactEmail,
    contactName: contactName,
    contactBusiness: contactBusiness,
    dateOfRegistration: dateOfRegistration,
    timeOfRegistration: timeOfRegistration
  })
})

//* ****************************************************
// CONFIRMATION EMAIL RMI - SUCCESS
router.get('/confirmation-email-RMI-success', function (req, res){

  var exemption = req.query.e
  var contactEmail = "jacky.turner@boltsandratchets.co.uk"
  var contactName
  var contactBusiness

  if (req.session.data['ownerAgent'] == 'owner') {
    contactEmail = req.session.data['ownerEmail']
    contactName = req.session.data['ownerName']
    contactBusiness = req.session.data['addressBusiness']
  } else if (req.session.data['ownerAgent'] == 'agent') {
    contactEmail = req.session.data['agentEmail']
    contactName = req.session.data['agentName']
    contactBusiness = req.session.data['agentAddressBusiness']
  }
  logger(req, 'ownerAgent=' + req.session.data['ownerAgent'] + ', therefore contact email=' + contactEmail)

  const date = new Date()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const dayLong = date.toLocaleString('default', { weekday: 'long' })
  const day = date.toLocaleString('default', { day: 'numeric' })
  const month = date.toLocaleString('default', { month: 'long' })
  const year = date.getFullYear()
  const timeOfRegistration = `${hours}:${minutes}`
  const dateOfRegistration = `${dayLong} ${day} ${month} ${year}`

  res.render(viewsFolder + 'confirmation-email-RMI-success', {
    exemption: exemption,
    contactEmail: contactEmail,
    contactName: contactName,
    contactBusiness: contactBusiness,
    dateOfRegistration: dateOfRegistration,
    timeOfRegistration: timeOfRegistration
  })
})


//* ****************************************************
// CONFIRMATION EMAIL RMI - REJECT
router.get('/confirmation-email-RMI-reject', function (req, res){

  var exemption = req.query.e
  var contactEmail = "jacky.turner@boltsandratchets.co.uk"
  var contactName
  var contactBusiness

  if (req.session.data['ownerAgent'] == 'owner') {
    contactEmail = req.session.data['ownerEmail']
    contactName = req.session.data['ownerName']
    contactBusiness = req.session.data['addressBusiness']
  } else if (req.session.data['ownerAgent'] == 'agent') {
    contactEmail = req.session.data['agentEmail']
    contactName = req.session.data['agentName']
    contactBusiness = req.session.data['agentAddressBusiness']
  }
  logger(req, 'ownerAgent=' + req.session.data['ownerAgent'] + ', therefore contact email=' + contactEmail)

  const date = new Date()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const dayLong = date.toLocaleString('default', { weekday: 'long' })
  const day = date.toLocaleString('default', { day: 'numeric' })
  const month = date.toLocaleString('default', { month: 'long' })
  const year = date.getFullYear()
  const timeOfRegistration = `${hours}:${minutes}`
  const dateOfRegistration = `${dayLong} ${day} ${month} ${year}`

  res.render(viewsFolder + 'confirmation-email-RMI-reject', {
    exemption: exemption,
    contactEmail: contactEmail,
    contactName: contactName,
    contactBusiness: contactBusiness,
    dateOfRegistration: dateOfRegistration,
    timeOfRegistration: timeOfRegistration
  })
})


//* ****************************************************
// REGISTRATION
router.get('/registration', function (req, res) {

  var exemption = req.query.e

  const date = new Date()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const dayLong = date.toLocaleString('default', { weekday: 'long' })
  const day = date.toLocaleString('default', { day: 'numeric' })
  const month = date.toLocaleString('default', { month: 'long' })
  const year = date.getFullYear()
  const timeOfRegistration = `${hours}:${minutes}`
  const dateOfRegistration = `${dayLong} ${day} ${month} ${year}`

  res.render(viewsFolder + 'registration', {
    exemption: exemption,
    dateOfRegistration: dateOfRegistration
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
    if (req.session.data['exemptionChoice'] == 'type5') {
      res.redirect('confirmation-RMI')
      } else {
        res.redirect('confirmation')
    }
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
  res.redirect('check-registration-result')

  // res.redirect('check-registration-result', {
  //   sessionDataExists: sessionDataExists
  // });
})

//* ****************************************************
// CHECK REGISTRATION RESULT
router.get('/check-registration-result', function (req, res) {

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




////////////////////////////////////////////     BETA ROUTES - JORDAN /////////////////////////////////////////////

// NEW START PAGE
router.get('/start-new', function (req, res) {
  res.render(viewsFolder + 'start-new')
})

router.post('/start-new', function (req, res) {
  res.redirect('legal-haltpage')
})

// GUIDANCE PUBLICATIONS PAGE
router.get('/guidance-publications', function (req, res) {
  res.render(viewsFolder + 'guidance-publications')
})

// GUIDANCE NEW
router.get('/guidance-new', function (req, res) {
  res.render(viewsFolder + 'guidance-new')
})

// GUIDANCE UNDERSTANDING EXEMPTION CRITERIA
router.get('/guidance-understanding-exemption-criteria', function (req, res) {
  res.render(viewsFolder + 'guidance-understanding-exemption-criteria')
})

// GUIDANCE RMI
router.get('/guidance-rmi', function (req, res) {
  res.render(viewsFolder + 'guidance-rmi')
})

// GUIDANCE BUYING
router.get('/guidance-buying', function (req, res) {
  res.render(viewsFolder + 'guidance-buying')
})

/////    ELIGILITY CHECKER   /////////

// KNOW ITEM IS EXEMPT
router.get('/know-items-exempt', function (req, res) {
  res.render(viewsFolder + 'know-items-exempt')
})

router.post('/know-items-exempt', function (req, res) {

  let knowItemsExempt = req.session.data['knowItemsExempt']

  if (knowItemsExempt === 'yes') {
    res.redirect('what-type-of-item-is-it')
  } else {
    res.redirect('sure-its-elephant')
  }
})

// SURE ITS ELEPHANT IVORY
router.get('/sure-its-elephant', function (req, res) {
  res.render(viewsFolder + 'sure-its-elephant')
})

router.post('/sure-its-elephant', function (req, res) {
  req.session.data['knowItemsExempt'] = 'unsure'

  let isitElephant = req.session.data['isitElephant']

  if (isitElephant === 'yes') {
    res.redirect('is-it-being-sold-to-museum')
  } else if (isitElephant === 'idk'){
    res.redirect('cannot-continue')
  } else {
    res.redirect('dont-need-service')
  }
})


// MUSICAL INSTRUMENT?
router.get('/is-it-a-musical-instrument', function (req, res) {
  res.render(viewsFolder + 'is-it-a-musical-instrument')
})

router.post('/is-it-a-musical-instrument', function (req, res) {

  let isitMusical = req.session.data['isitMusical']

  if (isitMusical === 'yes') {
    req.session.data['exemptionChoice'] = 'type2'
    res.redirect('is-it-a-musical-instrument-2')
  } else {
    res.redirect('less-than-10-percent')
  }
})


// IS IT PRE 1947?
router.get('/was-it-made-before-1947', function (req, res) {
  res.render(viewsFolder + 'was-it-made-before-1947')
})

router.post('/was-it-made-before-1947', function (req, res) {

  let isitBefore1947 = req.session.data['isitBefore1947']

  if (isitBefore1947 === 'yes' && req.session.data['isitMusical'] === 'yes' ) {
    req.session.data['exemptionChoice'] = 'type2'
    res.redirect('less-than-20-percent')
  } else if (isitBefore1947 === 'no' && req.session.data['isitMusical'] === 'yes' ){
    req.session.data['exemptionChoice'] = 'type2'
    res.redirect('is-it-a-musical-instrument-2')
  } else if (isitBefore1947 === 'yes' && req.session.data['lessthan10percent'] === 'yes' ){
    res.redirect('ivory-added')
  } else if (isitBefore1947 === 'no' && req.session.data['lessthan10percent'] === 'yes' ){
    res.redirect('based-on-your-answers')
  } else {
    res.redirect('cannot-continue')
  }
})

// MUSICAL INSTRUMENT 2 (1975 date question for CITES)
router.get('/is-it-a-musical-instrument-2', function (req, res) {
  res.render(viewsFolder + 'is-it-a-musical-instrument-2')
})

router.post('/is-it-a-musical-instrument-2', function (req, res) {

  let after1975 = req.session.data['after1975']

  if (after1975 === 'no') {
    res.redirect('based-on-your-answers')
  } else if (after1975 === 'yes'){
    res.redirect('less-than-20-percent')
  } else {
    res.redirect('cannot-continue')
  }
})

// LESS THAN 10 PERCENT
router.get('/less-than-10-percent', function (req, res) {
  res.render(viewsFolder + 'less-than-10-percent')
})

router.post('/less-than-10-percent', function (req, res) {

  let lessthan10percent = req.session.data['lessthan10percent']

  if (lessthan10percent === 'yes') {
    req.session.data['exemptionChoice'] = 'type1'
    res.redirect('was-it-made-before-1947')
  } else if (lessthan10percent === 'no'){
    res.redirect('is-it-a-portrait-miniature')
  } else {
    res.redirect('cannot-continue')
  }
})

// LESS THAN 20 PERCENT
router.get('/less-than-20-percent', function (req, res) {
  res.render(viewsFolder + 'less-than-20-percent')
})

router.post('/less-than-20-percent', function (req, res) {

  let lessthan20percent = req.session.data['lessthan20percent']

  if (lessthan20percent === 'yes') {
    res.redirect('ivory-added')
  } else if (lessthan20percent === 'no'){
    res.redirect('is-it-RMI')
  } else {
    res.redirect('cannot-continue')
  }
})

// PORTRAIT MINIATURE
router.get('/is-it-a-portrait-miniature', function (req, res) {
  res.render(viewsFolder + 'is-it-a-portrait-miniature')
})

router.post('/is-it-a-portrait-miniature', function (req, res) {

  let isitPortrait = req.session.data['isitPortrait']

  if (isitPortrait === 'yes') {
    req.session.data['exemptionChoice'] = 'type3'
    res.redirect('was-it-made-before-1918')
  } else if (isitPortrait === 'no'){
    res.redirect('was-it-made-before-1918')
  } else {
    res.redirect('cannot-continue')
  }
})


// WAS IT MADE BEFORE 1918
router.get('/was-it-made-before-1918', function (req, res) {
  res.render(viewsFolder + 'was-it-made-before-1918')
})

router.post('/was-it-made-before-1918', function (req, res) {

  let isitBefore1918 = req.session.data['isitBefore1918']

  if (isitBefore1918 === 'yes' && req.session.data['isitPortrait'] === 'yes') {
    res.redirect('less-than-320-square-centimetres')
  } else if (isitBefore1918 === 'yes' && req.session.data['isitPortrait'] === 'no'){
    res.redirect('is-it-RMI')
  } else if (isitBefore1918 === 'no'){
    res.redirect('based-on-your-answers')
  } else {
    res.redirect('cannot-continue')
  }
})

// LESS THAN 320 SQUARE CENTIMETRES
router.get('/less-than-320-square-centimetres', function (req, res) {
  res.render(viewsFolder + 'less-than-320-square-centimetres')
})

router.post('/less-than-320-square-centimetres', function (req, res) {

  let lessthan320 = req.session.data['lessthan320']

  if (lessthan320 === 'yes'){
    res.redirect('ivory-added')
  } else if (lessthan320 === 'no'){
    res.redirect('is-it-RMI')
  } else {
    res.redirect('cannot-continue')
  }
})

// SOLD TO MUSEUM
router.get('/is-it-being-sold-to-museum', function (req, res) {
  res.render(viewsFolder + 'is-it-being-sold-to-museum')
})

router.post('/is-it-being-sold-to-museum', function (req, res) {

  let isitMuseum = req.session.data['isitMuseum']

  if (isitMuseum === 'yes') {
    req.session.data['exemptionChoice'] = 'type4'
    res.redirect('are-you-a-museum')
  } else {
    req.session.data['exemptionChoice'] = ''
    res.redirect('is-it-a-musical-instrument')
  }
})

// ARE YOU A MUSEUM
router.get('/are-you-a-museum', function (req, res) {
  res.render(viewsFolder + 'are-you-a-museum')
})

router.post('/are-you-a-museum', function (req, res) {

  let areyouMuseum = req.session.data['areyouMuseum']

  if (areyouMuseum === 'yes') {
    res.redirect('dont-need-service')
  } else {
    res.redirect('eligibility-end')
  }
})

// RMI
router.get('/is-it-RMI', function (req, res) {
  res.render(viewsFolder + 'is-it-RMI')
})

router.post('/is-it-RMI', function (req, res) {

  let isitRMI = req.session.data['isitRMI']

  if (isitRMI === 'yes') {
    req.session.data['exemptionChoice'] = 'type5'
    res.redirect('eligibility-end')
  } else if (isitRMI === 'idk'){
    res.redirect('cannot-continue')
  } else {
    res.redirect('based-on-your-answers')
  }
})


// IVORY ADDED
router.get('/ivory-added', function (req, res) {
  res.render(viewsFolder + 'ivory-added')
})

router.post('/ivory-added', function (req, res) {

  let ivoryAdded = req.session.data['ivoryAdded']

  if (ivoryAdded === 'no'){
    res.redirect('eligibility-end')
  } else if (ivoryAdded === 'yes'){
    res.redirect('ivory-added-2')
  } else {
    res.redirect('cannot-continue')
  }
})

// IVORY ADDED 2
router.get('/ivory-added-2', function (req, res) {

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
      ivoryYear = 'n/a'
      break
    case 'type5':
      ivoryYear = '1918'
      break
    default:
      ivoryYear = 'YYYY'
  }

  res.render(viewsFolder + 'ivory-added-2', {
    'ivoryYear': ivoryYear,
  })
})

router.post('/ivory-added-2', function (req, res) {

  let ivoryAdded2 = req.session.data['ivoryAdded2']

  if (ivoryAdded2 === 'no' && req.session.data['knowItemsExempt'] === 'unsure') {
    res.redirect('eligibility-end')
  } else if (ivoryAdded2 === 'yes'){
    res.redirect('based-on-your-answers')
  } else {
    res.redirect('cannot-continue')
  }
})

// ELIGIBILITY END
router.get('/eligibility-end', function (req, res) {
  res.render(viewsFolder + 'eligibility-end', {
    'haltTrigger': req.session.haltTrigger
  })
})


router.post('/eligibility-end', function (req, res) {
    res.redirect('legal-haltpage')
})

// BASED ON YOUR ANSWERS - DROP OUT
router.get('/based-on-your-answers', function (req, res) {
  res.render(viewsFolder + 'based-on-your-answers', {
    'haltTrigger': req.session.haltTrigger
  })
})

  // CANNOT CONTINUE - REPLACEMENT IVORY DROP OUT
router.get('/cannot-continue', function (req, res) {
  res.render(viewsFolder + 'cannot-continue', {
  })
})

// LEGAL HALTPAGE
router.get('/legal-haltpage', function (req, res) {
  res.render(viewsFolder + 'legal-haltpage')
})

router.post('/legal-haltpage', function (req, res) {
  res.redirect('add-photo')
})



/////////////////     ADDRESS LOOKUP     ///////////////////////////////////


// INTERNATIONAL ADDRESS
router.get('/international-address', function (req, res) {
  res.render(viewsFolder + 'international-address')
})

// AGENT ADDRESS CONFIRM
router.get('/agent-address-confirm', function (req, res) {
  res.render(viewsFolder + 'agent-address-confirm')
})

router.post('/agent-address-confirm', function (req, res) {
  if (req.session.data['checkYourAnswers'] == 'hub') {
    res.redirect('check-your-answers')
    } else {
      res.redirect('sell-or-hire')
  }
})

// AGENT ADDRESS MANUAL
router.get('/agent-address-manual', function (req, res) {
  res.render(viewsFolder + 'agent-address-manual')
})

router.post('/agent-address-manual', function (req, res) {
    res.redirect('is-item-outside-uk')
})

// OWNER ADDRESS MANUAL
router.get('/owner-address-manual', function (req, res) {
  res.render(viewsFolder + 'owner-address-manual')
})

router.post('/owner-address-manual', function (req, res) {
    res.redirect('agent-name')
})

// OWNER ADDRESS CHOOSE
router.get('/owner-address-choose', function (req, res) {
  res.render(viewsFolder + 'owner-address-choose')
})

router.post('/owner-address-choose', function (req, res) {
  req.session.data['addressLine1'] = '17'
  req.session.data['addressLine2'] = 'Whitchurch Road'
  req.session.data['addressTown'] = 'Wellington'
  req.session.data['addressPostcode'] = 'TF1 3DS'

  if (req.session.data['checkYourAnswers'] == 'hub') {
    res.redirect('check-your-answers')
  } else {

    res.redirect('agent-name')
  }
})

// SELL OR HIRE
router.get('/sell-or-hire', function (req, res) {
  res.render(viewsFolder + 'sell-or-hire')
})

// changed to skip cites questions for MVS
//router.post('/sell-or-hire', function (req, res) {
//    res.redirect('is-item-outside-uk')
//})

router.post('/sell-or-hire', function (req, res) {
   req.session.data['permit'] = 'no'

   res.redirect('check-your-answers')
})


//  FIND OUT MORE DROPOUT
router.get('/find-out-more', function (req, res) {
  res.render(viewsFolder + 'find-out-more')
})

//  DONT NEED SERVICE DROPOUT
router.get('/dont-need-service', function (req, res) {
  res.render(viewsFolder + 'dont-need-service')
})


//////////////// S2 document upload ////////////////


// DO YOU WANT TO ADD SUPPORTING DOCUMENTS?
router.get('/want-to-add-documents', function (req, res) {
  res.render(viewsFolder + 'want-to-add-documents')
})

router.post('/want-to-add-documents', function (req, res) {
  if (req.session.data['documents'] == 'Yes') {
    res.redirect('add-document')
    } else {
      res.redirect('who-owns-item')
  }
})

// ADD DOCUMENT
router.get('/add-document', function (req, res) {
  res.render(viewsFolder + 'add-document')
})

router.post('/add-document', function (req, res) {
    res.redirect('your-documents')
})

// YOUR DOCUMENTS
router.get('/your-documents', function (req, res) {
  res.render(viewsFolder + 'your-documents')
})

router.post('/your-documents', function (req, res) {
    res.redirect('who-owns-item')
})


module.exports = router
