const handlers = {
  get: function (request, reply) {
    return reply.view('choose-upgrade', {
      pageTitle: 'What do you want to do?',
      errorMessage: 'Choose a licence type',
      items: {
        two: {
          text: 'Renew my licence',
          name: 'choose_upgrade',
          id: 'Renew_my_licence',
          value: 'Renew_my_licence',
        },
        one: {
          text: 'Upgrade my licence',
          name: 'choose_upgrade',
          id: 'Upgrade_my_licence',
          value: 'Upgrade_my_licence',
        },
      },
    })
  },
  post: function (request, reply) {
    request.session.chooseUpgrade = request.payload.choose_upgrade
    returnURL = request.query.returnUrl
    if (returnURL) {
      return reply.redirect(returnURL)
    } else  {
      return reply.redirect('find-a-licence')
    }
  }
}


module.exports = [{
  method: 'GET',
  path: '/buy/choose-upgrade',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/choose-upgrade',
  config: {
    handler: handlers.post
  }
}]
