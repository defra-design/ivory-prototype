const handlers = {
  get: function (request, reply) {
    return reply.view('find-a-licence-two', {
      pageTitle: 'Find your licence',
      errorMessage: 'Enter your rod licence number',
      licence_number: request.session.licence_number,
    })
  },
  post: function (request, reply) {
    request.session.licenceNumber = request.payload.licence_number
    return reply.redirect('find-a-licence-dob')
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/find-a-licence-two',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/find-a-licence-two',
  config: {
    handler: handlers.post
  }
}]
