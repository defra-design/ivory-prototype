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

// Add your routes here - above the module.exports line

// LOAD OTHER ROUTES (from separate files, as this main routes.js is getting busy)
router.use(require('./routes-internal.js'));
router.use(require('./routes-sandpit.js'));

// START-PROTOTYPE_1
router.get('/start-prototype_1', function(req, res) {
  console.log('DEBUG.routes.start-prototype_1.get');

  req.session.destroy(function(err) {
    if (err) {
      console.log(err);
    }
    console.log('DEBUG.routes.start-prototype_1.get: previous session destroyed');
  })

  res.redirect('choose-exemption-1');
})


//*****************************************************
//CHOOSE-EXEMPTION
router.get('/choose-exemption-1', function(req, res) {
  console.log('DEBUG '+req.method+req.route.path);
  res.render('choose-exemption-1')
})

router.post('/choose-exemption-1', function(req, res) {
  console.log('DEBUG '+req.method+req.route.path+':'+req.session.data['chooseExemption']);
  res.redirect('add-photograph');
})


//////////////////////////////////////////////////////////////////////////////
// ADD PHOTGRAPH
router.get('/add-photograph', function(req, res) {
  console.log('DEBUG '+req.method+req.route.path);
  res.render('add-photograph');
})

const upload = multer({
  dest: "app/uploads/temp", // temp location for the file to be placed
  limits: {
    fileSize: 8 * 1024 * 1024 // 8 MB (max file size in bytes)
  }
}).single('fileToUpload'); /* name attribute of <file> element in your form */

// router.post('/sandpit/upload-image', upload, function(req, res) {
router.post('/add-photograph', function(req, res) {
  console.log('DEBUG '+req.method+req.route.path);

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
  console.log('DEBUG '+req.method+req.route.path);
  res.render('add-photograph2');
})

router.post('/add-photograph2', function(req, res) {
  console.log('DEBUG '+req.method+req.route.path);
  res.redirect('/add-title-1');
})


//*****************************************************
//DECLARATION
router.get('/description', function(req, res) {

  console.log('DEBUG.routes.description');

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

  res.render('description', {
    'exemptionTypeChosen': exemptionTypeChosen
  })


})

router.post('/declaration', function(req, res) {
  console.log('DEBUG.routes.declaration.post: ' + req.session.data['declaration']);
  res.redirect('add-title-1');
})



//*****************************************************
//ADD-TITLE
router.get('/add-title-1', function(req, res) {
  res.render('add-title-1');
})

router.post('/add-title-1', function(req, res) {
  console.log('DEBUG.routes.add-title-1.post: ' + req.session.data['title']);
  res.redirect('description');
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
router.get('/owner-name-1', function(req, res) {
  res.render('owner-name-1');
})

router.post('/owner-name-1', function(req, res) {
  console.log('DEBUG.routes.owner-name-1.post: ' + req.session.data['ownerName']);
  res.redirect('owner-address-1');
})




//*****************************************************
//OWNER-ADDRESS
router.get('/owner-address-1', function(req, res) {
  res.render('owner-address-1');
})

router.post('/owner-address-1', function(req, res) {
  console.log('DEBUG.routes.owner-address-1.post: ' + req.session.data['addressPostcode']);
  res.redirect('contact-details-1');
})



//*****************************************************
//CONTACT-PREFERENCE
router.get('/contact-details-1', function(req, res) {
  res.render('contact-details-1');
})

router.post('/contact-details-1', function(req, res) {
  console.log('DEBUG.routes.contact-details-1.post: ' + req.session.data['email']);
  res.redirect('check-your-answers-1');
})







//*****************************************************
//DECLARATION
router.get('/check-your-answers-1', function(req, res) {

  console.log('DEBUG.routes.checkYourAnswers');

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

  res.render('check-your-answers-1', {
    'exemptionTypeChosen': exemptionTypeChosen
  })


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



//////////////////////////////////////////////////////////////////////////////
// TEST
router.get('/test', function(req, res) {

  console.log('DEBUG.routes.test');

  // const dbOwner = require('./postgres/dbOwner');
  // var client = dbOwner.getOwnerClient();
  // client.connect();
  // client.query('SELECT * FROM owner', (err, res) => {
  //   if(res.rows[0]) {
  //       console.log(res.rows[0].owner_id);
  //   } else {
  //       console.log('no results');
  //   }
  //   client.end();
  //   res.render('test');
  // })

  //
  res.render('test', {
    'message': 'This is a test message'
  });

})





module.exports = router
