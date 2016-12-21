const handlers = {
  get: function (request, reply) {
    return reply.view('ni-number', {
      pageTitle: 'What is the licence holder\'s National Insurance number?',
      errorMessage: 'Enter your national insurance number',
    })
  },
  post: function (request, reply) {

    returnURL = request.query.returnUrl
    if (returnURL) {
      return reply.redirect(returnURL)
    } else {
      return reply.redirect('find-address')
    }


  }
}


module.exports = [{
  method: 'GET',
  path: '/buy/ni-number',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/ni-number',
  config: {
    handler: handlers.post
  }
}]
