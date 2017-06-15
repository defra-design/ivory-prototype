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

    request.session.hasNINumber = false
    request.session.hasBlueBadge = false
    request.session.hasDisabledConcession = false
    request.session.isSenior = false
    request.session.isJunior = false

    // Calculate age
    var dob = new Date(Date.UTC(request.session.birthYear, request.session.birthMonth -1, request.session.birthDay));
    var options = {
        day: "numeric", month: "long", year: "numeric"
    };

    request.session.dateOfBirth = dob.toDateString("en-us", options)
    var today = new Date();
    var birthDate = new Date(Date.UTC(request.session.birthYear, request.session.birthMonth -1, request.session.birthDay));
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
      }

    request.session.age = age



    if (returnURL) {
      return reply.redirect(returnURL)
    } else {
      if (request.session.age < 12) {
        return reply.redirect('no-licence-required')
        //return reply.redirect('find-address')
      } else if (request.session.age < 17) {
        request.session.licenceLength = '12-months'
        request.session.isJunior = true
        request.session.isSenior = false

        var date = new Date();
        var options = {
            day: "numeric", month: "long", year: "numeric"
        };

        request.session.startDate = date.toDateString("en-us", options)
        //return reply.redirect('find-address')
        return reply.redirect('upgrade-licence')
      } else if (request.session.age > 65) {
          request.session.isSenior = true
          request.session.isJunior = false
          return reply.redirect('find-address')
        }
        else {
          request.session.isSenior = false
          request.session.isJunior = false
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
