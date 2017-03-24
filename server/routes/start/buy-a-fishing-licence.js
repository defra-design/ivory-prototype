const handlers = {
  get: function (request, reply) {
    return reply.view('buy-a-fishing-licence.html')
  }
}

module.exports = [{
  method: 'GET',
  path: '/start/buy-a-fishing-licence.html',
  config: {
    handler: handlers.get
  }
}
]
