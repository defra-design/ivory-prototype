const handlers = {
  get: function (request, reply) {
    return reply.view('get.html')
  }
}

module.exports = [{
  method: 'GET',
  path: '/start/get.html',
  config: {
    handler: handlers.get
  }
}]
