const handlers = {
  get: function (request, reply) {
    return reply.view('licence-before-two', {
      pageTitle: 'Have you had a licence before?',
      errorMessage: 'Tell us if you\'ve had a licence before',
      items: {
        one: {
          text: 'No, buy a new licence',
          name: 'licence_before',
          id: 'Buy_a_new_licence',
          value: 'Buy_a_new_licence',
        },
        two: {
          text: 'Yes, upgrade my licence',
          name: 'licence_before',
          id: 'Upgrade_a_licence',
          value: 'Upgrade_a_licence',
        },
      }
    })
  },
  post: function (request, reply) {
    returnURL = request.query.returnUrl
    var licenceBefore = request.payload.licence_before
    if (licenceBefore === 'Upgrade_a_licence') {
      return reply.redirect('find-a-licence-two')
    } else {
      return reply.redirect('name')
    }
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/licence-before-two',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/licence-before-two',
  config: {
    handler: handlers.post
  }
}]
