const handlers = {
  get: function (request, reply) {

    return reply.view('details-updated', {
      pageTitle: 'Check your new licence details',
      nameOnLicence: request.session.holderName,
      email: request.session.email,
      mobile: request.session.mobile,
      address: request.session.Address,
    })
  },
  post: function (request, reply) {
    return reply.redirect('conditions')
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/details-updated',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/details-updated',
  config: {
    handler: handlers.post
  }
}]
