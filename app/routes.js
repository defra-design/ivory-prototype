const express = require('express')
const router = express.Router()

registerTypeText1 = 'Pre-digital animation characters'
registerTypeText2 = 'Digital animation characters'
registerTypeText3 = 'Pixar characters'
registerTypeText4 = 'Star Wars characters'

exemptionTypeText1 = 'Less than 10% ivory, pre-1918'
exemptionTypeText2 = 'Musical instrument, less than 20% ivory, pre-1975'
exemptionTypeText3 = 'Portrait miniature'
exemptionTypeText4 = 'To be acquired by a museum'
exemptionTypeText5 = 'Rarest and most important, pre-1918'

// Add your routes here - above the module.exports line

//*****************************************************
// START-REGISTRATION
router.get('/start-registration', function(request, response) {
  console.log('DEBUG.routes.start-registration.get');

  request.session.destroy(function(err) {
    if (err) {
      console.log(err);
    }
    console.log('DEBUG.routes.start-registration.get: previous session destroyed');
  })

  response.redirect('register-type');
})


// START-PROTOTYPE_1
router.get('/start-prototype_1', function(request, response) {
  console.log('DEBUG.routes.start-prototype_1.get');

  request.session.destroy(function(err) {
    if (err) {
      console.log(err);
    }
    console.log('DEBUG.routes.start-prototype_1.get: previous session destroyed');
  })

  response.redirect('choose-exemption-1');
})


//*****************************************************
//DOUBLE-CHECK
router.get('/double-check-1', function(request, response) {
  response.render('double-check-1');
})

router.post('/double-check-1', function(request, response) {
  console.log('DEBUG.routes.double-check-1.post: ' + request.session.data['doubleCheck']);


  switch (request.session.data['doubleCheck']) {
    case 'buy':
      response.redirect('buying-ivory-1');
      break;
    case 'sell':
    response.redirect('choose-exemption-1');
      break;
    default:
    response.redirect('choose-exemption-1');
  }

})

//*****************************************************
//CHOOSE-EXEMPTION
router.get('/choose-exemption-1', function(request, response) {
  response.render('choose-exemption-1');
})

router.post('/choose-exemption-1', function(request, response) {
  console.log('DEBUG.routes.choose-exemption-1.post: ' + request.session.data['chooseExemption']);
  response.redirect('add-title-1');
})


//*****************************************************
//ADD-TITLE
router.get('/add-title-1', function(request, response) {
  response.render('add-title-1');
})

router.post('/add-title-1', function(request, response) {
  console.log('DEBUG.routes.add-title-1.post: ' + request.session.data['addTitle']);
  response.redirect('add-photograph-1');
})


//*****************************************************
//ADD-PHOTOGRAPH
router.get('/add-photograph-1', function(request, response) {
  response.render('add-photograph-1');
})

router.post('/add-photograph-1', function(request, response) {
  console.log('DEBUG.routes.add-photograph-1.post: ' + request.session.data['addPhotograph']);
  response.redirect('add-description-1');
})


//*****************************************************
//OWNER-NAME
router.get('/owner-name-1', function(request, response) {
  response.render('owner-name-1');
})

router.post('/owner-name-1', function(request, response) {
  console.log('DEBUG.routes.owner-name-1.post: ' + request.session.data['ownerName']);
  response.redirect('owner-address-1');
})

















//*****************************************************
//REGISTER-TYPE
router.get('/register-type', function(request, response) {
  response.render('register-type');
})

router.post('/register-type', function(request, response) {
  console.log('DEBUG.routes.register-type.post: ' + request.session.data['registerType']);
  response.redirect('register-name');
})

//*****************************************************
// REGISTER-NAME
router.get('/register-name', function(request, response) {
  response.render('register-name')
})

router.post('/register-name', function(request, response) {
  console.log('DEBUG.routes.register-name.post: ' + request.session.data['firstName'] + ' ' + request.session.data['lastName']);
  response.redirect('item-detail')
})

//*****************************************************
// ITEM DETAIL
router.get('/item-detail', function(request, response) {
  response.render('item-detail')
})

router.post('/item-detail', function(request, response) {
  console.log('DEBUG.routes.item-detail.post: ' + request.session.data['characterTitle'] + ', ' + request.session.data['characterDescription']);
  response.redirect('upload')
})

//*****************************************************
// UPLOAD
router.get('/upload', function(request, response) {
  response.render('upload')
})

router.post('/upload', function(request, response) {
  console.log('DEBUG.routes.upload.post');
  response.redirect('check-answers')
})


//*****************************************************
// CHECK-ANSWERS
router.get('/check-answers', function(request, response) {

  console.log('DEBUG.routes.check-answers');

  var registerTypeChosen;

  switch (request.session.data['registerType']) {
    case 'type1':
      registerTypeChosen = registerTypeText1;
      break;
    case 'type2':
      registerTypeChosen = registerTypeText2;
      break;
    case 'type3':
      registerTypeChosen = registerTypeText3;
      break;
    case 'type4':
      registerTypeChosen = registerTypeText4;
      break;
    default:
      registerTypeChosen = 'undefined';
  }

  response.render('check-answers', {
    'registerTypeChosen': registerTypeChosen
  })
})

router.post('/check-answers', function(request, response) {
  //response.redirect('https://products.payments.service.gov.uk/pay/a6557cf40b3045538e99c4b27ebb1559')
  response.redirect('register-complete')

})


