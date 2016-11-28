
const handlers = {
  get: function (request, reply) {
    return reply.view('contact', {
      pageTitle: 'How can we send you your licence details?',
      email: request.session.email,
      mobile: request.session.mobile
    })
  },
  post: function (request, reply) {
    request.session.email = request.payload.email
    request.session.mobile = request.payload.mobile
    returnURL = request.query.returnUrl
    if (returnURL) {
      return reply.redirect(returnURL)
    } else {
      return reply.redirect('summary')
    }
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/contact',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/contact',
  config: {
    handler: handlers.post
  }
}]
