const handlers = {
  get: function (request, reply) {
    return reply.view('new-licence-number', {
      pageTitle: 'Enter your licence details',
      errorMessage: 'Enter your licence number',
      errorMessageTwo: 'Enter your postcode',
    })
  },
  post: function (request, reply) {
    return reply.redirect('/')
  }
}

module.exports = [{
  method: 'GET',
  path: '/catch-return/new-licence-number',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/catch-return/new-licence-number',
  config: {
    handler: handlers.post
  }
}]
