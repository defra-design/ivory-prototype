const handlers = {
  get: function (request, reply) {
    return reply.view('date-of-birth', {
      pageTitle: 'What\'s your date of birth?',
      errorMessage: 'Enter a valid date of birth',
      exampleDate: '23 3 1972',
      items: {
        one: {
          text: 'Under 12 years old',
          name: 'licence_dob',
          id: 'Under 12',
          value: 'Under_12',
        },
        two: {
          text: 'Between 12 and 16 years old',
          name: 'licence_dob',
          id: '12 to 16',
          value: '12 to 16',
        },
        three: {
          text: 'Between 17 and 65 years old',
          name: 'licence_dob',
          id: '17 to 65',
          value: '17_to_65',
        },
        four: {
          text: '65 or over',
          name: 'licence_dob',
          id: 'Over 65',
          value: 'Over_65',
        }
      },
      birthDay: request.session.birthDay,
      birthMonth: request.session.birthMonth,
      birthYear: request.session.birthYear
    })
  },
  post: function (request, reply) {
    request.session.birthDay = request.payload.birthDay
    request.session.birthMonth = request.payload.birthMonth
    request.session.birthYear = request.payload.birthYear
    request.session.licenceDOB = request.payload.licence_dob

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
    returnURL = request.query.returnUrl
    request.session.isSenior = false
    request.session.isJunior = false

    // if (request.session.juniorDownloadQuick === true) {
    //   if (request.session.age < 12) {
    //     return reply.redirect('no-licence-required')
    //   } else {
    //     request.session.isJunior = true
    //     return reply.redirect('download-option-quick')
    //   }
    // } else {
    //   if (request.session.age < 12) {
    //     return reply.redirect('no-licence-required')
    //   } else if (request.session.age < 17) {
    //     request.session.isJunior = true
    //     request.session.licenceLength = '365-days'
    //     request.session.isFull = true;
    //     var date = new Date();
    //     var options = {
    //         weekday: "long", year: "numeric", month: "short", day: "numeric"
    //     };
    //     request.session.startDate = date.toLocaleDateString("en-us", options)
    //     //return reply.redirect('licence-type')
    //     return reply.redirect('upgrade-licence')
    //   } else {
    //     if (returnURL) {
    //       return reply.redirect(returnURL)
    //     } else {
    //       return reply.redirect('licence-start-option')
    //     }
    //   }
    // }

    if (request.session.licenceDOB === 'Under 12') {
      request.session.age = 11
      return reply.redirect('no-licence-required')
    } else if (request.session.licenceDOB === '12 to 16') {
        request.session.age = 14
        request.session.isJunior = true
        request.session.licenceLength = '365-days'
        request.session.isFull = true;
        var date = new Date();
        var options = {
            weekday: "long", year: "numeric", month: "short", day: "numeric"
        };
        request.session.startDate = date.toLocaleDateString("en-us", options)
        //return reply.redirect('licence-type')
        return reply.redirect('upgrade-licence')
    } else if (request.session.licenceDOB === '17 to 65') {
      request.session.age = 22
      return reply.redirect('licence-start-option')
    } else {
      request.session.isSenior = true
      request.session.concession = true
      request.session.age = 77
      return reply.redirect('licence-start-option')
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
