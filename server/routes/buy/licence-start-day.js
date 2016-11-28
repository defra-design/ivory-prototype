const handlers = {
  get: function (request, reply) {
    return reply.view('licence-start-day', {
      pageTitle: 'When would you like your licence to start? ',
      errorMessage: 'Enter a valid date that is within 28 days',
    })
  },
  post: function (request, reply) {
    request.session.day = request.payload.licence_start_day
    request.session.month = request.payload.licence_start_month
    request.session.year = request.payload.licence_start_year
    // Combile address
    request.session.startDay = request.session.day + "." + request.session.month + "." + request.session.year
    returnURL = request.query.returnUrl
    if (returnURL) {
      return reply.redirect('licence-start-time?returnUrl=/buy/summary')
    } else {
      return reply.redirect('licence-start-time')
    }

    // Covert to date format
    //request.session.startDay = new Date("2015-03-25")
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/licence-start-day',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/licence-start-day',
  config: {
    handler: handlers.post
  }
}]