//*****************************************************
// REGISTER
router.get('/register-complete', function(request, response) {

  console.log('DEBUG.routes.register-complete.get');

  const dbOwner = require('./postgres/dbOwner');
  var client = dbOwner.getOwnerClient();
  var submission_id1;
  client.connect();

  //Insert new owner
  client.query('INSERT INTO owner(name, address_postcode) VALUES ($1, $2) RETURNING owner_id', [request.session.data['firstName'] + ' ' + request.session.data['lastName'], 'TESTCODE'], (err, res) => {
    if (err) {
      console.log(err.stack);
    }
    console.log('DEBUG.routes.register-complete.get: owner_id: ' + res.rows[0].owner_id);

    //Insert new item
    var nowDatetime;

    client.query('INSERT INTO item(owner_id, exemption_type, title, description, submitted_datetime) VALUES ($1, $2, $3, $4, $5) RETURNING submission_id', [res.rows[0].owner_id, request.session.data['registerType'], request.session.data['characterTitle'], request.session.data['characterDescription'], new Date()], (err, res) => {
      if (err) {
        console.log(err.stack);
      }
      submission_id = res.rows[0].submission_id;
      console.log('DEBUG.routes.register-complete.get: submission_id: ' + submission_id);
      client.end();

      //response.redirect('register-confirmation', {
      //'submission_id': submission_id
      //})

      response.redirect('register-confirmation?submission_id=' + submission_id)
    })
  })
})


//*****************************************************
// REGISTER-CONFIRMATION
router.get('/register-confirmation', function(request, response) {

  //Pull submission_id from the url
  var submission_id = request.query.submission_id;

  console.log('DEBUG.routes.register-confirmation.get');
  console.log('DEBUG.routes.register-confirmation.get.submission_id: ' + submission_id);

  response.render('register-confirmation', {
    'submission_id': submission_id
  })
})




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//*****************************************************
// ADMIN-LOOKUP-ITEM
router.post('/admin-lookup-item', function(request, response) {

  console.log('DEBUG.routes.admin-lookup-item');
  var submissionId = request.session.data['submissionId'];

  //If nothing is entered it will error the query, so stop
  if (submissionId == '') {
    console.log('DEBUG.routes.admin-lookup-item: no results');
    response.render('admin-lookup-item', {
      'message': 'Please enter a submission Id'
    })
  } else {

    console.log('DEBUG.routes.admin-lookup-item.submissionId: ' + submissionId);

    const dbOwner = require('./postgres/dbOwner');
    var client = dbOwner.getOwnerClient();
    client.connect();

    client.query('SELECT * FROM item LEFT JOIN owner ON item.owner_id = owner.owner_id WHERE item.submission_id=' + submissionId, (err, res) => {

      if (res.rows.length == 0) {
        console.log('DEBUG.routes.admin-lookup-item: no results');
        response.render('admin-lookup-item', {
          'message': 'No matching results'
        })
      } else {
        console.log('DEBUG.routes.admin-lookup-item.SELECT FROM...' + res.rows[0].submission_id);

        var registerTypeChosen;
        switch (res.rows[0].exemption_type) {
          case 'type1':
            registerTypeChosen = registerTypeText1;
            break;
          case 'type2':
            registerTypeChosen = registerTypeText2;
            break;
          case 'type3':
            registerTypeChosen = registerTypeText3;
            break;
          case 'type4':
            registerTypeChosen = registerTypeText4;
            break;
          default:
            registerTypeChosen = 'undefined';
        }

        response.render('admin-lookup-item2', {
          'lookupArray': res.rows,
          'registerTypeChosen': registerTypeChosen
        })
        client.end()
      }
    })
  }
})


//*****************************************************
// ADMIN-OWNER
router.get('/admin-owner', function(request, response) {

  console.log('DEBUG.routes.admin-owner');

  const pg = require('pg')
  const connectionString = 'postgresql://ivoryservice:ivoryservice@localhost:5432/ivorydb'
  const client = new pg.Client({
    connectionString: connectionString,
  })
  client.connect();

  client.query('SELECT * FROM owner', (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log('SELECT * FROM owner');
      console.log('First row...\nowner_id: %d, name: %s, address_town: %s', res.rows[0].owner_id, res.rows[0].name, res.rows[0].address_town);
    }
    client.end()

    response.render('admin-owner', {
      'ownerFieldArray': res.fields,
      'ownerArray': res.rows
    });

  })

})



//////////////////////////////////////////////////////////////////////////////
// NOTIFY
router.post('/notify', function(request, response) {
  console.log('DEBUG.routes.notify');


  if (request.session.data['email']) {
    console.log('DEBUG.routes.notify.email: ' + request.session.data['email'])
    SendNotifyEmail(request.session.data['email']);
  } else {
    console.log('DEBUG.routes.notify.email is null');
  }

  if (request.session.data['telephoneNumber']) {
    console.log('DEBUG.routes.notify.telephoneNumber: ' + request.session.data['telephoneNumber'])
    SendNotifySMS(request.session.data['telephoneNumber']);
  } else {
    console.log('DEBUG.routes.notify.email is null');
  }

  response.render('notify-confirm', {
    'emailAddress': request.session.data['email'],
    'telephoneNumber': request.session.data['telephoneNumber']
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
    .then(response => console.log(response))
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
    .then(response => console.log(response))
    .catch(err => console.error(err));
}


//////////////////////////////////////////////////////////////////////////////
// PAY
router.post('/pay', function(request, response) {
  console.log('DEBUG.routes.pay');

  response.redirect(process.env.GOVUK_PAY_PROTOTYPE_LINK);
})

//////////////////////////////////////////////////////////////////////////////
// TEST
router.get('/test', function(request, response) {

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
  //   response.render('test');
  // })

  //
  response.render('test', {
    'message': 'This is a test message'
  });

})





module.exports = router
