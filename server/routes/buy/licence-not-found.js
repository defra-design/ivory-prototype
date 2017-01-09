const handlers = {
  get: function (request, reply) {
    return reply.view('licence-not-found', {
      pageTitle: 'We can\'t find your licence details',
      errorMessage: 'Tell us if you claim Disability Living Allowance, Personal Independence Payment or hold a Blue Badge',
      items: {
        one: {
          text: 'Yes',
          name: 'licence_not_found',
          id: 'yes',
        },
        two: {
          text: 'No (exit service)',
          name: 'licence_not_found',
          id: 'no',
        },
      }
    })
  },
  post: function (request, reply) {
    returnURL = request.query.returnUrl
    var licenceNotFound = request.payload.licence_not_found
    if (licenceNotFound === 'no') {

      if (returnURL) {
        return reply.redirect(returnURL)
      } else {
        return reply.redirect('/')
      }
    } else {
        if (returnURL) {
          return reply.redirect(returnURL)
        } else {
          return reply.redirect('name')
      }
    }
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/licence-not-found',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/licence-not-found',
  config: {
    handler: handlers.post
  }
}]
