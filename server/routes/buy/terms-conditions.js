const handlers = {
  get: function (request, reply) {

    return reply.view('terms-conditions', {
      pageTitle: 'Licence conditions',
      errorMessage: 'You must agree to the terms and conditions to continue',
      isJunior:  request.session.isJunior
    })
  },
  post: function (request, reply) {

    if (request.session.multibuy === true) {
      if (global.users[0].cost > 0 || global.users[1].cost > 0 || global.users[2].cost > 0 || global.users[3].cost > 0) {
        return reply.redirect('../buy/enter-card-details')
      } else {
        return reply.redirect('order-complete-multibuy')
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
