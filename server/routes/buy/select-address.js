const handlers = {
  get: function (request, reply) {
    return reply.view('select-address', {
      pageTitle: 'Select an address',
      errorMessage: 'Choose your correct address',
      returnURL: request.query.returnUrl,
      manualAddressLink: 'manual-address?returnUrl=/buy/summary',
      items: {
          one: {
            text: 'Flat 20a, Knutsford Road, Warrington',
            name: 'select_address',
            id: 'Flat 20a, Knutsford Road, Warringtonn_1',
          },
          two: {
            text: 'Flat 20b, Knutsford Road, Warrington',
            name: 'select_address',
            id: 'Flat 20b, Knutsford Road, Warrington',
          },
      }
    })
  },
  post: function (request, reply) {
    request.session.Address = request.payload.select_address
    request.session.premises = "Flat 20a"
    request.session.street = "Knutsford Road"
    request.session.town = "Warrington"
    request.session.postcode = "WA2"
    request.session.country = "uk"
    returnURL = request.query.returnUrl

    if (returnURL) {
      return reply.redirect(returnURL)
    } else {
      if (request.session.isJunior === true) {
        return reply.redirect('licence-type')
      } else if (request.session.isFull === true) {
        return reply.redirect('disability')
      } else {
        return reply.redirect('licence-type')
      }
    }




  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/select-address',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/select-address',
  config: {
    handler: handlers.post
  }
}]
