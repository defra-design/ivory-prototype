const handlers = {
  get: function (request, reply) {
    return reply.view('replace.html')
  }
}

module.exports = [{
  method: 'GET',
  path: '/start/replace.html',
  config: {
    handler: handlers.get
  }
}]
