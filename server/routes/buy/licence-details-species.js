const handlers = {
  get: function (request, reply) {
    return reply.view('licence-details-species', {
      pageTitle: 'What would you like to do?',
      errorMessage: 'Tell us what you\'d like to do',
      licenceNumber: request.session.licenceNumber,
      licenceType: request.session.licenceType,
      nameOnLicence: request.session.holderName,
      endDate: request.session.endDate,
      licenceLength: request.session.licenceLength,
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

      // Pricing help
      // rodUpgrade: '£10.00 (save £20.00)',
      // salmonUpgrade: '£34.00 (save £20.00)',
      rodUpgrade: '£10.00',
      salmonUpgrade: '£34.00',
      buyAgain: '£20.00',

      items: {
          one: {
            text: 'Upgrade to up to 3 rods',
            name: 'licence_details_upgrade',
            id: '3_rods',
          },
          two: {
            text: 'Upgrade to salmon and sea trout',
            name: 'licence_details_upgrade',
            id: 'salmon_licence',
          },
          // three: {
          //   text: 'Buy this licence again',
          //   name: 'licence_details_upgrade',
          //   id: 'Buy_again',
          // },
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

    if (upgradeOption === '3_rods') {
      request.session.numberOfRods = 'Up to 3 rods'
      request.session.isUpgrade = true
      request.session.isRenew = false
      return reply.redirect('summary')
    } else if (upgradeOption === 'salmon_licence') {
      request.session.licenceType = 'Salmon and sea trout'
      request.session.numberOfRods ='1 rod (or up to 3 rods for coarse fish)'
      request.session.isUpgrade = true
      request.session.isRenew = false
    return reply.redirect('summary')
    } else if (upgradeOption === 'Buy_again') {
      // request.session.changeDetails = true
      request.session.isRenew = true
      request.session.isUpgrade = false
      return reply.redirect('licence-start-option')
    } else {
      return reply.redirect('licence-before')
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
