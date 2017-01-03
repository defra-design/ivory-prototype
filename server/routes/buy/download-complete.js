const handlers = {
  get: function (request, reply) {

    return reply.view('download-complete', {
      pageTitle: 'Check your new licence details',
      nameOnLicence: request.session.holderName,
      licenceType: request.session.licenceType,
      startDate : request.session.startDate,
      endDate : request.session.endDate,
      isSalmon: request.session.isSalmon,
      isFull: request.session.isFull,
      isJunior:  request.session.isJunior,
      noContact: request.session.noContact
    })
  },
  post: function (request, reply) {
    // return reply.redirect('conditions')
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/download-complete',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/download-complete',
  config: {
    handler: handlers.post
  }
}]
