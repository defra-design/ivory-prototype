const handlers = {
  get: function (request, reply) {

    return reply.view('order-complete', {
      pageTitle: 'Check your new licence details',
      nameOnLicence: request.session.holderName,
      licenceType: request.session.licenceType,
      licenceLength: request.session.licenceLength,
      numberOfRods: request.session.numberOfRods,
      startDate: request.session.startDate,
      startMonth: request.session.startMonth,
      startYear: request.session.startYear,
      endDate : request.session.endDate,
      endMonth : request.session.endMonth,
      endYear : request.session.endYear,
      endText : request.session.endText,
      isSalmon: request.session.isSalmon,
      isFull: request.session.isFull,
      isJunior:  request.session.isJunior,
      isUpgrade:  request.session.isUpgrade,
      isUpgradeLength:  request.session.isUpgradeLength,
      email: request.session.email,
      mobile: request.session.mobile,
      noContact: request.session.noContact,
      hasBothContact: request.session.hasBothContact,
      startTime: request.session.startTime,
      endTime: request.session.endTime,
      user1 : global.users[0],
      user2 : global.users[1],
      user3 : global.users[2],
      user4 : global.users[3],
    })
  },
  post: function (request, reply) {
    return reply.redirect('conditions')
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/order-complete',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/order-complete',
  config: {
    handler: handlers.post
  }
}]
