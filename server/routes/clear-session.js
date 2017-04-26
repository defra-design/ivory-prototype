const handlers = {
  get: function (request, reply) {
    // Cear session
    request.session.licenceNumber = ''
    request.session.firstName = ''
    request.session.lastName = ''
    request.session.holderName = ''
    request.session.dateOfBirth = ''
    request.session.birthDay = ''
    request.session.birthMonth = ''
    request.session.birthYear = ''
    request.session.email = ''
    request.session.noContact = ''
    request.session.mobile  = ''
    request.session.Address = ''
    request.session.premises = ''
    request.session.street = ''
    request.session.locality = ''
    request.session.town = ''
    request.session.postcode = ''
    request.session.country = ''
    request.session.oldLicenceType = ''
    request.session.licenceType = ''
    request.session.isCoarse = ''
    request.session.numberOfRods = ''
    request.session.oldLicenceLength = ''
    request.session.licenceLength = ''
    request.session.haveTime = ''
    request.session.year = ''
    request.session.month = ''
    request.session.day = ''
    request.session.date = ''
    request.session.startDate = ''
    request.session.startMonth = ''
    request.session.startYear = ''
    request.session.startText = ''
    request.session.endText = ''
    request.session.hasDisabledConcession = ''
    request.session.isFull = ''
    request.session.isConcession = ''
    request.session.oldConcession = ''
    request.session.isCoarse = ''
    return reply.redirect('/start/when-you-need-a-licence.html')
    //return reply.redirect('/buy/name')
  },
}

module.exports = [{
  method: 'GET',
  path: '/buy/clear-session',
  config: {
    handler: handlers.get
  }
}]
