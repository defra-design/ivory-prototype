const express = require('express')
const router = express.Router()

const path = require("path");
const multer = require("multer");
const fs = require("fs");

registerTypeText1 = 'Pre-digital animation characters'
registerTypeText2 = 'Digital animation characters'
registerTypeText3 = 'Pixar characters'
registerTypeText4 = 'Star Wars characters'

exemptionTypeText1 = 'Item with less than 10% ivory made before 1947'
exemptionTypeText2 = 'Musical instrument with less than 20% ivory and made before 1975'
exemptionTypeText3 = 'Portrait miniature made before 1918'
exemptionTypeText4 = 'Item to be acquired by an accredited museum'
exemptionTypeText5 = 'An item of outstandingly high artistic, cultural or historical value made before 1918'

//////////////////////////////////////////////////////////////////////////////
// LOGGER (not great, but may help)
function logger(req, msg) {
  if (!msg) { msg = '' }
  // if (!req) { req = '' }
  console.log('DEBUG.routes ' + req.method + req.route.path + ': ' + msg);
}


// Add your routes here - above the module.exports line

// LOAD OTHER ROUTES (from separate files, as this main routes.js is getting busy)
router.use(require('./routes-internal.js'));
router.use(require('./routes-sandpit.js'));

// START-PROTOTYPE_1
router.get('/start-prototype', function(req, res) {
  logger(req);

  req.session.destroy(function(err) {
    if (err) {
      console.log(err);
    }
    logger(req, 'Previous session destroyed');
  })

  res.redirect('choose-exemption');
})


//*****************************************************
//CHOOSE-EXEMPTION
router.get('/choose-exemption', function(req, res) {
  logger(req);
  res.render('choose-exemption')
})

router.post('/choose-exemption', function(req, res) {
  logger(req, 'Exemption type='+req.session.data['exemptionChoice']);
  res.redirect('add-photograph');
})


//////////////////////////////////////////////////////////////////////////////
// ADD PHOTGRAPH
router.get('/add-photograph', function(req, res) {
  logger(req);
  res.render('add-photograph', {
    backUrl: 'choose-exemption'
  });
})

const upload = multer({
  dest: "app/uploads/temp", // temp location for the file to be placed
  limits: {
    fileSize: 8 * 1024 * 1024 // 8 MB (max file size in bytes)
  }
}).single('fileToUpload'); /* name attribute of <file> element in your form */

// router.post('/sandpit/upload-image', upload, function(req, res) {
router.post('/add-photograph', function(req, res) {
  logger(req);
  // Set back button URL
  req.session.data['backUrl'] = 'add-photograph';

  // Upload the chosen file to the multer 'dest'
  upload(req, res, function(err) {
    console.log('DEBUG '+req.method+req.route.path + ': File uploaded to temp location');
    // req.file is the `fileToUpload` file
    // req.body will hold the text fields, if there were any

    // Check a file was uploaded
    if (!req.file) {
      console.log('DEBUG '+req.method+req.route.path + ': No file uploaded');
      res.render('add-photograph', {
        errorNoFile: 'Please choose a file to upload'
      })

    }
    // A file was uploaded, so continue
    else {

      const tempPath = req.file.path; // req.file is the form input file from type="file" name="fileUpload"
      const targetPath = path.join(__dirname, './uploads/image.png');
      console.log('DEBUG '+req.method+req.route.path+'tempPath=' + tempPath);
      console.log('DEBUG '+req.method+req.route.path+'targetPath=' + targetPath);

      //Check the file type
      var type = path.extname(req.file.originalname).toLowerCase();
      console.log('DEBUG '+req.method+req.route.path+':File type = ' + type);

      if (type !== '.png' && type !== '.jpg') {
        console.log('DEBUG '+req.method+req.route.path+':Wrong file type');

        fs.unlink(tempPath, err => {
          if (err) console.log(err)
        });

        res.render('upload-image', {
          errorNoFile: 'That file type is not accepted'
        })

        // Correct file type, so continue
      } else {
        //If it passes all validation, move/rename it to the persistent location
        fs.rename(tempPath, targetPath, function(err) {
          if (err) {
            console.log('err = ' + err);
          } else {
            console.log('DEBUG '+req.method+req.route.path+':File successfully uploaded');
            res.redirect('add-photograph2');
          }
        });
      }
    }
  })
});


router.get('/add-photograph2', function(req, res) {
  logger(req);
  res.render('add-photograph2', {
    backUrl: 'add-photograph'
  });
})

router.post('/add-photograph2', function(req, res) {
  logger(req);
  // Set back button URL
  req.session.data['backUrl'] = 'add-photograph2';
  res.redirect('/add-title');
})


