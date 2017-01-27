const handlers = {
  get: function (request, reply) {
    return reply.view('find-a-licence-dob', {
      pageTitle: 'Find your licence',
      errorMessage: 'Enter your details',
      birthDay: request.session.birthDay,
      birthMonth: request.session.birthMonth,
      birthYear: request.session.birthYear
    })
  },
  post: function (request, reply) {
    return reply.redirect('find-a-licence-postcode')
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/find-a-licence-dob',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/find-a-licence-dob',
  config: {
    handler: handlers.post
  }
}]
