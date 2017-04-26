const handlers = {
  get: function (request, reply) {
    return reply.view('add-another', {
      pageTitle: 'Do you want to buy another licence?',
      errorMessage: 'Tell us if you want to buy another licence',
      items: {
        one: {
          text: 'Yes',
          name: 'multibuy',
          id: 'yes',
        },
        two: {
          text: 'No',
          name: 'multibuy',
          id: 'no',
        },
      }
    })
  },
  post: function (request, reply) {
    var multibuy = request.payload.multibuy
    if (multibuy === 'yes') {

      // Clear session
      //request.session = ''

      // Cear session
      request.session.licenceNumber = ''
      request.session.firstName = ''
      request.session.lastName = ''
      request.session.holderName = ''
      request.session.dateOfBirth = ''
      request.session.birthDay = ''
      request.session.birthMonth = ''
      request.session.birthYear = ''
      request.session.email = ''
      request.session.noContact = ''
      request.session.mobile  = ''
      request.session.Address = ''
      request.session.premises = ''
      request.session.street = ''
      request.session.locality = ''
      request.session.town = ''
      request.session.postcode = ''
      request.session.country = ''
      request.session.oldLicenceType = ''
      request.session.licenceType = ''
      request.session.isCoarse = ''
      request.session.numberOfRods = ''
      request.session.oldLicenceLength = ''
      request.session.licenceLength = ''
      request.session.haveTime = ''
      request.session.year = ''
      request.session.month = ''
      request.session.day = ''
      request.session.date = ''
      request.session.startDate = ''
      request.session.startMonth = ''
      request.session.startYear = ''
      request.session.startText = ''
      request.session.endText = ''
      request.session.hasDisabledConcession = ''
      request.session.isFull = ''
      request.session.isConcession = ''
      request.session.oldConcession = ''
      request.session.isCoarse = ''

      // Save user in object
      // function Licence(firstName, lastName, dob, contact, address, licenceType, licenceLength, validFrom, NumberOfRods, cost) {
      //   this.firstName = firstName;
      //   this.lastName = lastName;
      //   this.dob = dob;
      //   this.contact = contact;
      //   this.address = address;
      //   this.licenceType = licenceType;
      //   this.licenceLength = licenceLength;
      //   this.validFrom = validFrom;
      //   this.NumberOfRods = NumberOfRods;
      //   this.cost = cost;
      // }






      return reply.redirect('licence-length')
    } else {
      return reply.redirect('terms-conditions')
    }
  }
}



module.exports = [{
  method: 'GET',
  path: '/buy/add-another',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/add-another',
  config: {
    handler: handlers.post
  }
}]
