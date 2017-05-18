const costCalc = require('../../lib/costs')

const handlers = {
  get: function (request, reply) {

     // Total cost
     var totalCost = costCalc.getTotalCost(request)

    return reply.view('confirm-payment', {
      pageTitle: 'Check your new licence details',
      licenceType: request.session.licenceType,
      numberOfRods: request.session.numberOfRods,
      licenceLength: request.session.licenceLength,
      cost: request.session.cost,
      isJunior:  request.session.isJunior,
      isSenior: request.session.isSenior,
      hasBlueBadge: request.session.hasBlueBadge,
      hasDisabledConcession: request.session.hasDisabledConcession,
      hasNINumber: request.session.hasNINumber,
      isFull: request.session.isFull,
      isConcession: request.session.isConcession,
      endText : request.session.endText,
      address: request.session.Address,
      email: request.session.email,
      nameOnLicence: request.session.holderName,
      totalCost: totalCost,
      user1 : global.users[0],
      user2 : global.users[1],
      user3 : global.users[2],
      user4 : global.users[3],
      count : global.users.length,
      expiryMonth: request.session.expiryMonth,
      expiryYear: request.session.expiryYear,
      nameOnCard: request.session.nameOnCard,
      billingPremises: request.session.billingPremises,
      billingStreet: request.session.billingStreet,
      billingTown: request.session.billingTown,
      billingPostcode: request.session.billingPostcode,
    })
  },
  post: function (request, reply) {
    if(request.session.multibuy === true) {
      return reply.redirect('../buy/order-complete-multibuy')
    } else {
      return reply.redirect('../buy/order-complete')
    }

  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/confirm-payment',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/confirm-payment',
  config: {
    handler: handlers.post
  }
}]
