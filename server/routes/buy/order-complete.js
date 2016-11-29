const handlers = {
  get: function (request, reply) {
    return reply.view('order-complete', {
      pageTitle: 'Check your new licence details',
      nameOnLicence: request.session.holderName,
      licenceType: request.session.licenceType,
      startDate : request.session.startDate,
      endDate : request.session.endDate,
      isSalmon: request.session.isSalmon
    })
  },
  post: function (request, reply) {
    return reply.redirect('conditions')
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/order-complete',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/order-complete',
  config: {
    handler: handlers.post
  }
}]
