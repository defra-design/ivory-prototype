const handlers = {
  get: function (request, reply) {
    return reply.view('', {
      pageTitle: 'change-details',
      errorMessage: '',
    })
  },
  post: function (request, reply) {
    returnURL = request.query.returnUrl

    // if (returnURL) {
    //   return reply.redirect(returnURL)
    // } else {
    //   return reply.redirect('')
    // }

    return reply.redirect('upgrade-species')
    return reply.redirect('change-details')

  }
}

module.exports = [{
  method: 'GET',
  path: '/upgrade/change-details',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/upgrade/change-details',
  config: {
    handler: handlers.post
  }
}]
