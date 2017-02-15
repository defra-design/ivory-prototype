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
          text: 'Renew a licence',
          name: 'choose_upgrade',
          id: 'Renew a licence',
          value: 'Renew_a_licence',
        },
        one: {
          text: 'Upgrade a licence',
          name: 'choose_upgrade',
          id: 'Upgrade a licence',
          value: 'Upgrade_a_licence',
        },
      },
      items2: {
        one: {
          text: 'Buy a new 12-month licence',
          name: 'choose_licence',
          id: 'Buy a new 12-month licence',
          value: 'Buy_a_new_12_month_licence',
        },
        two: {
          text: 'Buy a new 8-day licence',
          name: 'choose_licence',
          id: 'Buy a new 8-day licence',
          value: 'Buy_a_new_8_day_licence',
        },
        three: {
          text: 'Buy a new 1-day licence',
          name: 'choose_licence',
          id: 'Buy a new 1-day licence',
          value: 'Buy_a_new_1_day_licence',
        },
      },
    })
  },
  post: function (request, reply) {
    returnURL = request.query.returnUrl
    var licenceBefore = request.payload.licence_before
    var licenceOption = request.payload.choose_licence
    choose_upgrade = request.payload.choose_upgrade
    choose_licence = request.payload.choose_licence

    if (licenceBefore === 'Yes') {
      request.session.isUpgrade = true
      //return reply('Yes')
      if (choose_upgrade === 'Renew a licence') {
        return reply.redirect('find-a-licence')
      } else {
        return reply.redirect('find-a-licence')
      }
    } else {
      //request.session.isFull === false
      //return reply('No')
      if (choose_licence === 'Buy a new 12-month licence') {
        request.session.isFull = true
        request.session.licenceLength = '12-months'
        request.session.haveTime = true
        return reply.redirect('name')
      } else if (choose_licence === 'Buy a new 8-day licence')  {
        request.session.isFull = false
        request.session.licenceLength = '8-days'
        request.session.haveTime = false
        request.session.concession = false
        return reply.redirect('name')
      } else if (choose_licence === 'Buy a new 1-day licence')  {
        request.session.isFull = false
        request.session.licenceLength = '1-day'
        request.session.haveTime = false
        request.session.concession = false
        return reply.redirect('name')
      }
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
