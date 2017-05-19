const handlers = {
  get: function (request, reply) {
    global.users.splice(2, 3);
    return reply.redirect('/buy/buy-another-licence')
  },
}

module.exports = [{
  method: 'GET',
  path: '/buy/remove-user-three',
  config: {
    handler: handlers.get
  }
}]
