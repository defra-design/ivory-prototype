const handlers = {
  get: function (request, reply) {
    return reply.redirect('/upgrade/licence-before')
  }
}


module.exports = [{
  method: 'GET',
  path: '/upgrade',
  config: {
    handler: handlers.get
  }
}]
