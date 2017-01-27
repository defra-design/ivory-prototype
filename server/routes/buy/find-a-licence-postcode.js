const handlers = {
  get: function (request, reply) {
    return reply.view('find-a-licence-postcode', {
      pageTitle: 'Find your licence',
      errorMessage: 'Enter your details',
      birthDay: request.session.birthDay,
      birthMonth: request.session.birthMonth,
      birthYear: request.session.birthYear
    })
  },
  post: function (request, reply) {
    if (request.session.licenceNumber === 'B7A718') {
      request.session.firstName = 'David',
      request.session.lastName = 'Beckham'
      request.session.holderName = 'David Beckham'
      request.session.dateOfBirth = '3 March 1976'
      request.session.birthDay = 3
      request.session.birthMonth = 2
      request.session.birthYear = 1976
      request.session.email = 'David.Beckham@email.com'
      request.session.mobile  = 07708123379
      request.session.Address = 'Flat 20A, Knutsford Road, Warrington WA4 1AB'
      request.session.premises = 'Flat 20A'
      request.session.street = 'Knutsford Road'
      request.session.locality = ''
      request.session.town = 'Warrington'
      request.session.postcode = 'WA4 1AB'
      request.session.country = 'England'
      request.session.licenceType = 'Salmon and sea trout'
      request.session.numberOfRods = '1 rod (or up to 3 rods for coarse fish)'
      request.session.licenceLength = '8-days'
      request.session.startDate = '2 March 2017'
      request.session.startText = '2 March 2017'
      request.session.startTime = '2PM'
      request.session.endDate = '10 March 2017'
      return reply.redirect('licence-options')
    } else if (request.session.licenceNumber === 'B7A719'){
      return reply.redirect('licence-options-two')
    }
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/find-a-licence-postcode',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/find-a-licence-postcode',
  config: {
    handler: handlers.post
  }
}]
