const handlers = {
  get: function (request, reply) {
    return reply.view('fishing-in-scotland-and-northern-ireland.html')
  }
}

module.exports = [{
  method: 'GET',
  path: '/start/fishing-in-scotland-and-northern-ireland.html',
  config: {
    handler: handlers.get
  }
}
]
