const handlers = {
  get: function (request, reply) {
    return reply.view('find-a-licence', {
      pageTitle: 'Find a licence',
      errorMessage: 'Enter your rod licence number',
      licence_number: request.session.licence_number,
    })
  },
  post: function (request, reply) {
    request.session.licenceNumber = request.payload.licence_number
    return reply.redirect('dob-postcode-check')
  }
}

module.exports = [{
  method: 'GET',
  path: '/upgrade/find-a-licence',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/upgrade/find-a-licence',
  config: {
    handler: handlers.post
  }
}]
