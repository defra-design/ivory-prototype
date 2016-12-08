const handlers = {
  get: function (request, reply) {
    return reply.view('buy.html')
  }
}

module.exports = [{
  method: 'GET',
  path: '/start/buy.html',
  config: {
    handler: handlers.get
  }
}]
