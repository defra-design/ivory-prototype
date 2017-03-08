const handlers = {
  get: function (request, reply) {
    return reply.view('system-failure', {
      pageTitle: 'Sorry, this upgrade service is currently unavailable',
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
      return reply.redirect('product-type')
    } else {
      return reply.redirect('/buy/product-type')
    }
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/system-failure',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/system-failure',
  config: {
    handler: handlers.post
  }
}]
