const handlers = {
  get: function (request, reply) {
    return reply.view('important-changes.html')
  },
  post: function (request, reply) {
    return reply.redirect('buy')
  }
}

module.exports = [{
  method: 'GET',
  path: '/start/important-changes.html',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/start/important-changes.html',
  config: {
    handler: handlers.post
  }
}]
