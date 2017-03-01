const handlers = {
  get: function (request, reply) {
    return reply.view('renew-or-upgrade-licence', {
      pageTitle: 'What do you want to do?',
      errorMessage: 'Tell us what you want to do',
      items: {
        three: {
          text: 'Renew a licence',
          name: 'what_to_do',
          id: 'Renew a licence',
          value: 'renew_a_licence',
        },
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
      return reply.redirect('name')
    } else if (whatToDo === 'Buy a new 8-day licence') {
      request.session.isFull = false
      request.session.licenceLength = '8-days'
      request.session.isConcession = false
      return reply.redirect('name')
    } else if (whatToDo === 'Buy a new 1-day licence') {
      request.session.isFull = false
      request.session.licenceLength = '1-day'
      request.session.isConcession = false
      return reply.redirect('name')
    } else {
      return reply.redirect('find-a-licence')
    }

  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/renew-or-upgrade-licence',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/renew-or-upgrade-licence',
  config: {
    handler: handlers.post
  }
}]
