const handlers = {
  get: function (request, reply) {
    return reply.view('rules.html')
  }
}

module.exports = [{
  method: 'GET',
  path: '/start/rules.html',
  config: {
    handler: handlers.get
  }
}
]
