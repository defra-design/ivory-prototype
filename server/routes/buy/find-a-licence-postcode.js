const handlers = {
  get: function (request, reply) {
    return reply.view('find-a-licence-postcode', {
      pageTitle: 'Find your licence',
      errorMessage: 'Enter your details',
      birthDay: request.session.birthDay,
      birthMonth: request.session.birthMonth,
      birthYear: request.session.birthYear
    })
  },
  post: function (request, reply) {
    if (request.session.licenceNumber === 'B7A718') {
      return reply.redirect('??????')
    } else if (request.session.licenceNumber === 'B7A718'){
      return reply.redirect('?????')
    }
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/find-a-licence-postcode',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/find-a-licence-postcode',
  config: {
    handler: handlers.post
  }
}]
