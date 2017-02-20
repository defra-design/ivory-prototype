const handlers = {
  get: function (request, reply) {
    return reply.redirect('/start/index.html')
  }
}


module.exports = [{
  method: 'GET',
  path: '/',
  config: {
    handler: handlers.get
  }
}]
