const handlers = {
  get: function (request, reply) {
    return reply.view('renew-expired', {
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
      buyAgain: '£6.00',
      items: {
        // one: {
        //   text: 'Buy this licence again',
        //   name: 'licence_details_upgrade',
        //   id: 'Buy_again',
        // },
        two: {
          text: 'Buy a new licence',
          name: 'licence_details_upgrade',
          id: 'Buy_new',
        },
        three: {
          text: 'Exit service',
          name: 'licence_details_upgrade',
          id: 'exit_service',
        },
      }
    })
  },
  post: function (request, reply) {
    var upgradeOption = request.payload.licence_details_upgrade
    returnURL = request.query.returnUrl
    if (upgradeOption === 'Buy_new') {
      return reply.redirect('licence-before')
    } else {
      return reply.redirect('/')
    }
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/renew-expired',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/renew-expired',
  config: {
    handler: handlers.post
  }
}]
