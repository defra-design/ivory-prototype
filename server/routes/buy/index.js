const handlers = {
  get: function (request, reply) {
    return reply.redirect('buy/name')
  }
}


module.exports = [{
  method: 'GET',
  path: '/buy',
  config: {
    handler: handlers.get
  }
}]
