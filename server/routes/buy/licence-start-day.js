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

    // Calculate start date
    var date = new Date(Date.UTC(request.session.year, request.session.month -1, request.session.day));
    request.session.date = date
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    var n = month[date.getMonth()];
    request.session.startDate = date.getUTCDate()
    request.session.startMonth = n
    request.session.startYear = date.getFullYear()


      if (returnURL) {
        return reply.redirect(returnURL)
      } else {
        if (request.session.isRenew === true) {
          if (request.session.haveTime === true) {
            return reply.redirect('summary')
          } else {
            return reply.redirect('licence-start-time')
          }
        }
        else if (request.session.isUpgrade === true || request.session.isUpgradeLength === true) {
          return reply.redirect('summary')
        } else if (request.session.haveTime === true) {
            return reply.redirect('contact')
        } else {
          return reply.redirect('licence-start-time')
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
