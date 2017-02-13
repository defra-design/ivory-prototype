
const handlers = {
  get: function (request, reply) {
    return reply.view('email-address', {
      pageTitle: 'What is your email address?',
      errorMessage: 'Enter your email address',
    })
  },
  post: function (request, reply) {
    request.session.email = request.payload.email
    request.session.noContact = false
    return reply.redirect('contact-three')
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
