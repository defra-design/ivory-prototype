const handlers = {
  get: function (request, reply) {
    return reply.view('licence-costs.html')
  }
}

module.exports = [{
  method: 'GET',
  path: '/start/licence-costs.html',
  config: {
    handler: handlers.get
  }
}]
