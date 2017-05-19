const handlers = {
  get: function (request, reply) {
    global.users.splice(3, 4);
    return reply.redirect('/buy/buy-another-licence')
  },
}

module.exports = [{
  method: 'GET',
  path: '/buy/remove-user-four',
  config: {
    handler: handlers.get
  }
}]