//*****************************************************
//ADD-TITLE
router.get('/add-title', function(req, res) {
  res.render('add-title', {
    backUrl: 'add-photograph2'
  });
})

router.post('/add-title', function(req, res) {
  logger(req);
  res.redirect('description');
})


//*****************************************************
//DESCRIPTION
router.get('/description', function(req, res) {
  logger(req);
  res.render('description', {
    backUrl: 'add-title'
  })
})

router.post('/description', function(req, res) {
  logger(req, 'Description='+req.session.data['description']);
  res.redirect('ivory-age');
})



//*****************************************************
//IVORY AGE
router.get('/ivory-age', function(req, res) {
  logger(req);

  var ivoryYear;

  switch (req.session.data['exemptionChoice']) {
    case 'type1':
      ivoryYear = '1947';
      break;
    case 'type2':
      ivoryYear = '1975';
      break;
    case 'type3':
      ivoryYear = '1918';
      break;
    case 'type4':
      ivoryYear = '';
      break;
    case 'type5':
      ivoryYear = '';
      break;
    default:
      ivoryYear = 'Not available';
  }

  res.render('ivory-age', {
    'ivoryYear': ivoryYear,
    backUrl: 'description'
  })


})


router.post('/ivory-age', function(req, res) {
  res.redirect('ivory-volume');
})



//*****************************************************
//IVORY AGE
router.get('/ivory-volume', function(req, res) {
  logger(req);

  var ivoryVolume;

  switch (req.session.data['exemptionChoice']) {
    case 'type1':
      ivoryVolume = '10%';
      break;
    case 'type2':
      ivoryVolume = '20%';
      break;
    case 'type3':
      ivoryVolume = '320cm2';
      break;
    case 'type4':
      ivoryVolume = '';
      break;
    case 'type5':
      ivoryVolume = '';
      break;
    default:
      ivoryVolume = 'Not available';
  }

  res.render('ivory-volume', {
    'ivoryVolume': ivoryVolume,
    backUrl: 'description'
  })


})


router.post('/ivory-volume', function(req, res) {
  res.redirect('are-you-the-owner');
})






//*****************************************************
// ARE YOU THE OWNER
router.get('/are-you-the-owner', function(req, res) {
  res.render('are-you-the-owner', {
    backUrl: 'description'
  });
})

router.post('/are-you-the-owner', function(req, res) {
  logger(req, 'Owner='+req.session.data['ownerAgent']);

  if (req.session.data['ownerAgent']=='owner') {
    logger(req, "It's the owner, so go down the owner route.")
    res.redirect('owner-name');
  } else {
    logger(req, "It's the agent, so go down the owner route.")
    res.redirect('agent-name');
  }
})


//*****************************************************
// AGENT-NAME
router.get('/agent-name', function(req, res) {
  res.render('agent-name', {
    backUrl: 'are-you-the-owner'
  });
})

router.post('/agent-name', function(req, res) {
  res.redirect('agent-address');
})

//*****************************************************
//ADD-PHOTOGRAPH
router.get('/add-photograph-1', function(req, res) {
  res.render('add-photograph-1');
})

router.post('/add-photograph-1', function(req, res) {
  console.log('DEBUG.routes.add-photograph-1.post: ' + req.session.data['photograph']);
  res.redirect('add-description-1');
})

//*****************************************************
//ADD-DESCRIPTION
router.get('/add-description-1', function(req, res) {
  res.render('add-description-1');
})

router.post('/add-description-1', function(req, res) {
  console.log('DEBUG.routes.add-description-1.post: ' + req.session.data['description']);
  res.redirect('owner-name-1');
})


//*****************************************************
//OWNER-NAME
router.get('/owner-name', function(req, res) {
  res.render('owner-name', {
    backUrl: 'are-you-the-owner'
  });
})

router.post('/owner-name', function(req, res) {
  res.redirect('owner-address');
})

//*****************************************************
//OWNER-ADDRESS
router.get('/owner-address', function(req, res) {
  res.render('owner-address', {
    backUrl: 'owner-name'
  });
})

router.post('/owner-address', function(req, res) {
  res.redirect('owner-contact');
})


//*****************************************************
//OWNER-CONTACT
router.get('/owner-contact', function(req, res) {
  res.render('owner-contact', {
    backUrl: 'owner-address'
  });
})

router.post('/owner-contact', function(req, res) {
  res.redirect('check-your-answers');
})



