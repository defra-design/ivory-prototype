const handlers = {
  get: function (request, reply) {
    return reply.view('number-of-rods', {
      pageTitle: 'How many rods would you like to licence?',
      errorMessage: 'Select number of rods',
      items: {
          one: {
            text: 'Up to 2 rods',
            name: 'number_of_rods',
            id: 'Up to 2 rods',
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
    request.session.numberOfRods = request.payload.number_of_rods
    returnURL = request.query.returnUrl


    if (returnURL) {
      if (request.session.disabilityChecked === true) {
        return reply.redirect(returnURL)
      } else {
        return reply.redirect('disability?returnUrl=/buy/summary')
      }
    } else {
      if (request.session.isJunior === true) {
        //return reply.redirect('blue-badge-check')
        return reply.redirect('find-address')
      } else {
        return reply.redirect('disability')
      }
    }



  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/number-of-rods',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/number-of-rods',
  config: {
    handler: handlers.post
  }
}]
