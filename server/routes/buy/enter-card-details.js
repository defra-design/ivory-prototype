const costCalc = require('../../lib/costs')

const handlers = {
  get: function (request, reply) {

     // Total cost
     var totalCost = costCalc.getTotalCost(request)


    return reply.view('enter-card-details', {
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
      email: request.session.email,
      premises: request.session.premises,
      street: request.session.street,
      locality: request.session.locality,
      town: request.session.town,
      postcode: request.session.postcode,
      country: request.session.country,
      totalCost: totalCost,
      user1 : global.users[0],
      user2 : global.users[1],
      user3 : global.users[2],
      user4 : global.users[3],
      count : global.users.length
    })
  },
  post: function (request, reply) {
    return reply.redirect('confirm-payment')
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/enter-card-details',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/enter-card-details',
  config: {
    handler: handlers.post
  }
}]
