
const handlers = {
  get: function (request, reply) {
    return reply.view('contact-one', {
      pageTitle: 'Can we send you your licence details?',
      errorMessage: 'Can we send you your licence details?',
      email: request.session.email,
      mobile: request.session.mobile,
      is365Contact: request.session.is365Contact,
    })
  },
  post: function (request, reply) {
    request.session.email = request.payload.email
    request.session.mobile = request.payload.mobile

    if (!request.payload.email && !request.payload.mobile) {
        request.session.noContact = true
    }
    if (request.payload.email && request.payload.mobile) {
        request.session.hasBothContact = true
    }
      return reply.redirect('contact-three')
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/contact-one',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/contact-one',
  config: {
    handler: handlers.post
  }
}]
