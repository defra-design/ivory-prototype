const handlers = {
  get: function (request, reply) {
    return reply.view('name', {
      pageTitle: 'What\'s your name?',
      errorMessage: 'Enter your first name',
      errorMessageTwo: 'Enter your last name',
      firstName: request.session.firstName,
      lastName: request.session.lastName,
    })
  },
  post: function (request, reply) {
    request.session.firstName = request.payload.firstName
    request.session.lastName = request.payload.lastName
    // Combile address
    request.session.holderName = request.session.firstName + " " + request.session.lastName
    returnURL = request.query.returnUrl
    if (returnURL) {
      return reply.redirect(returnURL)
    } else {
      return reply.redirect('find-address')
    }
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/name',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/name',
  config: {
    handler: handlers.post
  }
}]
