const handlers = {
  get: function (request, reply) {
    global.users.splice(1, 2);
    return reply.redirect('/buy/buy-another-licence')
  },
}

module.exports = [{
  method: 'GET',
  path: '/buy/remove-user-two',
  config: {
    handler: handlers.get
  }
}]
