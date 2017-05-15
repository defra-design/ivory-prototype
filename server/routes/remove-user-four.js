const handlers = {
  get: function (request, reply) {
    global.users.splice(0, 4);
    return reply.redirect('/buy/summary')
  },
}

module.exports = [{
  method: 'GET',
  path: '/buy/remove-user-four',
  config: {
    handler: handlers.get
  }
}]