//*****************************************************
//CHECK YOUR ANSWERS
router.get('/check-your-answers', function(req, res) {
  logger(req);

  var exemptionTypeChosen;

  switch (req.session.data['exemptionChoice']) {
    case 'type1':
      exemptionTypeChosen = exemptionTypeText1;
      break;
    case 'type2':
      exemptionTypeChosen = exemptionTypeText2;
      break;
    case 'type3':
      exemptionTypeChosen = exemptionTypeText3;
      break;
    case 'type4':
      exemptionTypeChosen = exemptionTypeText4;
      break;
    case 'type5':
      exemptionTypeChosen = exemptionTypeText5;
      break;
    default:
      exemptionTypeChosen = 'Not available';
  }

  res.render('check-your-answers', {
    exemptionTypeChosen: exemptionTypeChosen,
    backUrl: 'owner-contact'
  })
})

router.post('/check-your-answers', function(req, res) {
  res.redirect('');
})









//*****************************************************
//CONFIRMATION
router.get('/confirmation-1', function(req, res) {
  res.render('confirmation-1');
})






//////////////////////////////////////////////////////////////////////////////
// NOTIFY
router.post('/notify', function(req, res) {
  console.log('DEBUG.routes.notify');


  if (req.session.data['email']) {
    console.log('DEBUG.routes.notify.email: ' + req.session.data['email'])
    SendNotifyEmail(req.session.data['email']);
  } else {
    console.log('DEBUG.routes.notify.email is null');
  }

  if (req.session.data['telephoneNumber']) {
    console.log('DEBUG.routes.notify.telephoneNumber: ' + req.session.data['telephoneNumber'])
    SendNotifySMS(req.session.data['telephoneNumber']);
  } else {
    console.log('DEBUG.routes.notify.email is null');
  }

  res.render('notify-confirm', {
    'emailAddress': req.session.data['email'],
    'telephoneNumber': req.session.data['telephoneNumber']
  })
})



function SendNotifyEmail(emailAddress) {
  console.log('DEBUG.routes.SendNotifyEmail: ' + emailAddress);
  //SETUP
  var apiKey = process.env.GOVUK_NOTIFY_API_KEY;
  var NotifyClient = require('notifications-node-client').NotifyClient,
    notifyClient = new NotifyClient(apiKey);

  //SEND MESSAGE - EMAIL
  var templateId = '67a4de78-d063-4593-976f-7ad8112c30ab';

  notifyClient.sendEmail(templateId, emailAddress, {
      personalisation: {
        submissionId: "TEST"
      }
    })
    .then(res => console.log(res))
    .catch(err => console.error(err));
}


function SendNotifySMS(telephoneNumber) {
  console.log('DEBUG.routes.SendNotifySMS: ' + telephoneNumber);
  //SETUP
  var apiKey = process.env.GOVUK_NOTIFY_API_KEY;
  var NotifyClient = require('notifications-node-client').NotifyClient,
    notifyClient = new NotifyClient(apiKey);

  //SEND MESSAGE - EMAIL
  var templateId = 'a5d109c5-ddcb-44b9-ab7d-f921f6b024be';

  notifyClient.sendSms(templateId, telephoneNumber, {
      personalisation: {
        submissionId: "TEST"
      }
    })
    .then(res => console.log(res))
    .catch(err => console.error(err));
}


//////////////////////////////////////////////////////////////////////////////
// PAY
router.post('/pay', function(req, res) {
  console.log('DEBUG.routes.pay');

  res.redirect('https://products.payments.service.gov.uk/pay/afdf0ef4129a4e1db99af61e392a709f')

  //res.redirect(process.env.GOVUK_PAY_PROTOTYPE_LINK);
})




//*****************************************************
// ADDRESS-POSTCODE
router.post('/address-postcode', function(req, res) {
  console.log('DEBUG.routes.address-postcode.post: ' + req.session.data['address-name-number'] + ' and ' + req.session.data['postcode']);
  res.redirect('address-select');
})

//*****************************************************
// ADDRESS-SELECT
router.post('/address-select', function(req, res) {
  console.log('DEBUG.routes.address-select.post: ' + req.session.data['addressSelect']);
  res.redirect('address-confirm');
})


//////////////////////////////////////////////////////////////////////////////
// ACCESS UPLOADED IMAGES
router.get("/routeToTempImage", (req, res) => {
  console.log('DEBUG.routes ' + req.method + req.route.path);
  res.sendFile(path.join(__dirname, "./uploads/image.png"));
});

router.get("/routeToUploadedImage/:imageId", (req, res) => {
  console.log('DEBUG.routes ' + req.route.path + ', imageId=' + req.params.imageId);
  res.sendFile(path.join(__dirname, "./uploads/" + req.params.imageId + '.png'));
});






module.exports = router
