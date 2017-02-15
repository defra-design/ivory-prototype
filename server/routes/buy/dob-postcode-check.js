const handlers = {
  get: function (request, reply) {
    return reply.view('dob-postcode-check', {
      pageTitle: 'Find your licence',
      errorMessage: 'Enter your details',

    })
  },
  post: function (request, reply) {
    birthDay = request.session.birthDay
    birthMonth = request.session.birthMonth
    birthYear = request.session.birthYear
    if (request.session.licenceNumber === '00010418-3WC3JDS-B7A711') {
      return reply.redirect('licence-details-species')
    } else if (request.session.licenceNumber === '00010418-3WC3JDS-B7A712') {
      return reply.redirect('licence-details-renew')
    } else if (request.session.licenceNumber === '00010418-3WC3JDS-B7A713') {
      return reply.redirect('licence-details-length')
    } else if (request.session.licenceNumber === '00010418-3WC3JDS-B7A714') {
      return reply.redirect('upgrade-expired')
    } else if (request.session.licenceNumber === '00010418-3WC3JDS-B7A715') {
      return reply.redirect('renew-expired')
    } else if (request.session.licenceNumber === '00010418-3WC3JDS-B7A716') {
      return reply.redirect('summary')
    } else {
      return reply.redirect('licence-not-found')
    }

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
