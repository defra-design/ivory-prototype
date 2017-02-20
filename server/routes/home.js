const handlers = {
  get: function (request, reply) {
    return reply.redirect('upgrade-screen.html')
  }
}


module.exports = [{
  method: 'GET',
  path: '/',
  config: {
    handler: handlers.get
  }
}]
