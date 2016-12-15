const handlers = {
  get: function (request, reply) {
    return reply.view('licence-details-species', {
      pageTitle: '',
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

    return reply.redirect('change-details')
    return reply.redirect('upgraded-species')

  }
}

module.exports = [{
  method: 'GET',
  path: '/upgrade/licence-details-species',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/upgrade/licence-details-species',
  config: {
    handler: handlers.post
  }
}]
