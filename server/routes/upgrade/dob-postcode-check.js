const handlers = {
  get: function (request, reply) {
    return reply.view('dob-postcode-check', {
      pageTitle: 'Find a licence',
      errorMessage: 'Enter your details',
    })
  },
  post: function (request, reply) {
    returnURL = request.query.returnUrl

   if (request.session.licenceNumber === '697989192') {
     return reply.redirect('licence-details-length')
   } else if (request.session.licenceNumber === '495969798') {
     return reply.redirect('licence-details-species')
   } else {
     return reply.redirect('upgrade-expired')
   }
  }
}

module.exports = [{
  method: 'GET',
  path: '/upgrade/dob-postcode-check',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/upgrade/dob-postcode-check',
  config: {
    handler: handlers.post
  }
}]
