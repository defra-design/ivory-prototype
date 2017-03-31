
const handlers = {
  get: function (request, reply) {
    return reply.view('mobile-number', {
      pageTitle: 'What is your mobile number?',
      errorMessage: 'Enter your mobile number',
    })
  },
  post: function (request, reply) {
    request.session.mobile = request.payload.mobile
    request.session.noContact = false
    return reply.redirect('order-complete')
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/mobile-number',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/mobile-number',
  config: {
    handler: handlers.post
  }
}]
