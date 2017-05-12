const handlers = {
  get: function (request, reply) {

    return reply.view('order-complete-multibuy', {
      pageTitle: 'Check your new licence details',
      nameOnLicence: request.session.holderName,
      licenceType: request.session.licenceType,
      numberOfRods: request.session.numberOfRods,
      startDate : request.session.startDate,
      endDate : request.session.endDate,
      isSalmon: request.session.isSalmon,
      isFull: request.session.isFull,
      isJunior:  request.session.isJunior,
      isUpgrade:  request.session.isUpgrade,
      email: request.session.email,
      mobile: request.session.mobile,
      noContact: request.session.noContact,
      hasBothContact: request.session.hasBothContact,
      user1 : global.users[0],
      user2 : global.users[1],
      user3 : global.users[2],
      user4 : global.users[3],
      count : global.users.length
    })
  },
  post: function (request, reply) {
    return reply.redirect('conditions')
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/order-complete-multibuy',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/order-complete-multibuy',
  config: {
    handler: handlers.post
  }
}]
