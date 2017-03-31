const handlers = {
  get: function (request, reply) {
    return reply.view('licence-options', {
      pageTitle: 'What would you like to buy a new licence?',
      errorMessage: 'Tell us what you\'d like to do',
      licenceNumber: request.session.licenceNumber,
      licenceType: request.session.licenceType,
      nameOnLicence: request.session.holderName,
      endDate: request.session.endDate,
      items: {
          one: {
            text: 'Upgrade to up to 3 rods',
            name: 'licence_details_upgrade',
            id: '3_rods',
          },
          two: {
            text: 'Upgrade to salmon and sea trout licence',
            name: 'licence_details_upgrade',
            id: 'salmon_licence',
          }
        }
    })
  },
  post: function (request, reply) {

  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/licence-options',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/licence-options',
  config: {
    handler: handlers.post
  }
}]
