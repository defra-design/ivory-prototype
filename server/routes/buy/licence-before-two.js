const handlers = {
  get: function (request, reply) {
    return reply.view('licence-before-two', {
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
      items1: {
        two: {
          text: 'Renew my licence',
          name: 'choose_upgrade',
          id: 'Renew_my_licence',
          value: 'Renew_my_licence',
        },
        one: {
          text: 'Upgrade my licence',
          name: 'choose_upgrade',
          id: 'Upgrade_my_licence',
          value: 'Upgrade_my_licence',
        },
      },
      items2: {
        one: {
          text: 'Buy a new 12-month licence',
          name: 'choose_licence',
          id: 'Buy_a_new_12_month_licence',
          value: 'Buy_a_new_12_month_licence',
        },
        two: {
          text: 'Buy a new short term licence',
          name: 'choose_licence',
          id: 'Buy_a_new_short_term_licence',
          value: 'Buy_a_new_short_term_licence',
        },
      },
    })
  },
  post: function (request, reply) {
    returnURL = request.query.returnUrl
    var licenceBefore = request.payload.licence_before
    var licenceOption = request.payload.choose_licence
    if (licenceBefore === 'Yes') {
      request.session.isUpgrade === true
      return reply.redirect('dob-postcode-check')
    } else if (licenceOption === 'Buy a new 12-month licence') {
      request.session.isFull === true
      return reply.redirect('name')
    } else {
      request.session.isFull === false
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
