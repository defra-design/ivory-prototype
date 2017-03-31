const handlers = {
  get: function (request, reply) {
    return reply.view('licence-before', {
      pageTitle: 'Have you had a licence before?',
      errorMessage: 'Tell us if you\'ve had a licence before',
      errorMessageTwo: 'Select an option',
      errorMessageThree: 'Select an option',
      items: {
        one: {
          text: 'Yes',
          name: 'licence_before',
          id: 'Yes',
          value: 'Yes',
        },
        two: {
          text: 'No',
          name: 'licence_before',
          id: 'No',
          value: 'No',
        },
      },
    })
  },
  post: function (request, reply) {
    returnURL = request.query.returnUrl
    licenceBefore = request.payload.licence_before

    if (licenceBefore === 'Yes') {
      return reply.redirect('renew-or-upgrade-licence')
    } else {
      return reply.redirect('licence-length')
    }


  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/licence-before',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/licence-before',
  config: {
    handler: handlers.post
  }
}]
