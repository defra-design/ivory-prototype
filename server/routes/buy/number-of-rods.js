const handlers = {
  get: function (request, reply) {
    return reply.view('number-of-rods', {
      pageTitle: 'How many rods would you like to licence?',
      errorMessage: 'Select number of rods',
      items: {
          one: {
            text: 'Up to 2 rods',
            name: 'number_of_rods',
            id: 'Up to 2 rods',
          },
          two: {
            text: '3 rods',
            name: 'number_of_rods',
            id: '3 rods',
          },
          three: {
            text: '4 rods',
            name: 'number_of_rods',
            id: '4 rods',
          },
      }
    })
  },
  post: function (request, reply) {
    request.session.numberOfRods = request.payload.number_of_rods
    returnURL = request.query.returnUrl
    if (returnURL) {
      return reply.redirect(returnURL)
    } else {
      return reply.redirect('licence-start-option')
    }
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/number-of-rods',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/number-of-rods',
  config: {
    handler: handlers.post
  }
}]
