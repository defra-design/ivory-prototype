const handlers = {
  get: function (request, reply) {
    return reply.view('old-licence-number', {
      pageTitle: 'Enter your licence details',
      errorMessage: 'Enter your licence details',
    })
  },
  post: function (request, reply) {
    return reply.redirect('/')
  }
}

module.exports = [{
  method: 'GET',
  path: '/catch-return/old-licence-number',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/catch-return/old-licence-number',
  config: {
    handler: handlers.post
  }
}]
