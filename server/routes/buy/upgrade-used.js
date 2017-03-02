const handlers = {
  get: function (request, reply) {
    return reply.view('upgrade-used', {
      pageTitle: 'This licence has already been upgraded',
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
      return reply.redirect('upgrade-used')
    } else {
      return reply.redirect('upgrade-used')
    }
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/upgrade-used',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/upgrade-used',
  config: {
    handler: handlers.post
  }
}]
