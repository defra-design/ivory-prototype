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

    // Calculate age at licence start date
    var date = new Date(Date.UTC(request.session.year, request.session.month -1, request.session.day));
    var options = {
        weekday: "long", year: "numeric", month: "short", day: "numeric"
    };
    var startDate = new Date(Date.UTC(request.session.year, request.session.month -1, request.session.day));
    var birthDate = new Date(Date.UTC(request.session.birthYear, request.session.birthMonth -1, request.session.birthDay));
    var startAge = startDate.getFullYear() - birthDate.getFullYear();
    var m = startDate.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && startDate.getDate() < birthDate.getDate())) {
          startAge--;
      }

    request.session.startAge = startAge
    request.session.date = date
    request.session.startDate = date.toLocaleDateString("en-us", options)

    if (request.session.startAge < 12) {
      return reply.redirect('no-licence-required')
    } else {
      if (returnURL) {
        return reply.redirect(returnURL)
      } else {
        return reply.redirect('licence-type')
        //return reply(startDate + ' ' + request.session.age + ' ' + startAge)
      }
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
