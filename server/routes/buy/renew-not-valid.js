const handlers = {
  get: function (request, reply) {
    return reply.view('renew-not-valid', {
      pageTitle: 'Your licence is not yet eligible for renewal',
      errorMessage: 'Tell us what you\'d like to do',
    })
  },
  post: function (request, reply) {
    var upgradeOption = request.payload.licence_details_upgrade
    returnURL = request.query.returnUrl

    if (upgradeOption === 'Buy_again') {
      request.session.isRenew = true
      return reply.redirect('licence-start-option')
    } else {
      return reply.redirect('product-type')
    }
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/renew-not-valid',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/renew-not-valid',
  config: {
    handler: handlers.post
  }
}]
