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
    returnURL = request.query.returnUrl
    request.session.firstName = request.payload.firstName
    request.session.lastName = request.payload.lastName
    // Full name
    request.session.holderName = request.session.firstName + " " + request.session.lastName
    if (returnURL) {
      return reply.redirect(returnURL)
    } else {
      return reply.redirect('date-of-birth')
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
