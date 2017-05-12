const handlers = {
  get: function (request, reply) {



    return reply.view('rods-five', {
      pageTitle: 'Do you want to fish with 3 rods?',
      //pageTitle: 'How many rods would you like to licence?',
      errorMessage: 'Select number of rods',

      items: {
        one: {
        //  text: 'Up to 2-rods for freshwater fish',
        text: 'Yes',
          name: 'number_of_rods',
          id: 'Yes',
          // selectedText: request.session.cost,
        },
        two: {
          // text: 'Up to 3-rods for freshwater fish',
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
  path: '/buy/rods-five',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/rods-five',
  config: {
    handler: handlers.post
  }
}]
