const handlers = {
  get: function (request, reply) {
    return reply.redirect('/start/index.html')
  }
}


module.exports = [{
  method: 'GET',
  path: '/start',
  config: {
    handler: handlers.get
  }
}]
