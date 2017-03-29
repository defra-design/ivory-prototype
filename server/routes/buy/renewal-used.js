const handlers = {
  get: function (request, reply) {
    return reply.view('renewal-used', {
      pageTitle: 'This licence has already been renewed',
      //errorMessage: 'Tell us what you\'d like to do',
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
  path: '/buy/renewal-used',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/renewal-used',
  config: {
    handler: handlers.post
  }
}]
