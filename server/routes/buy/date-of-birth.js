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
    returnURL = request.query.returnUrl
    request.session.birthDay = request.payload.birthDay
    request.session.birthMonth = request.payload.birthMonth
    request.session.birthYear = request.payload.birthYear

    // Calculate age
    var dob = new Date(Date.UTC(request.session.birthYear, request.session.birthMonth -1, request.session.birthDay));
    var options = {
        weekday: "long", year: "numeric", month: "short", day: "numeric"
    };

    request.session.dateOfBirth = dob.toLocaleDateString("en-us", options)
    var today = new Date();
    var birthDate = new Date(Date.UTC(request.session.birthYear, request.session.birthMonth -1, request.session.birthDay));
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
      }

    request.session.age = age
    request.session.isSenior = false
    request.session.isJunior = false

      if (request.session.age < 12) {
        return reply.redirect('no-licence-required')
      } else if (request.session.age < 17) {

        var date = new Date();
        var options = {
            weekday: "long", year: "numeric", month: "short", day: "numeric"
        };

        request.session.startDate = date.toLocaleDateString("en-us", options)
        //return reply.redirect('licence-type')
        return reply.redirect('upgrade-licence')
      } else {
        if (returnURL) {
          return reply.redirect(returnURL)
        } else {
          return reply.redirect('find-address')
        }
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
