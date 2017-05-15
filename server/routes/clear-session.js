const handlers = {
  get: function (request, reply) {

    // Cear session
    request.session = {}
    // Cear saved users
    global.users = []
    return reply.redirect('/')



  },
}

module.exports = [{
  method: 'GET',
  path: '/buy/clear-session',
  config: {
    handler: handlers.get
  }
}]
