const handlers = {
  get: function (request, reply) {
    return reply.view('no-licence-required', {
      pageTitle: 'You do not need a licence',
      pageMessage: 'You do not need a licence because you are under 12 years of age.'
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
