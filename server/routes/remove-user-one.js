const handlers = {
  get: function (request, reply) {
    global.users.splice(0, 1);
    return reply.redirect('/buy/summary')
  },
}

module.exports = [{
  method: 'GET',
  path: '/buy/remove-user-one',
  config: {
    handler: handlers.get
  }
}]
