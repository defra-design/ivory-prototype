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


    if (whatToDo === 'Renew a licence') {
      request.session.isRenew= true
      return reply.redirect('find-a-licence')
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
