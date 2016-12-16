const handlers = {
  get: function (request, reply) {
    return reply.redirect('/find-a-licence')
  }
}


module.exports = [{
  method: 'GET',
  path: '/upgrade',
  config: {
    handler: handlers.get
  }
}]
