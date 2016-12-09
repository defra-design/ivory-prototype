const handlers = {
  get: function (request, reply) {
    return reply.view('date-of-birth', {
      pageTitle: 'What\'s your date of birth?',
      errorMessage: 'Enter a valid date of birth',
      exampleDate: '23 3 1972',
      birthDay: request.session.birthDay,
      birthMonth: request.session.birthMonth,
      birthYear: request.session.birthYear
    })
  },
  post: function (request, reply) {
    request.session.birthDay = request.payload.birthDay
    request.session.birthMonth = request.payload.birthMonth
    request.session.birthYear = request.payload.birthYear
    // Combile address
    //request.session.dateOfBirth = request.session.birthDay + " " + request.session.birthMonth + " " + request.session.birthYear
    var date = new Date(Date.UTC(request.session.birthYear, request.session.birthMonth -1, request.session.birthDay));
    var options = {
        weekday: "long", year: "numeric", month: "short", day: "numeric"
    };
    request.session.dateOfBirth = date.toLocaleDateString("en-us", options)
    var year = request.payload.birthYear
    returnURL = request.query.returnUrl

    // if (year >= 2004) {
    //   // 12 or younger - No license needed
    //   return reply.redirect('no-licence-required')
    // } else  if (year >= 2000 && year < 2004  && request.session.licenceLength != '365-days') {
    //   // 12 to 16 and selected 1 or 8 day - upgrade License
    //   request.session.licenceLength = '365-days'
    //   request.session.isJunior = true
    //   return reply.redirect('upgrade-licence')
    // } else if (year >= 2000 && year < 2004 ) {
    //   request.session.isJunior = true
    //   return reply.redirect('name')
    // } else if (year < 2000  && request.session.licenceLength === '365-days') {
    //   // selected 12 months and over 16
    //   return reply.redirect('disability')
    // }


    // else {
      if (returnURL) {
        return reply.redirect(returnURL)
      } else {
        return reply.redirect('find-address')
      }
    // }



  }
}


module.exports = [{
  method: 'GET',
  path: '/buy/date-of-birth',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/date-of-birth',
  config: {
    handler: handlers.post
  }
}]
