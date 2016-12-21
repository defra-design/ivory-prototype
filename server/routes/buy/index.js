const handlers = {
  get: function (request, reply) {
    return reply.redirect('../landing.html')
  }
}


module.exports = [{
  method: 'GET',
  path: '/buy',
  config: {
    handler: handlers.get
  }
}]
