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
      if (returnURL) {
        return reply.redirect('blue-badge?returnUrl=/buy/summary')
      } else {
        return reply.redirect('blue-badge')
      }
    } else {
      if (returnURL) {
        return reply.redirect('ni-number?returnUrl=/buy/summary')
      } else {
        return reply.redirect('ni-number')
      }
    }




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
