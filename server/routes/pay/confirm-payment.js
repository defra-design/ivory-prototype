const handlers = {
  get: function (request, reply) {
    return reply.view('confirm-payment', {
      pageTitle: 'Check your new licence details',
    })
  },
  post: function (request, reply) {
    return reply.redirect('../buy/order-complete')
  }
}

module.exports = [{
  method: 'GET',
  path: '/pay/confirm-payment',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/pay/confirm-payment',
  config: {
    handler: handlers.post
  }
}]
