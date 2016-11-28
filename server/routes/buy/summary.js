const handlers = {
  get: function (request, reply) {
    return reply.view('summary', {
      pageTitle: 'Check your new licence details',
      nameOnLicence: request.session.holderName,
      licenceDOB: request.session.dateOfBirth,
      email: request.session.email,
      mobile: request.session.mobile ,
      address: request.session.Address,
      licenceType: request.session.licenceType,
      licenceLength: request.session.licenceLength,
      startDate : request.session.startDate,
      cost: request.session.cost,
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
