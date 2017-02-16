const handlers = {
  get: function (request, reply) {
    return reply.view('licence-details-renew', {
      pageTitle: 'What would you like to do?',
      errorMessage: 'Tell us what you\'d like to do',
      licenceNumber: request.session.licenceNumber,
      licenceType: request.session.licenceType,
      licenceLength: request.session.licenceLength,
      nameOnLicence: request.session.holderName,
      endDate: request.session.endDate,
      isJunior:  request.session.isJunior,
      isSenior: request.session.isSenior,
      hasBlueBadge: request.session.hasBlueBadge,
      isFull: request.session.isFull,
      isConcession: request.session.isConcession,
      isSalmon: request.session.isSalmon,
      isCoarse: request.session.isCoarse,
      startDate: request.session.startDate,
      startText: request.session.startText,
      startTime: request.session.startTime,
      buyAgain: '£82.00',
      items: {
          one: {
            text: 'Buy this licence again',
            name: 'licence_details_upgrade',
            id: 'Buy_again',
          },
          two: {
            text: 'Buy a new licence',
            name: 'licence_details_upgrade',
            id: 'Buy_new',
          },
        },
    })
  },
  post: function (request, reply) {
    var upgradeOption = request.payload.licence_details_upgrade
    if (upgradeOption === 'Buy_again') {
      request.session.isRenew = true
      return reply.redirect('licence-start-option')
    } else {
      return reply.redirect('/')
    }
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/licence-details-renew',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/licence-details-renew',
  config: {
    handler: handlers.post
  }
}]
