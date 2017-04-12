const handlers = {
  get: function (request, reply) {


    return reply.view('rods-two', {
      pageTitle: 'How many rods would you like to licence?',
      errorMessage: 'Select number of rods',
      items: {
        one: {
          text: 'Up to 2 rods',
          name: 'number_of_rods',
          id: 'Up to 2 rods',
          // selectedText: request.session.cost,
        },
        two: {
          text: 'Up to 3 rods',
          name: 'number_of_rods',
          id: 'Up to 3 rods',
        }
      }
    })
  },
  post: function (request, reply) {
    //return reply.redirect('licence-start-option')
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/rods-two',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/rods-two',
  config: {
    handler: handlers.post
  }
}]
