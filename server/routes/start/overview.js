const handlers = {
  get: function (request, reply) {
    return reply.view('index.html')
  },
  post: function (request, reply) {
    return reply.redirect('licence-costs')
  }
}

module.exports = [{
  method: 'GET',
  path: '/start/index.html',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/start/index.html',
  config: {
    handler: handlers.post
  }
}]
