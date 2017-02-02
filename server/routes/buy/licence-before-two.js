const handlers = {
  get: function (request, reply) {
    return reply.view('licence-before-two', {
      pageTitle: 'Have you had a licence before?',
      errorMessage: 'Tell us if you\'ve had a licence before',
      items: {
        two: {
          text: 'Renew my licence',
          name: 'licence_before',
          id: 'Renew_my_licence',
          value: 'Renew_my_licence',
        },
        one: {
          text: 'Upgrade my licence',
          name: 'licence_before',
          id: 'Upgrade_my_licence',
          value: 'Upgrade_my_licence',
        },
      },
      items2: {
        one: {
          text: 'Buy a new 12-month licence',
          name: 'licence_before',
          id: 'Buy_a_new_12_month_licence',
          value: 'Buy_a_new_12_month_licence',
        },
        two: {
          text: 'Buy a new short term licence',
          name: 'licence_before',
          id: 'Buy_a_new_short_term_licence',
          value: 'Buy_a_new_short_term_licence',
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
