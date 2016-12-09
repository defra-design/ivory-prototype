const handlers = {
  get: function (request, reply) {
    return reply.view('blue-badge', {
      pageTitle: 'What is your Blue Badge number?',
      errorMessage: 'Enter your blue badge number',
    })
  },
  post: function (request, reply) {

    returnURL = request.query.returnUrl



    if (returnURL) {
      return reply.redirect(returnURL)
    } else {
      return reply.redirect('contact')
    }


  }
}


module.exports = [{
  method: 'GET',
  path: '/buy/blue-badge',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/blue-badge',
  config: {
    handler: handlers.post
  }
}]
