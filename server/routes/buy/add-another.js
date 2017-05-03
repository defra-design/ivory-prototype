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

      function Licence(licenceNumber, firstName, lastName, holderName, dateOfBirth) {
        this.licenceNumber = request.session.licenceNumber
        this.firstName = request.session.firstName
        this.lastName = request.session.lastName
        this.holderName = request.session.holderName
        this.dateOfBirth = request.session.dateOfBirth
      }






      // Clear session
      request.session = {}

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
