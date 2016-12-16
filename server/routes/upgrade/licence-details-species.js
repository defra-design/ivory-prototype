const handlers = {
  get: function (request, reply) {
    return reply.view('licence-details-species', {
      pageTitle: 'What would you like to do?',
      errorMessage: 'Tell us what you\'d like to do',
      licenceNumber: request.session.licenceNumber,
      licenceType: request.session.licenceType,
      nameOnLicence: request.session.holderName,
      endDate: request.session.endDate,
      items: {
          one: {
            text: 'Upgrade to 3 rods',
            name: 'licence_details_upgrade',
            id: '3_rods',
          },
          two: {
            text: 'Upgrade to salmon licence',
            name: 'licence_details_upgrade',
            id: 'salmon_licence',
          },
          three: {
            text: 'Change personal details',
            name: 'licence_details_upgrade',
            id: 'Change_details',
          },
        }
    })
  },
  post: function (request, reply) {
    var upgradeOption = request.payload.licence_details_upgrade

    if (upgradeOption === '3_rods') {
      request.session.numberOfRods = 3
      return reply.redirect('upgraded-rods')
    } else if (upgradeOption === 'salmon_licence') {
      request.session.licenceType = 'Salmon and sea trout'
    return reply.redirect('upgraded-species')
    } else {
      return reply.redirect('change-details')
    }
  }
}

module.exports = [{
  method: 'GET',
  path: '/upgrade/licence-details-species',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/upgrade/licence-details-species',
  config: {
    handler: handlers.post
  }
}]
