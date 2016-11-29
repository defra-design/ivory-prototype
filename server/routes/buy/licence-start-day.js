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


    returnURL = request.query.returnUrl


    // Combile time
    request.session.startDay = request.session.day + "." + request.session.month + "." + request.session.year
    // Covert to date format

    var date = new Date(Date.UTC(request.session.year, request.session.month -1, request.session.day));
    var options = {
        weekday: "long", year: "numeric", month: "short", day: "numeric"
    };
    request.session.startDay = date.toLocaleDateString("en-us", options)


    if (returnURL) {
      return reply.redirect('licence-start-time?returnUrl=/buy/summary')
    } else {
      return reply.redirect('licence-start-time')
      //return reply(request.session.startDay)
    }








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
