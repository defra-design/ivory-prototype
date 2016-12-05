const handlers = {
  get: function (request, reply) {
    return reply.view('licence-length', {
      pageTitle: 'How long do you want your licence to last?',
      errorMessage: 'Choose a licence length',
      items: {
          one: {
            text: '1 day',
            name: 'licence_length',
            id: '1 day',
          },
          two: {
            text: '8 days',
            name: 'licence_length',
            id: '8 days (These licences are valid for 8 consecutive days)',
            selectedText: '8-day licences are valid for 8 consecutive days',
          },
      }
    })
  },
  post: function (request, reply) {
    request.session.licenceLength = request.payload.licence_length
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
  path: '/buy/licence-length',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/licence-length',
  config: {
    handler: handlers.post
  }
}]
