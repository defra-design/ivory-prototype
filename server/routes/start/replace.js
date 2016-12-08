const handlers = {
  get: function (request, reply) {
    return reply.view('replace.html')
  },
  post: function (request, reply) {
    return reply.redirect('./buy')
  }
}

module.exports = [{
  method: 'GET',
  path: '/start/replace',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/start/replace',
  config: {
    handler: handlers.post
  }
}]
