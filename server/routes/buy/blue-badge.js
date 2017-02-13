const handlers = {
  get: function (request, reply) {
    return reply.view('blue-badge', {
      pageTitle: 'What is your Blue Badge number?',
      errorMessage: 'Enter your blue badge number',
    })
  },
  post: function (request, reply) {
    returnURL = request.query.returnUrl
    request.session.hasBlueBadge = true
    request.session.concession = true
    if (returnURL) {
      return reply.redirect(returnURL)
    } else if (request.session.isUpgrade === true){
        return reply.redirect('summary')
      } else {
      return reply.redirect('licence-type')
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
