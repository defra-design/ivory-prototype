const handlers = {
  get: function (request, reply) {
    return reply.view('licence-before', {
      pageTitle: 'What do you want to do?',
      errorMessage: 'Tell us what you want to do',
      items: {
        one: {
          text: 'Buy a new 12-month licence',
          name: 'what_to_do',
          id: 'Buy a new 12-month licence',
          value: 'Buy_a_new_12_month_licence',
        },
        two: {
          text: 'Buy a new short term licence',
          name: 'what_to_do',
          id: 'Buy a new short term licence',
          value: 'Buy_a_new_short_term_licence',
        },
      },
      items2: {
        three: {
          text: 'Renew my licence',
          name: 'what_to_do',
          id: 'Renew my licence',
          value: 'renew_a_licence',
        },
        four: {
          text: 'Upgrade my licence',
          name: 'what_to_do',
          id: 'Upgrade my licence',
          value: 'Upgrade_a_licence',
        },
      }
    })
  },
  post: function (request, reply) {
    returnURL = request.query.returnUrl
    var whatToDo = request.payload.what_to_do

    if (whatToDo === 'Buy a new 12-month licence') {
      request.session.isFull = true
      request.session.licenceLength = '365-days'
      return reply.redirect('name')
    } else if (whatToDo === 'Buy a new short term licence') {
      return reply.redirect('name')
    } else if (whatToDo === 'Upgrade my licence') {
      request.session.isUpgrade = true
      return reply.redirect('find-a-licence')
    } else if (whatToDo === 'Renew my licence') {
      request.session.isUpgrade = true
      return reply.redirect('find-a-licence')
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
