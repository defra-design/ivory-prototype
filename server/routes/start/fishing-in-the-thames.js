const handlers = {
  get: function (request, reply) {
    return reply.view('fishing-in-the-thames.html')
  }
}

module.exports = [{
  method: 'GET',
  path: '/start/fishing-in-the-thames.html',
  config: {
    handler: handlers.get
  }
}
]
