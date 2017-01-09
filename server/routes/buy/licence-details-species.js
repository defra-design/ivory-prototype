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
            text: 'Upgrade to Salmon and sea trout licence',
            name: 'licence_details_upgrade',
            id: 'salmon_licence',
          }
        }
    })
  },
  post: function (request, reply) {
    var upgradeOption = request.payload.licence_details_upgrade

    if (upgradeOption === '3_rods') {
      request.session.numberOfRods = '3'
      request.session.cost = 'Show reduced cost'
      request.session.isUpgrade = true
      return reply.redirect('summary')
    } else if (upgradeOption === 'salmon_licence') {
      request.session.licenceType = 'Salmon and sea trout'
      request.session.numberOfRods ='1 rod (or up to 3 rods for trout and coarse fish)'
      request.session.cost = 'Show reduced cost'
      request.session.isUpgrade = true
    return reply.redirect('summary')
    } else {
      request.session.changeDetails = true
      return reply.redirect('summary')
    }
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/licence-details-species',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/licence-details-species',
  config: {
    handler: handlers.post
  }
}]
