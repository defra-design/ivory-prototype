const handlers = {
  get: function (request, reply) {
    return reply.view('upgrade-expired', {
      pageTitle: 'Your upgrade period has expired, would you like to buy a new licence?',
      errorMessage: 'Tell us what you\'d like to do',
      licenceNumber: request.session.licenceNumber,
      licenceType: request.session.licenceType,
      nameOnLicence: request.session.holderName,
      endDate: request.session.endDate,
      items: {
          one: {
            text: 'Yes',
            name: 'licence_details_upgrade',
            id: 'yes',
          },
          two: {
            text: 'No (exit service)',
            name: 'licence_details_upgrade',
            id: 'no',
          }
        }
    })
  },
  post: function (request, reply) {
    var upgradeOption = request.payload.licence_details_upgrade
    returnURL = request.query.returnUrl

    if(upgradeOption === 'yes') {
      return reply.redirect('name')
    } else {
      request.session.isUpgrade = true
      return reply.redirect('/')
    }
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/upgrade-expired',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/upgrade-expired',
  config: {
    handler: handlers.post
  }
}]
