const handlers = {
  get: function (request, reply) {
    return reply.redirect('/buy/licence-type')
  }
}


module.exports = [{
  method: 'GET',
  path: '/',
  config: {
    handler: handlers.get
  }
}]
