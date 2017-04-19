const handlers = {
  get: function (request, reply) {
    return reply.view('multibuy-screen', {
    })
  },
  post: function (request, reply) {
    request.session.multibuy = true
    return reply.redirect('/buy')
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/multibuy-screen',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/multibuy-screen',
  config: {
    handler: handlers.post
  }
}]
