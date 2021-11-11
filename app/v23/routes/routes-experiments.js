const express = require('express')
const router = express.Router()

const multer = require('multer')
const path = require('path')
const fs = require('fs')

// Set the views with a relative path (haven't yet found a better way of doing this yet)
const viewsFolder = __dirname + '/../views/experiments/'

/// ///////////////////////////////////////////////////////////////////////////
// LOGGER
function logger (req, msg) {
  if (!msg) { msg = '' }
  // if (!req) { req = '' }
  console.log('DEBUG.routes ' + req.method + req.route.path + ': ' + msg)
}

// ENTER ROUTES HERE...

/// ///////////////////////////////////////////////////////////////////////////
// TEST
router.get('/test', function (req, res) {
  logger(req, 'Test message')

  var imageName = new Date().getTime().toString() + '.png' // getTime() gives the milliseconds since 1970...
  const targetPath = path.join(__dirname, './uploads/', imageName)
  logger(req, 'targetPath=' + targetPath)

  //
  // var randomNumber = Math.floor(Math.random() * 1000000001);
  // logger(req, 'randomNumber = '+randomNumber)

  res.render(viewsFolder + 'test', {
    'message': 'This is a test message'
  })
})

//* ****************************************************
// ADDRESS-POSTCODE
router.get('/address-postcode', function (req, res) {
  logger(req)
  res.render(viewsFolder + 'address-postcode')
})

router.post('/address-postcode', function (req, res) {
  console.log('DEBUG.routes.address-postcode.post: ' + req.session.data['address-name-number'] + ' and ' + req.session.data['postcode'])
  res.redirect('address-select')
})

//* ****************************************************
// ADDRESS-SELECT
router.get('/address-select', function (req, res) {
  logger(req)
  res.render(viewsFolder + 'address-select')
})

router.post('/address-select', function (req, res) {
  console.log('DEBUG.routes.address-select.post: ' + req.session.data['addressSelect'])
  res.redirect('address-confirm')
})

//* ****************************************************
// ADDRESS-CONFIRM
router.get('/address-confirm', function (req, res) {
  logger(req)
  res.render(viewsFolder + 'address-confirm')
})

router.post('/address-select', function (req, res) {
  console.log('DEBUG.routes.address-select.post: ' + req.session.data['addressSelect'])
  res.redirect('address-confirm')
})

/// ///////////////////////////////////////////////////////////////////////////
// NOTIFY
router.get('/notify', function (req, res) {
  logger(req)

  res.render(viewsFolder + 'notify')
})

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

  res.render(viewsFolder + 'notify-confirm', {
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


/// ///////////////////////////////////////////////////////////////////////////
// END OF ROUTES

module.exports = router
