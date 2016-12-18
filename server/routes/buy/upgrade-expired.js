const handlers = {
  get: function (request, reply) {
    return reply.view('upgrade-expired', {
      pageTitle: 'Your upgrade period has expired',
      errorMessage: 'Tell us what you\'d like to do',
      licenceNumber: request.session.licenceNumber,
      licenceType: request.session.licenceType,
      nameOnLicence: request.session.holderName,
      endDate: request.session.endDate,
      items: {
          one: {
            text: 'Buy a new licence',
            name: 'licence_details_upgrade',
            id: 'new_licence',
          },
          two: {
            text: 'Change personal details',
            name: 'licence_details_upgrade',
            id: 'Change_details',
          },
        }
    })
  },
  post: function (request, reply) {
    var upgradeOption = request.payload.licence_details_upgrade

    if(upgradeOption === 'new_licence') {
      return reply.redirect('name')
    } else {
      request.session.isUpgrade = true
      return reply.redirect('summary')
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
