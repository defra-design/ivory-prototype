const handlers = {
  get: function (request, reply) {
    return reply.view('rules.html')
  },
  post: function (request, reply) {
    return reply.redirect('important-changes')
  }
}

module.exports = [{
  method: 'GET',
  path: '/start/rules.html',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/start/rules.html',
  config: {
    handler: handlers.post
  }
}]
