const handlers = {
  get: function (request, reply) {
    return reply.view('licence-start-option', {
      pageTitle: 'When would you like your licence to start?',
      errorMessage: 'Choose when you\'d like your licence to start',
      items: {
          one: {
            text: '30 minutes after payment',
            name: 'licence_start_option',
            id: 'asap',
          },
          two: {
            text: 'Another time or date',
            name: 'licence_start_option',
            id: 'absolute',
          },
      }
    })
  },
  post: function (request, reply) {
    var startOption = request.payload.licence_start_option
    returnURL = request.query.returnUrl

    if (startOption === 'asap') {
      request.session.startDate = "30 minutes after payment"
      request.session.startAge = request.session.age
      if (request.session.startAge < 12) {
        return reply.redirect('no-licence-required')
      } else {
        return reply.redirect('licence-type')
      }
    } else {
      return reply.redirect('licence-start-day')
    }
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/licence-start-option',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/licence-start-option',
  config: {
    handler: handlers.post
  }
}]
