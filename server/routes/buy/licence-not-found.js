const handlers = {
  get: function (request, reply) {
    return reply.view('licence-not-found', {
      pageTitle: 'We can\'t find your licence details',
      errorMessage: 'Tell us what you\'d like to do',
      items: {
        two: {
          text: 'Buy a new licence',
          name: 'licence_details_upgrade',
          id: 'Buy_new',
        },
        three: {
          text: 'Exit service',
          name: 'licence_details_upgrade',
          id: 'exit_service',
        },
      }
    })
  },
  post: function (request, reply) {
    returnURL = request.query.returnUrl
    var upgradeOption = request.payload.licence_details_upgrade
    if (upgradeOption === 'Buy_new') {
      return reply.redirect('licence-before')
    } else {
      return reply.redirect('/')
    }
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/licence-not-found',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/licence-not-found',
  config: {
    handler: handlers.post
  }
}]
