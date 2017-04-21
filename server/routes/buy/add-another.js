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

      // Save user in object
      function Licence(firstName, lastName, dob, contact, address, licenceType, licenceLength, validFrom, NumberOfRods, cost) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.contact = contact;
        this.address = address;
        this.licenceType = licenceType;
        this.licenceLength = licenceLength;
        this.validFrom = validFrom;
        this.NumberOfRods = NumberOfRods;
        this.cost = cost;
      }
      //var userOne = new Licence("John", "Doe", 01 April 2017, 0770 123 123);

      // Clear session

      //request.session.firstName.clear





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
