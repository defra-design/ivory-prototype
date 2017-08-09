const handlers = {
  get: function (request, reply) {
    return reply.view('ni-number', {
      pageTitle: 'What is your National Insurance number?',
      errorMessage: 'Enter your National Insurance number',
      NINumber: request.session.NINumber,
    })
  },
  post: function (request, reply) {
    returnURL = request.query.returnUrl
    request.session.hasNINumber = true
    request.session.hasDisabledConcession = true
    if (returnURL) {
      if (request.session.licenceType === 'Trout and coarse' && request.session.rodsChecked === false) {
        return reply.redirect('number-of-rods?returnUrl=/buy/summary')
      } else {
        return reply.redirect(returnURL)
      }
    } else if (request.session.isUpgrade === true || request.session.isUpgradeLength === true){
      if (request.session.licenceType === 'Trout and coarse' && request.session.rodsChecked === false) {
        return reply.redirect('number-of-rods')
      } else {
        return reply.redirect('summary')
      }
      } else {
      return reply.redirect('licence-type')
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
