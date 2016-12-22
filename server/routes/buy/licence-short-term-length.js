const handlers = {
  get: function (request, reply) {
    request.session.oldPrice = true;
    return reply.view('licence-short-term-length', {
      pageTitle: 'How long do you want your licence to last?',
      errorMessage: 'Choose a licence length',
      items: {
          two: {
            text: '1 day',
            name: 'licence_length',
            id: '1-day',
          },
          three: {
            text: '8 days',
            name: 'licence_length',
            id: '8-days (These licences are valid for 8 consecutive days)',
            value: '8-days',
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
      return reply.redirect('licence-start-time')
    }
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/licence-short-term-length',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/licence-short-term-length',
  config: {
    handler: handlers.post
  }
}]
