
const handlers = {
  get: function (request, reply) {
    return reply.view('email-address', {
      pageTitle: 'Enter your email address',
    })
  },
  post: function (request, reply) {
    return reply.redirect('order-complete')
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/email-address',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/email-address',
  config: {
    handler: handlers.post
  }
}]
