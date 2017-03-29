const handlers = {
  get: function (request, reply) {

    if (request.session.licenceNumber === '00010418-3WC3JDS-B7A720') {
      request.session.renewPrice =  '£82.00'
    } else {
      request.session.renewPrice = '£12.00'
    }


    return reply.view('licence-details-renew', {
      pageTitle: 'What would you like to do?',
      errorMessage: 'Tell us what you\'d like to do',
      licenceNumber: request.session.licenceNumber,
      oldLicenceType: request.session.oldLicenceType,
      licenceType: request.session.licenceType,
      licenceLength: request.session.licenceLength,
      oldLicenceLength: request.session.oldLicenceLength,
      nameOnLicence: request.session.holderName,
      endDate: request.session.endDate,
      endText: request.session.endText,
      isJunior:  request.session.isJunior,
      isSenior: request.session.isSenior,
      hasBlueBadge: request.session.hasBlueBadge,
      hasDisabledConcession: request.session.hasDisabledConcession,
      isFull: request.session.isFull,
      isConcession: request.session.isConcession,
      oldConcession: request.session.oldConcession,
      isSalmon: request.session.isSalmon,
      isCoarse: request.session.isCoarse,
      startDate: request.session.startDate,
      startMonth: request.session.startMonth,
      startYear: request.session.startYear,
      startText: request.session.startText,
      startTime: request.session.startTime,
      renewPrice: request.session.renewPrice,
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
      return reply.redirect('product-type')
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
