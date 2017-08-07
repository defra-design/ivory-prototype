const handlers = {
  get: function (request, reply) {
    return reply.view('direct-debit-screen', {
    })

    // Set global user variable
    global.users = []


  },
  post: function (request, reply) {
    request.session.multibuy = true
    return reply.redirect('/buy')
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/direct-debit-screen',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/direct-debit-screen',
  config: {
    handler: handlers.post
  }
}]
