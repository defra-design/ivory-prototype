const handlers = {
  get: function (request, reply) {
    return reply.view('disability-proof', {
      pageTitle: 'What proof can you provide?',
      pageText: 'Select one item of proof that you can provide.',
      errorMessage: 'Tell us which proof you\'d like to provide.',
      items: {
        one: {
          text: 'Blue Badge number',
          name: 'disability_proof',
          id: 'Blue Badge number',
        },
        two: {
          text: 'National Insurance number',
          name: 'disability_proof',
          id: 'National Insurance number',
        },
      }
    })
  },
  post: function (request, reply) {
    var disability_proof = request.payload.disability_proof
    returnURL = request.query.returnUrl

    if (disability_proof === 'Blue Badge number') {
      return reply.redirect('blue-badge')
    } else {
      return reply.redirect('ni-number')
    }

    // if (returnURL) {
    //   return reply.redirect(returnURL)
    // } else {
    //   return reply.redirect('date-of-birth')
    // }


  }
}


module.exports = [{
  method: 'GET',
  path: '/buy/disability-proof',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/disability-proof',
  config: {
    handler: handlers.post
  }
}]
