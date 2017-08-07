const handlers = {
  get: function (request, reply) {


    return reply.view('direct-debit-guarantee', {
      pageTitle: 'Direct Debit Guarantee',
      errorMessage: '?????',


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

    return reply.redirect('/')
       
  

  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/direct-debit-guarantee',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/direct-debit-guarantee',
  config: {
    handler: handlers.post
  }
}]
