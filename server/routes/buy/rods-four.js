const handlers = {
  get: function (request, reply) {



    return reply.view('rods-four', {
      pageTitle: 'Do you want to fish with 3 rods?',
      errorMessage: 'Select number of rods',

      items: {
        one: {
          text: 'Yes',
          name: 'number_of_rods',
          id: 'Yes',
          // selectedText: request.session.cost,
        },
        two: {
          text: 'No',
          name: 'number_of_rods',
          id: 'No',
        }
      }
    })
  },
  post: function (request, reply) {
    returnURL = request.query.returnUrl
    request.session.numberOfRods = request.payload.number_of_rods
    return reply.redirect('licence-start-option')



  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/rods-four',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/rods-four',
  config: {
    handler: handlers.post
  }
}]
