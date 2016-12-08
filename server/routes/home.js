const handlers = {
  get: function (request, reply) {
    return reply.redirect('/start')
  }
}


module.exports = [{
  method: 'GET',
  path: '/',
  config: {
    handler: handlers.get
  }
}]
