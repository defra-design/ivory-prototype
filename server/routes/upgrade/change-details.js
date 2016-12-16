const handlers = {
  get: function (request, reply) {
    return reply.view('change-details', {
      pageTitle: 'Update your details',
      errorMessage: '',
    })
  },
  post: function (request, reply) {


    return reply.redirect('upgrade-species')
    return reply.redirect('change-details')

  }
}

module.exports = [{
  method: 'GET',
  path: '/upgrade/change-details',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/upgrade/change-details',
  config: {
    handler: handlers.post
  }
}]
