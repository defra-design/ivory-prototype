
const handlers = {
  get: function (request, reply) {
    return reply.view('phone-number', {
      pageTitle: 'Enter your phone number',

    })
  },
  post: function (request, reply) {
    return reply.redirect('order-complete')
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/phone-number',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/phone-number',
  config: {
    handler: handlers.post
  }
}]
