const handlers = {
  get: function (request, reply) {
    return reply.view('fishing-in-scotland-and-northern-ireland.html',  null, { layout: 'layout-start'})
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
