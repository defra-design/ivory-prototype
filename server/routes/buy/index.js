const handlers = {
  get: function (request, reply) {
    return reply.redirect('buy/licence-before-two')
  }
}


module.exports = [{
  method: 'GET',
  path: '/buy',
  config: {
    handler: handlers.get
  }
}]
