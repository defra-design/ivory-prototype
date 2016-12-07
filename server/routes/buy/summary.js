const handlers = {
  get: function (request, reply) {


    // Calculate cost
    if (request.session.licenceType === 'Trout and coarse') {

      // disabled

      // Senior

      // Number of Rods

      if (request.session.licenceLength === '1-day') {
        request.session.cost = "£3.75"
      } else if (request.session.licenceLength === '8-days (These licences are valid for 8 consecutive days)'){
        request.session.cost = "£10.00"
      } else {
        request.session.cost = "£27.00"
      }
    } else {
      if (request.session.licenceLength === '1-day') {
        request.session.cost = "£8.00"
      } else if (request.session.licenceLength === '8-days (These licences are valid for 8 consecutive days)') {
        request.session.cost = "£23.00"
      } else {
        request.session.cost = "£72.00"
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
