const handlers = {
  get: function (request, reply) {


    return reply.view('would-you-like-to-set-up-a-direct-debit', {
      pageTitle: 'Would you like to set up a Direct Debit?',
      errorMessage: 'Tell us if you\'d like to set up a Direct Debit',


      items: {
        one: {
          text: 'Yes',
          name: 'direct_debit',
          id: 'Yes',
          // selectedText: request.session.cost,
        },
        two: {
          text: 'No',
          name: 'direct_debit',
          text: 'No',
          id: 'Up to 3 rods',
        }
      }
    })
  },
  post: function (request, reply) {
  request.session.directDebit = request.payload.direct_debit
  
    if (request.session.directDebit === 'Yes') {
      return reply.redirect('set-up-a-direct-debit')
        } else {
       return reply.redirect('/')
    }
  

  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/would-you-like-to-set-up-a-direct-debit',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/would-you-like-to-set-up-a-direct-debit',
  config: {
    handler: handlers.post
  }
}]
