const costCalc = require('../../lib/costs')

const handlers = {
  get: function (request, reply) {

    // Total cost
    var totalCost = costCalc.getTotalCost(request)

    return reply.view('buy-another-licence', {
      pageTitle: 'Do you want to buy another licence?',
      errorMessage: 'Tell us if you want to buy another licence',
      items: {
        one: {
          text: 'Yes',
          name: 'multibuy',
          id: 'yes',
        },
        two: {
          text: 'No',
          name: 'multibuy',
          id: 'no',
        },
      },
      totalCost: totalCost,
      isMultibuy: request.session.multibuy,
      users : global.users,
      user1 : global.users[0],
      user2 : global.users[1],
      user3 : global.users[2],
      user4 : global.users[3],
      count : global.users.length
    })
  },
  post: function (request, reply) {

    var multibuy = request.payload.multibuy
    if (multibuy === 'yes') {
      // Clear session
      request.session = {}
      request.session.multibuy = true
      return reply.redirect('licence-length')
    } else {
      request.session.multibuy = true
      return reply.redirect('terms-conditions')
    }
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/buy-another-licence',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/buy-another-licence',
  config: {
    handler: handlers.post
  }
}]
