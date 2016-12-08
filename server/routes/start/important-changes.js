const handlers = {
  get: function (request, reply) {
    return reply.view('important-changes.html')
  }
}

module.exports = [{
  method: 'GET',
  path: '/start/important-changes.html',
  config: {
    handler: handlers.get
  }
}]
