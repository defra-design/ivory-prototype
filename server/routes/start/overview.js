const handlers = {
  get: function (request, reply) {
    return reply.view('index.html')
    // Cear session
    global.users = []
  }
}

module.exports = [{
  method: 'GET',
  path: '/start/index.html',
  config: {
    handler: handlers.get
  }
}]
