const handlers = {
  get: function (request, reply) {
    return reply.view('find-a-licence', {
      pageTitle: 'Find your licence',
      errorMessage: 'Enter your rod licence number',
      licence_number: request.session.licence_number,
    })
  },
  post: function (request, reply) {
    request.session.licenceNumber = request.payload.licence_number
    if (request.session.licenceNumber === 'B7A711') {
      request.session.licenceNumber = '00010418-3WC3JDS-B7A711'
      request.session.firstName = 'John'
      request.session.lastName = 'Smith'
      request.session.holderName = 'John Smith'
      request.session.dateOfBirth = '1 July 1980'
      request.session.birthDay = 1
      request.session.birthMonth = 7
      request.session.birthYear = 1980
      request.session.email = 'john.smith@email.com'
      request.session.mobile  = 07708123456
      request.session.Address = 'Flat 20A, Knutsford Road, Warrington WA4 1AB'
      request.session.premises = 'Flat 20A'
      request.session.street = 'Knutsford Road'
      request.session.locality = ''
      request.session.town = 'Warrington'
      request.session.postcode = 'WA4 1AB'
      request.session.country = 'England'
      request.session.licenceType = 'Trout and coarse'
      request.session.numberOfRods = 'Up to 2 rods'
      request.session.licenceLength = '12-months'
      request.session.startDate = '2 April 2017'
      request.session.startText = '2 April 2017'
      request.session.endDate = '2 April 2018'
      return reply.redirect('dob-postcode-check')
    } else if (request.session.licenceNumber === 'B7A712') {
      request.session.licenceNumber = '00010418-3WC3JDS-B7A712'
      request.session.firstName = 'Bob',
      request.session.lastName = 'Jones'
      request.session.holderName = 'Bob Jones'
      request.session.dateOfBirth = '3 January 1974'
      request.session.birthDay = 3
      request.session.birthMonth = 1
      request.session.birthYear = 1974
      request.session.email = 'bob.jones@email.com'
      request.session.mobile  = 07708123456
      request.session.Address = 'Flat 20A, Knutsford Road, Warrington WA4 1AB'
      request.session.premises = 'Flat 20A'
      request.session.street = 'Knutsford Road'
      request.session.locality = ''
      request.session.town = 'Warrington'
      request.session.postcode = 'WA4 1AB'
      request.session.country = 'England'
      request.session.licenceType = 'Salmon and sea trout'
      request.session.numberOfRods = '1 rod (or up to 3 rods for coarse fish)'
      request.session.licenceLength = '12-months'
      request.session.startDate = '2 March 2017'
      request.session.startText = '2 March 2017'
      request.session.startTime = '2PM'
      request.session.endDate = '2 March 2018'
      return reply.redirect('dob-postcode-check')
    } else if (request.session.licenceNumber === 'B7A713') {
      request.session.licenceNumber = '00010418-3WC3JDS-B7A713'
      request.session.firstName = 'Bob',
      request.session.lastName = 'Jones'
      request.session.holderName = 'Bob Jones'
      request.session.dateOfBirth = '3 January 1974'
      request.session.birthDay = 3
      request.session.birthMonth = 1
      request.session.birthYear = 1974
      request.session.email = 'bob.jones@email.com'
      request.session.mobile  = 07708123456
      request.session.Address = 'Flat 20A, Knutsford Road, Warrington WA4 1AB'
      request.session.premises = 'Flat 20A'
      request.session.street = 'Knutsford Road'
      request.session.locality = ''
      request.session.town = 'Warrington'
      request.session.postcode = 'WA4 1AB'
      request.session.country = 'England'
      request.session.licenceType = 'Trout and coarse'
      request.session.numberOfRods = 'up to 2 rods'
      request.session.licenceLength = '8-days'
      request.session.startDate = '2 March 2017'
      request.session.startText = '2 March 2017'
      request.session.startTime = '2PM'
      request.session.endDate = '10 March 2017'
      return reply.redirect('dob-postcode-check')
    } else if (request.session.licenceNumber === 'B7A714') {
      request.session.licenceNumber = '00010418-3WC3JDS-B7A714'
      request.session.firstName = 'John'
      request.session.lastName = 'Smith'
      request.session.holderName = 'John Smith'
      request.session.dateOfBirth = '1 July 1980'
      request.session.birthDay = 1
      request.session.birthMonth = 7
      request.session.birthYear = 1980
      request.session.email = 'john.smith@email.com'
      request.session.mobile  = 07708123456
      request.session.Address = 'Flat 20A, Knutsford Road, Warrington WA4 1AB'
      request.session.premises = 'Flat 20A'
      request.session.street = 'Knutsford Road'
      request.session.locality = ''
      request.session.town = 'Warrington'
      request.session.postcode = 'WA4 1AB'
      request.session.country = 'England'
      request.session.licenceType = 'Salmon and sea trout'
      request.session.numberOfRods = '1 rod (or up to 3 rods for coarse fish)'
      request.session.licenceLength = '1-day'
      request.session.startDate = '2 April 2017'
      request.session.startText = '2 April 2017'
      request.session.endDate = '3 April 2017'
      return reply.redirect('dob-postcode-check')
    } else if (request.session.licenceNumber === 'B7A715') {
      request.session.licenceNumber = '00010418-3WC3JDS-B7A715'
      request.session.firstName = 'Mark'
      request.session.lastName = 'Shaw'
      request.session.holderName = 'Mark Shaw'
      request.session.dateOfBirth = '3 January 1990'
      request.session.birthDay = 3
      request.session.birthMonth = 1
      request.session.birthYear = 1990
      request.session.email = 'mark.shaw@email.com'
      request.session.mobile  = 07708123456
      request.session.Address = 'Flat 20A, Knutsford Road, Warrington WA4 1AB'
      request.session.premises = 'Flat 20A'
      request.session.street = 'Knutsford Road'
      request.session.locality = ''
      request.session.town = 'Warrington'
      request.session.postcode = 'WA4 1AB'
      request.session.country = 'England'
      request.session.licenceType = 'Trout and coarse'
      request.session.numberOfRods = 'Up to 2 rods'
      request.session.licenceLength = '1-day'
      request.session.startDate = '12 February 2017'
      request.session.startText = '12 February 2017'
      request.session.startTime = '6PM'
      request.session.endDate = '13 February 2017'
      return reply.redirect('upgrade-expired')
    } else if (request.session.licenceNumber === 'B7A716') {
        request.session.licenceNumber = '00010418-3WC3JDS-B7A716'
        request.session.firstName = 'Tom'
        request.session.lastName = 'Smith'
        request.session.holderName = 'Tom Smith'
        request.session.dateOfBirth = '3 January 2004'
        request.session.birthDay = 3
        request.session.birthMonth = 1
        request.session.birthYear = 2004
        request.session.email = 'ton.smith@email.com'
        request.session.mobile  = 07708123456
        request.session.Address = 'Flat 20A, Knutsford Road, Warrington WA4 1AB'
        request.session.premises = 'Flat 20A'
        request.session.street = 'Knutsford Road'
        request.session.locality = ''
        request.session.town = 'Warrington'
        request.session.postcode = 'WA4 1AB'
        request.session.country = 'England'
        request.session.licenceType = 'Trout and coarse'
        request.session.numberOfRods = 'Up to 2 rods'
        request.session.licenceLength = '12-month'
        request.session.startDate = '12 February 2017'
        request.session.startText = '12 February 2017'
        request.session.startTime = '6PM'
        request.session.endDate = '12 February 2018'
        return reply.redirect('upgrade-expired')
    } else  {
      return reply.redirect('licence-not-found')
    }
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/find-a-licence',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/find-a-licence',
  config: {
    handler: handlers.post
  }
}]
