const handlers = {
  get: function (request, reply) {
    return reply.view('licence-not-found', {
      pageTitle: 'We can\'t find this licence',
    })
  },
  post: function (request, reply) {
    if (returnURL) {
      return reply.redirect(returnURL)
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
