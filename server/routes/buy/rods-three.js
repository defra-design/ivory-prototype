const handlers = {
  get: function (request, reply) {


    return reply.view('rods-three', {
      pageTitle: 'How many rods would you like to licence?',
      errorMessage: 'Select number of rods',
      items: {
        one: {
          text: 'Up to 2 rods',
          name: 'number_of_rods',
          id: 'Up to 2 rods',
          value: 'Up-to-2-rods',
          selectedText: 'You can fish with up to 2 rods for freshwater (coarse) fish.',
        },
        two: {
          text: 'Up to 3 rods',
          name: 'number_of_rods',
          id: 'Up to 3 rods',
          value: 'Up-to-3-rods',
          selectedText: 'You can fish with up to 3 rods for freshwater (coarse) fish.',
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
  path: '/buy/rods-three',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/rods-three',
  config: {
    handler: handlers.post
  }
}]
