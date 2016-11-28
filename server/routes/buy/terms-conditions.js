const handlers = {
  get: function (request, reply) {
    return reply.view('terms-conditions', {
      pageTitle: 'Licence conditions',
      errorMessage: 'You must agree to the terms and conditions to continue',
    })
  },
  post: function (request, reply) {
    return reply.redirect('../pay/enter-card-details')
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
