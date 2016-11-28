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
    request.session.dateOfBirth = request.session.birthDay + " " + request.session.birthMonth + " " + request.session.birthYear
    var year = request.payload.birthYear
    returnURL = request.query.returnUrl

    if (year < 2000) {
      if (returnURL) {
        return reply.redirect(returnURL)
      } else {
        return reply.redirect('name')
      }
    } else {
      return reply.redirect('no-licence-required')
    }
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
