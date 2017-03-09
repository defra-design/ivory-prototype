const handlers = {
  get: function (request, reply) {
    return reply.view('find-a-licence', {
      pageTitle: 'What\'s your licence number?',
      errorMessage: 'Enter your licence number',
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
      request.session.oldLicenceType = 'Trout and coarse'
      request.session.licenceType = 'Trout and coarse'
      request.session.isCoarse = true;
      request.session.numberOfRods = 'Up to 2 rods'
      request.session.oldLicenceLength = '12 months'
      request.session.licenceLength = '12 months'
      request.session.haveTime = true
      request.session.year =   2017
      request.session.month =  4
      request.session.day = 2
      var date = new Date(Date.UTC(request.session.year, request.session.month -1, request.session.day));
      request.session.date = date
      var month = new Array();
      month[0] = "January";
      month[1] = "February";
      month[2] = "March";
      month[3] = "April";
      month[4] = "May";
      month[5] = "June";
      month[6] = "July";
      month[7] = "August";
      month[8] = "September";
      month[9] = "October";
      month[10] = "November";
      month[11] = "December";
      var n = month[date.getMonth()];
      request.session.startDate = date.getUTCDate()
      request.session.startMonth = n
      request.session.startYear = date.getFullYear()
      request.session.startText = '2 April 2017'
      request.session.endText = '2 April 2018'
      request.session.hasDisabledConcession = true
      request.session.isFull = true
      request.session.isConcession = true
      request.session.oldConcession = 'Disabled concession'
      request.session.isCoarse = true;
      return reply.redirect('dob-postcode-check')
    }else if (request.session.licenceNumber === 'B7A711B') {
        request.session.licenceNumber = '00010418-3WC3JDS-B7A711B'
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
        request.session.oldLicenceType = 'Trout and coarse'
        request.session.licenceType = 'Trout and coarse'
        request.session.isCoarse = true;
        request.session.numberOfRods = 'Up to 2 rods'
        request.session.oldLicenceLength = '12 months'
        request.session.licenceLength = '12 months'
        request.session.haveTime = true
        request.session.year =   2017
        request.session.month =  4
        request.session.day = 2
        var date = new Date(Date.UTC(request.session.year, request.session.month -1, request.session.day));
        var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
        var n = month[date.getMonth()];
        request.session.startDate = date.getUTCDate()
        request.session.startMonth = n
        request.session.startYear = date.getFullYear()
        request.session.startText = '2 April 2017'
        request.session.endText = '2 April 2018'
        //request.session.hasDisabledConcession = false
        request.session.isFull = true
        request.session.isConcession = false
        request.session.isCoarse = true;
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
      request.session.oldLicenceType = 'Salmon and sea trout'
      request.session.licenceType = 'Salmon and sea trout'
      request.session.numberOfRods = '1 rod (or up to 3 rods for coarse fish)'
      request.session.oldLicenceLength = '12 months'
      request.session.licenceLength = '12 months'
      request.session.haveTime = true
      request.session.startDate = '2 March 2017'
      request.session.startText = '2 March 2017'
      request.session.startTime = '2PM'
      request.session.endText = '2 March 2018'
      request.session.isFull = true
      return reply.redirect('dob-postcode-check')
    } else if (request.session.licenceNumber === 'B7A713') {
      request.session.licenceNumber = '00010418-3WC3JDS-B7A713'
      request.session.firstName = 'Bob',
      request.session.lastName = 'Jones'
      request.session.holderName = 'Bob Jones'
      request.session.dateOfBirth = '3 January 1930'
      request.session.age = 87
      request.session.birthDay = 3
      request.session.birthMonth = 1
      request.session.birthYear = 1930
      request.session.isSenior = true
      request.session.email = 'bob.jones@email.com'
      request.session.mobile  = 07708123456
      request.session.Address = 'Flat 20A, Knutsford Road, Warrington WA4 1AB'
      request.session.premises = 'Flat 20A'
      request.session.street = 'Knutsford Road'
      request.session.locality = ''
      request.session.town = 'Warrington'
      request.session.postcode = 'WA4 1AB'
      request.session.country = 'England'
      request.session.oldLicenceType = 'Trout and coarse'
      request.session.licenceType = 'Trout and coarse'
      request.session.isCoarse = true;
      request.session.numberOfRods = 'up to 2 rods'
      request.session.oldLicenceLength = '8 days'
      request.session.licenceLength = '8 days'
      request.session.rodsChecked = false
      request.session.startDate = '2 March 2017'
      request.session.startText = '2 March 2017'
      request.session.endText = '10 March 2017'
      request.session.startTime = '2PM'
      request.session.isConcession = true
      request.session.oldConcession = 'Senior concession'
      return reply.redirect('dob-postcode-check')
    } else if (request.session.licenceNumber === 'B7A713B') {
      request.session.licenceNumber = '00010418-3WC3JDS-B7A713B'
      request.session.firstName = 'Billy',
      request.session.lastName = 'Jones'
      request.session.holderName = 'Bob Jones'
      request.session.dateOfBirth = '3 January 1980'
      request.session.age = 45
      request.session.birthDay = 3
      request.session.birthMonth = 1
      request.session.birthYear = 1930
      request.session.email = 'bob.jones@email.com'
      request.session.mobile  = 07708123456
      request.session.Address = 'Flat 20A, Knutsford Road, Warrington WA4 1AB'
      request.session.premises = 'Flat 20A'
      request.session.street = 'Knutsford Road'
      request.session.locality = ''
      request.session.town = 'Warrington'
      request.session.postcode = 'WA4 1AB'
      request.session.country = 'England'
      request.session.oldLicenceType = 'Trout and coarse'
      request.session.licenceType = 'Trout and coarse'
      request.session.isCoarse = true;
      request.session.numberOfRods = 'up to 2 rods'
      request.session.oldLicenceLength = '8 days'
      request.session.licenceLength = '8 days'
      request.session.rodsChecked = false
      request.session.startDate = '2 March 2017'
      request.session.startText = '2 March 2017'
      request.session.startTime = '2PM'
      request.session.endText = '10 March 2017'
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
      request.session.oldLicenceType = 'Salmon and sea trout'
      request.session.licenceType = 'Salmon and sea trout'
      request.session.numberOfRods = '1 rod (or up to 3 rods for coarse fish)'
      request.session.oldLicenceLength = '1 day'
      request.session.licenceLength = '1 day'
      request.session.rodsChecked = false
      request.session.startDate = '2 April 2017'
      request.session.startText = '2 April 2017'
      request.session.startTime = '6PM'
      request.session.endText = '3 April 2017'
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
      request.session.oldLicenceType = 'Salmon and sea trout'
      request.session.licenceType = 'Salmon and sea trout'
      request.session.isCoarse = false;
      request.session.numberOfRods = 'Up to 2 rods'
      request.session.oldLicenceLength = '12 months'
      request.session.licenceLength = '12 months'
      request.session.startDate = '12 February 2017'
      request.session.startText = '12 February 2017'
      return reply.redirect('dob-postcode-check')
    } else if (request.session.licenceNumber === 'B7A716') {
        request.session.licenceNumber = '00010418-3WC3JDS-B7A716'
        request.session.firstName = 'Tom'
        request.session.lastName = 'Smith'
        request.session.holderName = 'Tom Smith'
        request.session.dateOfBirth = '3 January 2004'
        request.session.birthDay = 3
        request.session.birthMonth = 1
        request.session.birthYear = 2004
        request.session.age = 14
        request.session.isJunior = true
        request.session.isFull = true
        request.session.cost = '£00.00'
        request.session.email = 'tom.smith@email.com'
        request.session.mobile  = 07708123456
        request.session.Address = 'Flat 20A, Knutsford Road, Warrington WA4 1AB'
        request.session.premises = 'Flat 20A'
        request.session.street = 'Knutsford Road'
        request.session.locality = ''
        request.session.town = 'Warrington'
        request.session.postcode = 'WA4 1AB'
        request.session.country = 'England'
        request.session.oldLicenceType = 'Trout and coarse'
        request.session.licenceType = 'Trout and coarse'
        request.session.haveTime = true
        request.session.numberOfRods = 'Up to 2 rods'
        request.session.oldLicenceLength = '12 month'
        request.session.licenceLength = '12 months'
        request.session.startDate = '12 February 2017'
        request.session.startText = '12 February 2017'
        request.session.startTime = '6PM'
        request.session.isFull = true
        request.session.isCoarse = true;
        request.session.isConcession = true
        request.session.haveTime = true
        return reply.redirect('dob-postcode-check')
      } else if (request.session.licenceNumber === 'B7A717') {
          request.session.licenceNumber = '00010418-3WC3JDS-B7A717'
          request.session.firstName = 'Tom'
          request.session.lastName = 'Smith'
          request.session.holderName = 'Tom Smith'
          request.session.dateOfBirth = '3 January 2004'
          request.session.birthDay = 3
          request.session.birthMonth = 1
          request.session.birthYear = 2004
          request.session.age = 14
          request.session.isJunior = true
          request.session.isFull = true
          request.session.cost = '£00.00'
          request.session.email = 'tom.smith@email.com'
          request.session.mobile  = 07708123456
          request.session.Address = 'Flat 20A, Knutsford Road, Warrington WA4 1AB'
          request.session.premises = 'Flat 20A'
          request.session.street = 'Knutsford Road'
          request.session.locality = ''
          request.session.town = 'Warrington'
          request.session.postcode = 'WA4 1AB'
          request.session.country = 'England'
          request.session.oldLicenceType = 'Trout and coarse'
          request.session.licenceType = 'Trout and coarse'
          request.session.haveTime = true
          request.session.numberOfRods = 'Up to 2 rods'
          request.session.oldLicenceLength = '12 month'
          request.session.licenceLength = '12 months'
          request.session.startDate = '12 February 2017'
          request.session.startText = '12 February 2017'
          request.session.startTime = '6PM'
          request.session.isFull = true
          request.session.isCoarse = true;
          request.session.isConcession = true
          request.session.haveTime = true
          return reply.redirect('dob-postcode-check')
        } else if (request.session.licenceNumber === 'B7A718') {
            request.session.licenceNumber = '00010418-3WC3JDS-B7A718'
            request.session.firstName = 'Tom'
            request.session.lastName = 'Smith'
            request.session.holderName = 'Tom Smith'
            request.session.dateOfBirth = '3 January 2004'
            request.session.birthDay = 3
            request.session.birthMonth = 1
            request.session.birthYear = 2004
            request.session.age = 14
            request.session.isJunior = true
            request.session.isFull = true
            request.session.cost = '£00.00'
            request.session.email = 'tom.smith@email.com'
            request.session.mobile  = 07708123456
            request.session.Address = 'Flat 20A, Knutsford Road, Warrington WA4 1AB'
            request.session.premises = 'Flat 20A'
            request.session.street = 'Knutsford Road'
            request.session.locality = ''
            request.session.town = 'Warrington'
            request.session.postcode = 'WA4 1AB'
            request.session.country = 'England'
            request.session.oldLicenceType = 'Trout and coarse'
            request.session.licenceType = 'Trout and coarse'
            request.session.haveTime = true
            request.session.numberOfRods = 'Up to 2 rods'
            request.session.oldLicenceLength = '12 month'
            request.session.licenceLength = '12 months'
            request.session.startDate = '12 February 2017'
            request.session.startText = '12 February 2017'
            request.session.startTime = '6PM'
            request.session.isFull = true
            request.session.isCoarse = true;
            request.session.isConcession = true
            request.session.haveTime = true
            return reply.redirect('dob-postcode-check')
    } else  {
      //return reply.redirect('licence-not-found')
      return reply.redirect('dob-postcode-check')
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
