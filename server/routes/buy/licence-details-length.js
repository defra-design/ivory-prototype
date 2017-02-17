const handlers = {
  get: function (request, reply) {
    return reply.view('licence-details-length', {
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
      upgradePrice: '£18.00',
      buyAgain: '£12.00',
      items: {
        one: {
          text: 'Upgrade to up to 12-month licence',
          name: 'licence_details_upgrade',
          id: '12_month',
        },
        two: {
          text: 'Buy this licence again',
          name: 'licence_details_upgrade',
          id: 'Buy_again',
        },
      },
      items2: {
        one: {
          text: 'Buy a new licence',
          name: 'licence_details_upgrade',
          id: 'Buy_new',
        },
      }
    })
  },
  post: function (request, reply) {
    var upgradeOption = request.payload.licence_details_upgrade
    if (upgradeOption === '12_month') {
      request.session.isUpgradeLength = true
      request.session.isRenew = false
      request.session.isFull = true
      request.session.licenceLength = '12-months'
      return reply.redirect('disability')
    } else if (upgradeOption === 'Buy_again') {
      // request.session.changeDetails = true
      request.session.isRenew = true
      return reply.redirect('licence-start-option')
    } else {
      return reply.redirect('licence-before')
    }
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/licence-details-length',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/licence-details-length',
  config: {
    handler: handlers.post
  }
}]
