const handlers = {
  get: function (request, reply) {
    return reply.view('no-licence-required', {
      pageTitle: 'You do not need a licence yet',
      isMultibuy: request.session.multibuy,
      user1 : global.users[0],
      user2 : global.users[1],
      user3 : global.users[2],
      user4 : global.users[3],
      count : global.users.length
    })
  },
  post: function (request, reply) {
    return reply.redirect('/')
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/no-licence-required',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/no-licence-required',
  config: {
    handler: handlers.post
  }
}]
