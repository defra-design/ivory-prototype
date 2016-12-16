const handlers = {
  get: function (request, reply) {
    return reply.view('licence-details-length', {
      pageTitle: 'Do you want to upgrade this licence to a 12 month licence?',
      errorMessage: 'Tell us what you\'d like to do',
      licenceNumber: request.session.licenceNumber,
      licenceType: request.session.licenceType,
      nameOnLicence: request.session.holderName,
      endDate: request.session.endDate,
      items: {
          one: {
            text: 'Yes',
            name: 'licence_details_upgrade',
            id: 'Yes',
          },
          two: {
            text: 'No, I want to buy a new licence',
            name: 'licence_details_upgrade',
            id: 'new_licence',
          },
        }
    })
  },
  post: function (request, reply) {
    var upgradeOption = request.payload.licence_details_upgrade

    if (upgradeOption === 'Yes') {
      request.session.licenceLength = '365-daye'
      return reply.redirect('upgraded-rods')
    } else {
      return reply.redirect('../buy')
    }

    return reply.redirect('change-details')
    return reply.redirect('upgraded-length')

  }
}

module.exports = [{
  method: 'GET',
  path: '/upgrade/licence-details-length',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/upgrade/licence-details-length',
  config: {
    handler: handlers.post
  }
}]
