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
          text: 'Buy a new 8-day licence',
          name: 'what_to_do',
          id: 'Buy a new 8-day licence',
          value: 'Buy_a_new_8_day_licence',
        },
        three: {
          text: 'Buy a new 1-day licence',
          name: 'what_to_do',
          id: 'Buy a new 1-day licence',
          value: 'Buy_a_new_1_day_licence',
        },
      },
      items2: {
        // three: {
        //   text: 'Renew a licence',
        //   name: 'what_to_do',
        //   id: 'Renew a licence',
        //   value: 'renew_a_licence',
        // },
        four: {
          text: 'Upgrade a licence',
          name: 'what_to_do',
          id: 'Upgrade a licence',
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
      request.session.licenceLength = '12-months'
      request.session.haveTime = true
      return reply.redirect('name')
    } else if (whatToDo === 'Buy a new 8-day licence') {
      request.session.isFull = false
      request.session.licenceLength = '8-days'
      request.session.haveTime = false
      request.session.isConcession = false
      return reply.redirect('name')
    } else if (whatToDo === 'Buy a new 1-day licence') {
      request.session.isFull = false
      request.session.licenceLength = '1-day'
      request.session.haveTime = false
      request.session.isConcession = false
      return reply.redirect('name')
    } else {
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
