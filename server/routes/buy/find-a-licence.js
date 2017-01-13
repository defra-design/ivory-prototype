const handlers = {
  get: function (request, reply) {
    return reply.view('find-a-licence', {
      pageTitle: 'Find your licence',
      errorMessage: 'Enter your rod licence number',
      licence_number: request.session.licence_number,
      PostOfficeReceiptNumber: request.session.PostOfficeReceiptNumber,
      PermissionNumber: request.session.PermissionNumber,
    })
  },
  post: function (request, reply) {
    request.session.licenceNumber = request.payload.licence_number
    request.session.PostOfficeReceiptNumber = request.payload.PostOfficeReceiptNumber
    request.session.PermissionNumber = request.payload.PermissionNumber
    return reply.redirect('dob-postcode-check')
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/find-a-licence',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/find-a-licence',
  config: {
    handler: handlers.post
  }
}]
