const handlers = {
  get: function (request, reply) {
    return reply.view('which-licence-do-you-have', {
      pageTitle: 'which licence do you have?',
      errorMessage: 'Tell us which licence you have',
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
        return reply.redirect('ni-number')
    } else {
      
    }

  }
}


module.exports = [{
  method: 'GET',
  path: '/buy/which-licence-do-you-have',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/which-licence-do-you-have',
  config: {
    handler: handlers.post
  }
}]
