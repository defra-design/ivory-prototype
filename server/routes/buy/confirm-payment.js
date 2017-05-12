const handlers = {
  get: function (request, reply) {
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
    })
  },
  post: function (request, reply) {
    return reply.redirect('../buy/order-complete')
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
