const handlers = {
  get: function (request, reply) {
    return reply.view('licence-length', {
      pageTitle: 'How long do you want your licence to last?',
      errorMessage: 'Choose a licence length',
      //myDate: request.session.date
      items: {
        one: {
          text: '12-months',
          name: 'licence_length',
          id: '12-months',
          value: '12-months',
          selectedText: 'These licences are now valid for a full year from their start date and can be purchased at any time during the year.',
        },
        two: {
          text: '8-days',
          name: 'licence_length',
          id: '8-days',
          value: '8-days',
          selectedText: '8-day licences are valid for 8 consecutive days',
        },
        three: {
          text: '1-day',
          name: 'licence_length',
          id: '1-day',
        },
      }
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
      if (request.session.licenceLength === '12-months') {
        request.session.isFull = true
        // request.session.licenceLength = '12-months'
        request.session.haveTime = true
        return reply.redirect('licence-start-option')
      } else if (request.session.licenceLength === '8-days') {
        request.session.isFull = false
        request.session.licenceLength = '8-days'
        request.session.haveTime = false
        return reply.redirect('licence-start-option')
      } else if (request.session.licenceLength === '1-day') {
        request.session.isFull = false
        request.session.licenceLength = '1-day'
        request.session.haveTime = false
        return reply.redirect('licence-start-option')
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
