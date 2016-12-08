const handlers = {
  get: function (request, reply) {
    return reply.view('licence-costs.html')
  },
  post: function (request, reply) {
    return reply.redirect('licence-conditions')
  }
}

module.exports = [{
  method: 'GET',
  path: '/start/licence-costs.html',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/start/licence-costs.html',
  config: {
    handler: handlers.post
  }
}]
