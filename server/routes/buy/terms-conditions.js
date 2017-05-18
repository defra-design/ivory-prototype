const costCalc = require('../../lib/costs')

const handlers = {
  get: function (request, reply) {

    costCalc.applyCosts(request)

    // Total cost
    var totalCost = costCalc.getTotalCost(request)


    return reply.view('terms-conditions', {
      pageTitle: 'Licence conditions',
      errorMessage: 'You must agree to the terms and conditions to continue',
      isJunior:  request.session.isJunior
    })
  },
  post: function (request, reply) {

    if (request.session.multibuy === true) {

      if (costCalc.getTotalCost(request) <= 0) {
        return reply.redirect('order-complete-multibuy')
      } else {
        return reply.redirect('../buy/enter-card-details')
      }

    } else {

      if (request.session.isJunior === true) {
        return reply.redirect('order-complete')
      } else {
        return reply.redirect('../buy/enter-card-details')
      }

    }



  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/terms-conditions',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/terms-conditions',
  config: {
    handler: handlers.post
  }
}]
