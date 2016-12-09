const handlers = {
  get: function (request, reply) {
    return reply.view('licence-length', {
      pageTitle: 'How long do you want your licence to last?',
      errorMessage: 'Choose a licence length',
      items: {
          one: {
            text: '12 months',
            name: 'licence_length',
            id: '365-days',
            value: '365-days',
            selectedText: '12-month licences are now valid for 365 days from their start date and can be purchased at any time during the year.',
          },
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

    if (request.session.licenceLength === '365-days' && request.session.licenceType === 'Trout and coarse') {
      return reply.redirect('number-of-rods')
    } else if (request.session.licenceLength === '365-days') {
      return reply.redirect('disability')
    }
    else {
      if (returnURL) {
        return reply.redirect(returnURL)
      } else {
        return reply.redirect('licence-start-time')
      }
    }

    // If 12 months and
    return reply.redirect('disability')
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
