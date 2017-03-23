const handlers = {
  get: function (request, reply) {
    return reply.view('which-licence-do-you-have', {
      pageTitle: 'Which licence number do you have?',
      errorMessage: 'Tell us which licence number you have',
      items: {
        one: {
          text: 'Old',
          name: 'licenceNumber',
          id: 'Old',
        },
        two: {
          text: 'New',
          name: 'licenceNumber',
          id: 'New',
        },
      }
    })
  },
  post: function (request, reply) {
    var licenceNumber = request.payload.licenceNumber
    returnURL = request.query.returnUrl

    if (licenceNumber === 'Old') {
        return reply.redirect('old-licence-number')
    } else {
      return reply.redirect('new-licence-number')
    }

  }
}


module.exports = [{
  method: 'GET',
  path: '/catch-return/which-licence-do-you-have',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/catch-return/which-licence-do-you-have',
  config: {
    handler: handlers.post
  }
}]
