const handlers = {
  get: function (request, reply) {
    return reply.view('dob-postcode-check', {
      pageTitle: 'Find your licence',
      errorMessage: 'Enter a valid date of birth',
      errorMessageTwo: 'Enter a valid postcode',
      // birthDay: request.session.birthDay,
      // birthMonth: request.session.birthMonth,
      // birthYear: request.session.birthYear,
    })
  },
  post: function (request, reply) {
    birthDay = request.session.birthDay
    birthMonth = request.session.birthMonth
    birthYear = request.session.birthYear
    if (request.session.licenceNumber === '00010418-3WC3JDS-B7A711') {
      return reply.redirect('licence-details-species')
    }else if (request.session.licenceNumber === '00010418-3WC3JDS-B7A712') {
        return reply.redirect('licence-details-species')
    } else if (request.session.licenceNumber === '00010418-3WC3JDS-B7A713') {
      return reply.redirect('licence-details-renew')
    } else if (request.session.licenceNumber === '00010418-3WC3JDS-B7A714') {
      return reply.redirect('licence-details-length')
    } else if (request.session.licenceNumber === '00010418-3WC3JDS-B7A715') {
      return reply.redirect('licence-details-length')
    } else if (request.session.licenceNumber === '00010418-3WC3JDS-B7A716') {
      return reply.redirect('upgrade-expired')
    } else if (request.session.licenceNumber === '00010418-3WC3JDS-B7A717') {
      return reply.redirect('upgrade-licence')
    } else if (request.session.licenceNumber === '00010418-3WC3JDS-B7A718') {
      return reply.redirect('upgrade-used')
    } else if (request.session.licenceNumber === '00010418-3WC3JDS-B7A719') {
      return reply.redirect('system-failure')
    } else if (request.session.licenceNumber === '00010418-3WC3JDS-B7A720') {
      return reply.redirect('licence-details-renew')
    } else if (request.session.licenceNumber === '00010418-3WC3JDS-B7A721') {
      return reply.redirect('licence-details-renew')
    } else if (request.session.licenceNumber === '00010418-3WC3JDS-B7A722') {
      return reply.redirect('renew-not-valid')
    } else if (request.session.licenceNumber === '00010418-3WC3JDS-B7A723') {
      return reply.redirect('upgrade-licence')
    } else if (request.session.licenceNumber === '00010418-3WC3JDS-B7A724') {
      return reply.redirect('renewal-used')
    } else if (request.session.licenceNumber === '00010418-3WC3JDS-B7A725') {
      return reply.redirect('system-failure')
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
