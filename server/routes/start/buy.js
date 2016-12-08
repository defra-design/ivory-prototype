const handlers = {
  get: function (request, reply) {
    return reply.view('buy.html')
  },
  post: function (request, reply) {
    return reply.redirect('replace')
  }
}

module.exports = [{
  method: 'GET',
  path: '/start/buy.html',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/start/buy.html',
  config: {
    handler: handlers.post
  }
}]
