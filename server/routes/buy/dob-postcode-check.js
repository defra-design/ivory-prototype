const handlers = {
  get: function (request, reply) {
    return reply.view('dob-postcode-check', {
      pageTitle: 'Find your licence',
      errorMessage: 'Enter your details',
      birthDay: request.session.birthDay,
      birthMonth: request.session.birthMonth,
      birthYear: request.session.birthYear
    })
  },
  post: function (request, reply) {
    return reply.redirect('find-a-licence-two')
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/dob-postcode-check',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/dob-postcode-check',
  config: {
    handler: handlers.post
  }
}]
