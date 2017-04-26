const handlers = {
  get: function (request, reply) {
    request.session = ''
    return reply.redirect('/start/when-you-need-a-licence.html')
    //return reply.redirect('/buy/name')
  },
}

module.exports = [{
  method: 'GET',
  path: '/buy/clear-session',
  config: {
    handler: handlers.get
  }
}]
