const handlers = {
  get: function (request, reply) {
    return reply.view('enter-card-details', {
      pageTitle: 'Check your new licence details',
    })
  },
  post: function (request, reply) {
    return reply.redirect('confirm-payment')
  }
}

module.exports = [{
  method: 'GET',
  path: '/pay/enter-card-details',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/pay/enter-card-details',
  config: {
    handler: handlers.post
  }
}]
