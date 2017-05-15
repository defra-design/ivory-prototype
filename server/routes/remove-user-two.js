const handlers = {
  get: function (request, reply) {
    global.users.splice(0, 2);
    return reply.redirect('/buy/summary')
  },
}

module.exports = [{
  method: 'GET',
  path: '/buy/remove-user-two',
  config: {
    handler: handlers.get
  }
}]
