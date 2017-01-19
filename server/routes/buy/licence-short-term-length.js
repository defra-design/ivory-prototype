const handlers = {
  get: function (request, reply) {
    request.session.oldPrice = true;
    return reply.view('licence-short-term-length', {
      pageTitle: 'How long do you want your licence to last?',
      errorMessage: 'Choose a licence length',
      items: {
          one: {
            text: '1 day',
            name: 'licence_length',
            id: '1-day',
          },
          two: {
            text: '8 days',
            name: 'licence_length',
            id: '8-days (These licences are valid for 8 consecutive days)',
            value: '8-days',
            selectedText: '8-day licences are valid for 8 consecutive days',
          },
          three: {
            text: '12 months',
            name: 'licence_length',
            id: '365-days',
            value: '365-days',
            //selectedText: 'A 12-month licence is not available for the start date of you selected. We will amend the date to 1 April 2017',
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
