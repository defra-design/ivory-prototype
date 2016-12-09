const handlers = {
  get: function (request, reply) {

    //End dates
    // var options = {
    //     weekday: "long", year: "numeric", month: "short", day: "numeric"
    // };
    // if (request.session.licenceLength === '1 day') {
    //   var tomorrow = new Date();
    //   tomorrow.setDate(tomorrow.getDate() + 1);
    //   request.session.endDate = tomorrow.toLocaleDateString("en-us", options)
    // } else {
    //   var eightDays = new Date();
    //   eightDays.setDate(eightDays.getDate() + 8);
    //   request.session.endDate = eightDays.toLocaleDateString("en-us", options)
    // }



    // Calculate cost

    // 1 Day
    if (request.session.licenceLength === '1-day') {
      if (request.session.licenceType === 'Trout and coarse') {
        request.session.cost = "£3.75"
      } else {
        request.session.cost = "£8.00"
      }
    }

    // 8 Day
    if (request.session.licenceLength === '8-days (These licences are valid for 8 consecutive days)') {
      if (request.session.licenceType === 'Trout and coarse') {
        request.session.cost = "£10.00"
      } else {
        request.session.cost = "£23.00"
      }
    }

    // 365 Day
    if (request.session.licenceLength === '365-day') {
      // Junior
      if (request.session.startAge < 17 ) {
        request.session.cost = "00.00"
      }
      // Senior & Disabled
      if (request.session.startAge  > 65 || request.session.isDisabled === true) {
        if (request.session.licenceType === 'Trout and coarse') {
          request.session.cost = "£18.00"
        } else {
          request.session.cost = "£48.00"
        }
      // Other
      } else {
        if (request.session.licenceType === 'Trout and coarse') {
          request.session.cost = "£27.00"
        } else {
          request.session.cost = "£72.00"
        }
      }
    }
    return reply.view('summary', {
      pageTitle: 'Check your new licence details',
      nameOnLicence: request.session.holderName,
      licenceDOB: request.session.dateOfBirth,
      email: request.session.email,
      mobile: request.session.mobile ,
      address: request.session.Address,
      licenceType: request.session.licenceType,
      numberOfRods: request.session.numberOfRods,
      licenceLength: request.session.licenceLength,
      startDate : request.session.startDate,
      startTime : request.session.startTime,
      startAge :request.session.startAge,
      cost: request.session.cost,
      isJunior:  request.session.isJunior
    })
  },
  post: function (request, reply) {
    return reply.redirect('terms-conditions')
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/summary',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/summary',
  config: {
    handler: handlers.post
  }
}]
