const handlers = {
  get: function (request, reply) {
    return reply.view('licence-length', {
      pageTitle: 'How long do you want your licence to last?',
      errorMessage: 'Choose a licence length',
      //myDate: request.session.date
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
          // three: {
          //   text: '12 months',
          //   name: 'licence_length',
          //   id: '365-days',
          //   value: '365-days',
          //   //selectedText: 'These licences are now valid for a full year from their start date and can be purchased at any time during the year.',
          // },
      }
    })
  },
  post: function (request, reply) {
    returnURL = request.query.returnUrl
    request.session.licenceLength = request.payload.licence_length

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
