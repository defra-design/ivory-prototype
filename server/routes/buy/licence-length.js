const handlers = {
  get: function (request, reply) {
    return reply.view('licence-length', {
      pageTitle: 'What do you want to do?',
      errorMessage: 'Tell us what you want to do',
      items: {
        one: {
          text: 'Buy a new 12-month licence',
          name: 'licence_length',
          id: '12-months',
          value: '12-months',
          selectedText: '12-month licences are now valid for 365 days from their start date and can be purchased at any time during the year.'
        },
        two: {
          text: 'Buy a new 8-day licence',
          name: 'licence_length',
          id: '8-days',
          value: '8-days',
        },
        three: {
          text: 'Buy a new 1-day licence',
          name: 'licence_length',
          id: '1-day',
          value: '1-day',
          selectedText: '1-day licences are valid for a full 24 hours from the start time that you select.'
        },
      },
    })
  },
  post: function (request, reply) {
      returnURL = request.query.returnUrl
      request.session.licenceLength = request.payload.licence_length
      if (returnURL) {
          if (request.session.licenceLength === '12-months') {
            return reply.redirect('disability?returnUrl=/buy/summary')
          } else if (request.session.licenceLength === '8-days' || request.session.licenceLength === '1-day') {
            request.session.isFull = false
            request.session.haveTime = false
            return reply.redirect('licence-start-time?returnUrl=/buy/summary')
          } else {
            return reply.redirect(returnURL)
          }
      } else {
        if (request.session.licenceLength === '12-months' || request.session.licenceLength === '12 months') {
          request.session.isFull = true
          request.session.haveTime = true
          request.session.licenceLength = '12-months'
          return reply.redirect('name')
        } else if (request.session.licenceLength === '8-days' || request.session.licenceLength === '8 days') {
          request.session.isFull = false
          request.session.haveTime = false
          request.session.licenceLength = '8-days'
          return reply.redirect('name')
        } else if (request.session.licenceLength === '1-day' || request.session.licenceLength === '1 day') {
          request.session.isFull = false
          request.session.haveTime = false
          request.session.licenceLength = '1-day'
          return reply.redirect('name')
        }
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
