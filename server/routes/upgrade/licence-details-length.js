const handlers = {
  get: function (request, reply) {
    return reply.view('licence-details-length', {
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
    return reply.redirect('upgraded-length')

  }
}

module.exports = [{
  method: 'GET',
  path: '/upgrade/licence-details-length',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/upgrade/licence-details-length',
  config: {
    handler: handlers.post
  }
}]
