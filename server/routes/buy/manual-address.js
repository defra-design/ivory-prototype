const handlers = {
  get: function (request, reply) {
    return reply.view('manual-address', {
      pageTitle: 'Enter your address',
      errorMessage: 'Enter a building name or number',
      errorMessageTwo: 'Enter a town or city',
      errorMessageThree: 'Enter a postcode',
      premises: request.session.premises,
      street: request.session.street,
      locality: request.session.locality,
      town: request.session.town,
      postcode: request.session.postcode,
      country: request.session.country,
      returnURL: request.query.returnUrl,
      findAddressLink: 'find-address?returnUrl=/buy/summary',
      countries: {
          one: {
            text: 'United Kingdom',
          },
          two: {
            text: 'Wales',
          },
          three: {
            text: 'Scotland',
          },
          four: {
            text: 'Northern Ireland',
          },
      }
    })
  },
  post: function (request, reply) {
    request.session.premises = request.payload.premises
    request.session.street = request.payload.street
    request.session.locality = request.payload.locality
    request.session.town = request.payload.town
    request.session.postcode = request.payload.postcode
    request.session.country = request.payload.country
    // Combile address
    request.session.Address = request.session.premises + " " + request.session.street + " " + request.session.locality + " " + request.session.town + " " +  request.session.postcode + " " + request.session.country
    returnURL = request.query.returnUrl
    if (returnURL) {
      return reply.redirect(returnURL)
    } else {
      return reply.redirect('licence-start-option')
    }
  }
}


module.exports = [{
  method: 'GET',
  path: '/buy/manual-address',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/manual-address',
  config: {
    handler: handlers.post
  }
}]
