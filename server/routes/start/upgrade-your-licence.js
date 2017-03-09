const handlers = {
  get: function (request, reply) {
    return reply.view('upgrade-your-licence.html')
  }
}

module.exports = [{
  method: 'GET',
  path: '/start/upgrade-your-licence.html',
  config: {
    handler: handlers.get
  }
}
]
