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
     request.session.firstName = 'Bob'
     request.session.lastName = 'Jones'
     request.session.holderName = 'Bob Jones'
     request.session.dateOfBirth = '3 January 1974'
     request.session.email = 'bob.jones@email.com'
     request.session.mobile  = 07708123456
     request.session.Address = 'Flat 20A, Knutsford Road, Warrington WA4 1AB'
     request.session.premises = 'Flat 20A'
     request.session.street = 'Knutsford Road'
     request.session.locality = ''
     request.session.town = 'Warrington'
     request.session.postcode = 'WA4 1AB'
     request.session.country = 'England'
     request.session.licenceType = 'Coarse fish and trout'
     request.session.numberOfRods = 'Up to 2 rods'
     request.session.licenceLength = '8-days'
     request.session.startDate = '2 March 2017'
     request.session.startText = '2 March 2017'
     request.session.startTime = '2PM'
     request.session.endDate = '10 March 2017'
     // startAge :request.session.startAge,
     // cost: request.session.cost,
     return reply.redirect('licence-details-length')
   } else if (request.session.licenceNumber === '495969798') {
     request.session.firstName = 'John'
     request.session.lastName = 'Smith'
     request.session.holderName = 'John Smith'
     request.session.dateOfBirth = '1 July 1980'
     request.session.email = 'john.smith@email.com'
     request.session.mobile  = 07708123456
     request.session.Address = 'Flat 20A, Knutsford Road, Warrington WA4 1AB'
     request.session.premises = 'Flat 20A'
     request.session.street = 'Knutsford Road'
     request.session.locality = ''
     request.session.town = 'Warrington'
     request.session.postcode = 'WA4 1AB'
     request.session.country = 'England'
     request.session.licenceType = 'Coarse fish and trout'
     request.session.numberOfRods = 'Up to 2 rods'
     request.session.licenceLength = '365-days'
     request.session.startDate = '2 April 2017'
     request.session.startText = '2 April 2017'
     // startTime : request.session.startTime = '2PM'
     request.session.endDate = '2 April 2018'
     // startAge :request.session.startAge,
     // cost: request.session.cost,
     return reply.redirect('licence-details-species')
   } else {
     request.session.firstName = 'Mark'
     request.session.lastName = 'Shaw'
     request.session.holderName = 'Mark Shaw'
     request.session.dateOfBirth = '3 January 1990'
     request.session.email = 'mark.shaw@email.com'
     request.session.mobile  = 07708123456
     request.session.Address = 'Flat 20A, Knutsford Road, Warrington WA4 1AB'
     request.session.premises = 'Flat 20A'
     request.session.street = 'Knutsford Road'
     request.session.locality = ''
     request.session.town = 'Warrington'
     request.session.postcode = 'WA4 1AB'
     request.session.country = 'England'
     request.session.licenceType = 'Coarse fish and trout'
     request.session.numberOfRods = 'Up to 2 rods'
     request.session.licenceLength = '8-days'
     request.session.startDate = '12 February 2017'
     request.session.startText = '12 February 2017'
     request.session.startTime = '6PM'
     request.session.endDate = '20 March 2017'
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
