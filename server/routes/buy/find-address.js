const handlers = {
  get: function (request, reply) {
    return reply.view('find-address', {
      pageTitle: 'Find your address',
      errorMessage: 'Enter your house number or name',
      errorMessageTwo: 'Enter your postcode',
      premises: request.session.premises,
      postcode: request.session.postcode,
      returnURL: request.query.returnUrl,
      manualAddressLink: 'manual-address?returnUrl=/buy/summary',
    })
  },
  post: function (request, reply) {
    request.session.premises = request.payload.premises
    request.session.postcode = request.payload.postcode
    returnURL = request.query.returnUrl
    if (returnURL) {
      return reply.redirect('select-address?returnUrl=/buy/summary')
    } else {
      return reply.redirect('select-address')
    }
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/find-address',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/find-address',
  config: {
    handler: handlers.post
  }
}]
